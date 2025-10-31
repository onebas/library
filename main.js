const books = document.querySelector(".books");
const form = document.querySelector(".book-info")
const submitButton = document.querySelector("#submit");
const addButton = document.querySelector("#add-book");
const dialog = document.querySelector("dialog");


form.addEventListener("submit", getBookInfo);
books.addEventListener("click", checkEvent);
addButton.addEventListener("click", showDialog);

library = []

function Book(name, author, numOfPages, hasRead){
    if(!new.target){
        throw Error("Use new keyword")
    }

    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.numOfPages = numOfPages;
    this.hasRead = hasRead;
}

Book.prototype.changeStatus = function(){
    this.hasRead = !this.hasRead;
}

function addBookToLibrary(name, author, numOfPages, hasRead){
    let book = new Book(name, author, numOfPages, hasRead);
    library.push(book);
    createCard();
}


function createCard(){
    const book = document.createElement("div");
    book.classList.add("book");

    const heading = document.createElement("h2");
    heading.setAttribute("id", "title");

    const author = document.createElement("p");
    const numpages = document.createElement("p");
    const hasRead = document.createElement("p");
    hasRead.setAttribute("id", "hasread");

    const toggleButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    toggleButton.setAttribute("id", "toggle-readstatus");
    deleteButton.setAttribute("id", "delete-card");

    const inputedBook = library.at(-1);
    book.setAttribute("id", inputedBook.id);
    heading.textContent = inputedBook.name;
    author.textContent = `By, ${inputedBook.author}`;
    numpages.textContent = `Number of Pages: ${inputedBook.numOfPages}`;
    hasRead.textContent = `Status: ${inputedBook.hasRead ? "Completed" : "Not Completed"}`;
    toggleButton.textContent = "Toggle";
    deleteButton.textContent = "Delete";
    book.appendChild(heading);
    book.appendChild(author);
    book.appendChild(numpages);
    book.appendChild(hasRead);
    book.appendChild(toggleButton);
    book.appendChild(deleteButton);
    books.appendChild(book);
}

function getBookInfo(event){
    event.preventDefault();
    dialog.close();
    const formData = new FormData(form);
    let name =  formData.get("bookname");
    let author = formData.get("author");
    let numOfPages = formData.get("numpages");
    let hasRead = formData.get("hasread") ? true: false;
    addBookToLibrary(name, author, numOfPages, hasRead);
}

function checkEvent(e){
    book = e.target.parentElement;
    if(e.target.id == "toggle-readstatus"){
        const readStatus = book.querySelector("#hasread");
        readStatus.textContent = readStatus.textContent == "Status: Completed" ? "Status: Not Completed" : "Status: Completed";
    }
    else{
        let id = book.getAttribute("id").toString();
        library = library.filter((element)=>element.id!=id);
        books.removeChild(book);
    }
}



function showDialog(){
    dialog.showModal();
}