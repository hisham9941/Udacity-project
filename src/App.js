import "./App.css";
import { useEffect, useState } from "react";
import Shelves from "./Components/Shelves";
import * as BooksAPI from "./BooksAPI";
import SingleBook from "./Components/SingleBook";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";


function App() {
  const [books,setBooks] = useState([]);
  // const [showSearchPage, setShowSearchpage] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBooks,setSearchBooks] = useState([]);
  const [booksMapId, setBooksMapId] = useState(new Map())
  const [sameMergedBooks, setSameMergedBooks] = useState([]);


  useEffect(()=>{
    BooksAPI.getAll().then(data=> {
      setBooks(data);
      // console.log(data);
      setBooksMapId(createBooksMap(data));
    })
  },[]);

  useEffect(()=>{
    let searchIsActive = true;
    if(search){
      BooksAPI.search(search).then(data=>{
        if(data.error){
          // console.log('Nothing Found');
          setSearchBooks([]);
        }else{
          if(searchIsActive){
            // console.log(data);
            setSearchBooks(data);
          }
        }
      });
    }
    return (data)=> {
      searchIsActive = false;
      setSearchBooks([]);
      // console.log("unmount data", data);
    }
  },[search]);

  useEffect(()=>{
    const sameBooks = searchBooks.map((filterBook)=>{
      if(booksMapId.has(filterBook.id)){
        return booksMapId.get(filterBook.id);
      }else{
        return filterBook;
      }
    })
    setSameMergedBooks(sameBooks);
  },[searchBooks]);

  


  const createBooksMap = (books)=>{
    const booksMap = new Map();
    books.map((book)=> booksMap.set(book.id, book));
    return booksMap;

  }


const changeReadingStatus = (singleBook, newReadingStatus)=>{
   const updateBooks = books.map((b)=>{
    if(b.id === singleBook.id){
      singleBook.shelf = newReadingStatus;
      return singleBook;
    }
    return b;
   });
   setBooks(updateBooks);
   BooksAPI.update(singleBook, newReadingStatus).then(data=>data);

   if(!booksMapId.has(singleBook.id) && !singleBook.shelf){
    singleBook.shelf = newReadingStatus;
    updateBooks.push(singleBook);
   }
}

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route path="/search" element={
        <div className="search-books">
          <div className="search-books-bar">
            <Link
              to="/"
              className="close-search"
            >
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={search}
                onChange={(event)=>setSearch(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
            {sameMergedBooks.map((searchBook)=> 
                    <li key={searchBook.id}>
                        <SingleBook singleBook={searchBook} changeReadingStatus={changeReadingStatus}/>
                    </li>
                    )}
            </ol>
          </div>
        </div>
        }/>

        <Route path="/" element={
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelves books={books} changeReadingStatus={changeReadingStatus}/>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
        }/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
