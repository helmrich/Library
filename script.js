let myLibrary = [];

// Book Constructor
function Book(title, author, pageNumber, finishedReading) {
    this.title = title;
    this.author = author;
    this.pageNumber = pageNumber;
    this.finishedReading = finishedReading;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

// Add some books to fill the library
addBookToLibrary(new Book("Norwegian Wood", "Haruki Murakami", 296, true));
addBookToLibrary(new Book("Kokoro", "Natsume Soseki", 256, true));
addBookToLibrary(new Book("The Temple of the Golden Pavilion", "Yukio Mishima", 247, false));
addBookToLibrary(new Book("Hard-Boiled Wonderland and the End of the World", "Haruki Murakami", 400, true));
addBookToLibrary(new Book("I want to eat your Pancreas", "Yoru Sumino", 286, true));
addBookToLibrary(new Book("Snow Country", "Yasunari Kawabata", 175, false));
addBookToLibrary(new Book("The Great Passage", "Shion Miura", 222, true));
addBookToLibrary(new Book("Spring Snow", "Yukio Mishima", 400, true));
addBookToLibrary(new Book("No Longer Human", "Osamu Dazai", 271, true));

// Render the book list for the first time
renderBookList();

function renderBookList() {
    // Loop over all books in the library
    myLibrary.map(book => {
        // Create a new book card for each book and append it to the book list section
        const bookCard = createBookCard(book);
        document.getElementById("bookList").appendChild(bookCard);
    });

    // Finally, append a card that opens a modal to add new books
    appendAddBookCard();
}

function renderNewBook() {
    // Create a new book card for the last book in the library
    const newBookCard = createBookCard(myLibrary[myLibrary.length - 1]);

    // Remove the card to add a book, which is the last element of the book list
    const bookList = document.getElementById("bookList");
    bookList.removeChild(bookList.lastChild);

    // Add the new book's card
    bookList.appendChild(newBookCard);

    // And finally append a new card to add a book
    appendAddBookCard();
}

function createBookCard(book) {
    const bookCard = document.createElement("article");
    bookCard.classList.add("book-card");

    // Heading
    const heading = document.createElement("h3");
    heading.textContent = book.title;

    // Author
    const author = document.createElement("p");
    author.textContent = `by ${book.author}`;

    // Page Number
    const pageNumber = document.createElement("p");
    const pageNumberLabel = document.createElement("b");
    pageNumberLabel.textContent = "Number of pages: ";
    pageNumber.textContent = `${book.pageNumber} pages`;
    pageNumber.prepend(pageNumberLabel);

    // Status
    const status = document.createElement("p");
    const statusLabel = document.createElement("b");
    statusLabel.textContent = "Status: ";
    status.textContent = `${book.finishedReading ? "read" : "not read yet"}`;
    status.prepend(statusLabel);

    bookCard.append(heading, author, pageNumber, status);
    return bookCard;
}

function appendAddBookCard() {
    const addBookCard = document.createElement("article");
    addBookCard.classList.add("book-card", "add-book-card");
    addBookCard.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-circle plus-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>';
    addBookCard.addEventListener("click", (e) => toggleBookInputModal());
    document.getElementById("bookList").appendChild(addBookCard);
}

function toggleBookInputModal() {
    document.querySelector("#bookInputModalContainer").classList.toggle("hidden");
}


// Event Listeners

document.querySelector("#bookInputModalTop .close-icon")
    .addEventListener("click", (e) => {
        toggleBookInputModal();
    });

document.querySelector("#bookInputModal > form > input[type='submit']")
    .addEventListener("click", (e) => {
        e.preventDefault();
        const bookForm = document.querySelector("#bookInputModal > form");

        // Check if the book form is valid
        let isFormValid = bookForm.reportValidity();

        if (isFormValid) {
            // If it is valid, extract the values from the input/select elements
            const title = document.querySelector("input#title").value;
            const author = document.querySelector("input#author").value;
            const pageNumber = document.querySelector("input#pageNumber").value;
            const status = document.querySelector("select#status").value === "read" ? true : false;

            // and then create a new book and add it to the library
            myLibrary.push(new Book(title, author, pageNumber, status));

            // Finally hide the book input modal again and render the new book
            toggleBookInputModal();
            renderNewBook();
        }
    });