const SingleBook = ({singleBook, changeReadingStatus})=>{
    if(singleBook.imageLinks.thumbnail.length === 0){
        singleBook.imageLinks.thumbnail = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/800px-Image_not_available.png";
    }

    return(
        <div className="book">
            <div className="book-top">
            <div
                className="book-cover"
                style={{
                width: 128,
                height: 193,
                backgroundImage:
                    `url("${singleBook.imageLinks.thumbnail}")`,
                }}
            ></div>
            <div className="book-shelf-changer">
                <select 
                defaultValue={singleBook.shelf ? singleBook.shelf : "none"} 
                onChange={(event)=>changeReadingStatus(singleBook,event.target.value)}>
                <option value="noselection" disabled>
                    Move to...
                </option>
                <option value="currentlyReading">Currenty Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
            </div>
            </div>
            <div className="book-title">{singleBook.title}</div>
            <div className="book-authors">{singleBook.authors ? singleBook.authors.map((bAuth)=>bAuth + " ") : 'No Author Found'}</div>
      </div>
    );
}

export default SingleBook;