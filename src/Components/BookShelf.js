import SingleBook from "./SingleBook";

const BookShelf = ({shelfTitle, books, changeReadingStatus})=>{
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((singleBook)=> 
                    <li key={singleBook.title}>
                        <SingleBook singleBook={singleBook} changeReadingStatus={changeReadingStatus}/>
                    </li>
                    )}
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;