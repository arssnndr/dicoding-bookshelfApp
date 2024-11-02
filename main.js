// Do your work here...

const bookListItems = JSON.parse(localStorage.getItem('bookListItems')) || [];
const bookFormIsComplete = document.querySelector('#bookFormIsComplete');
const bookFormIsCompleteChecked = document.querySelector('#bookFormIsCompleteChecked');
const incompleteBookList = document.querySelector('#incompleteBookList');
const completeBookList = document.querySelector('#completeBookList');
const bookFormSubmit = document.querySelector('#bookFormSubmit');
const bookForm = document.querySelector('#bookForm');
const searchBook = document.querySelector('#searchBook');

bookFormIsComplete.addEventListener('change', checkboxBookFormIsComplete);
bookFormSubmit.addEventListener('click', addBookToLibrary);
searchBook.addEventListener('submit', searchBookTitleList);

bookListItems.forEach((book) => {
    const bookItem = document.createElement('div');
    bookItem.setAttribute('data-bookid', '123123123');
    bookItem.setAttribute('data-testid', 'bookItem');

    const bookItemTitle = document.createElement('h3');
    bookItemTitle.setAttribute('data-testid', 'bookItemTitle');
    bookItemTitle.textContent = book.title;
    bookItem.appendChild(bookItemTitle);

    const bookItemAuthor = document.createElement('p');
    bookItemAuthor.setAttribute('data-testid', 'bookItemAuthor');
    bookItemAuthor.textContent = `Penulis: ${book.author}`;
    bookItem.appendChild(bookItemAuthor);

    const bookItemYear = document.createElement('p');
    bookItemYear.setAttribute('data-testid', 'bookItemYear');
    bookItemYear.textContent = `Tahun: ${book.year}`;
    bookItem.appendChild(bookItemYear);

    const bookButton = document.createElement('div');
    bookButton.setAttribute('class', 'book-button');
    bookItem.appendChild(bookButton);

    const bookItemIsCompleteButton = document.createElement('button');
    bookItemIsCompleteButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    bookItemIsCompleteButton.addEventListener('click', () => toggleIsComplete(book.id));
    bookItemIsCompleteButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    bookButton.appendChild(bookItemIsCompleteButton);

    const bookItemDeleteButton = document.createElement('button');
    bookItemDeleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    bookItemDeleteButton.addEventListener('click', () => deleteBook(book.id));
    bookItemDeleteButton.textContent = 'Hapus Buku';
    bookButton.appendChild(bookItemDeleteButton);

    const bookItemEditButton = document.createElement('button');
    bookItemEditButton.setAttribute('data-testid', 'bookItemEditButton');
    bookItemEditButton.textContent = 'Edit Buku';
    bookButton.appendChild(bookItemEditButton);

    book.isComplete ? completeBookList.appendChild(bookItem) : incompleteBookList.appendChild(bookItem);
});

function checkboxBookFormIsComplete() {
    if (bookFormIsComplete.checked) bookFormIsCompleteChecked.innerHTML = "Selesai dibaca";
    else bookFormIsCompleteChecked.innerHTML = "Belum selesai dibaca";
}

function addBookToLibrary() {
    event.preventDefault();
    const book = {
        id:  Number(new Date()),
        title: bookForm.bookFormTitle.value,
        author: bookForm.bookFormAuthor.value,
        year: bookForm.bookFormYear.value,
        isComplete: bookFormIsComplete.checked
    }

    bookListItems.push(book);
    localStorage.setItem('bookListItems', JSON.stringify(bookListItems));
    history.go();
}

function toggleIsComplete(bookId) {
    event.preventDefault();
    const bookIndex = bookListItems.findIndex(book => book.id === bookId);
    bookListItems[bookIndex].isComplete = !bookListItems[bookIndex].isComplete;
    localStorage.setItem('bookListItems', JSON.stringify(bookListItems));
    history.go();
}

function deleteBook(bookId) {
    event.preventDefault();
    const bookIndex = bookListItems.findIndex(book => book.id === bookId);
    bookListItems.splice(bookIndex, 1);
    localStorage.setItem('bookListItems', JSON.stringify(bookListItems));
    history.go();
}

function searchBookTitleList() {
    event.preventDefault();
    console.log(searchBookTitle.value);
}