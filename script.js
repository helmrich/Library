let myLibrary = [];

function Book(title, author, numberOfPages, finishedReading) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.finishedReading = finishedReading;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(new Book("Norwegian Wood", "Haruki Murakami", 296, true));
addBookToLibrary(new Book("Kokoro", "Natsume Soseki", 256, true));
addBookToLibrary(new Book("The Temple of the Golden Pavilion", "Yukio Mishima", 247, false));
addBookToLibrary(new Book("Hard-Boiled Wonderland and the End of the World", "Haruki Murakami", 400, true));
addBookToLibrary(new Book("I want to eat your Pancreas", "Yoru Sumino", 286, true));
addBookToLibrary(new Book("Snow Country", "Yasunari Kawabata", 175, false));
addBookToLibrary(new Book("The Great Passage", "Shion Miura", 222, true));
addBookToLibrary(new Book("Spring Snow", "Yukio Mishima", 400, true));
addBookToLibrary(new Book("No Longer Human", "Osamu Dazai", 271, true));

myLibrary.map(book => {
    const bookArticle = document.createElement("article");
    bookArticle.classList.add("book-card");

    const heading = document.createElement("h3");
    heading.textContent = book.title;
    const author = document.createElement("p");
    author.textContent = `by ${book.author}`;
    const numberOfPages = document.createElement("p");
    const numberOfPagesLabel = document.createElement("b");
    numberOfPagesLabel.textContent = "Number of pages: ";
    numberOfPages.textContent = `${book.numberOfPages} pages`;
    numberOfPages.prepend(numberOfPagesLabel);
    const status = document.createElement("p");
    const statusLabel = document.createElement("b");
    statusLabel.textContent = "Status: ";
    status.textContent = `${book.finishedReading ? "read" : "not read yet"}`;
    status.prepend(statusLabel);

    bookArticle.append(heading, author, numberOfPages, status);

    document.getElementById("bookList").appendChild(bookArticle);
});

const addBookArticle = document.createElement("article");
addBookArticle.classList.add("book-card", "add-book-card");
const plusIcon = document.createElement("img");
plusIcon.setAttribute("src", "plus-circle.svg");
plusIcon.classList.add("plus-icon");
addBookArticle.appendChild(plusIcon);
document.getElementById("bookList").appendChild(addBookArticle);