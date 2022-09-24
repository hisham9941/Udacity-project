import BookShelf from "./BookShelf";
const Shelves = ({books,changeReadingStatus})=>{
    const currentlyReadingBooks = books.filter((book)=>book.shelf === "currentlyReading");
    const wantToReadBooks = books.filter((book)=>book.shelf === "wantToRead");
    const readBooks = books.filter((book)=>book.shelf === "read");
    return(
        <div>
            <BookShelf shelfTitle="Currenty Reading" books={currentlyReadingBooks} changeReadingStatus={changeReadingStatus}/>
            <BookShelf shelfTitle="Want To Read" books={wantToReadBooks} changeReadingStatus={changeReadingStatus}/>
            <BookShelf shelfTitle="Read" books={readBooks} changeReadingStatus={changeReadingStatus}/>
        </div>
        

    );
}

export default Shelves;