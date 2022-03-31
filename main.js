if (window.localStorage.length > 0) {
    var myLibrary = JSON.parse(localStorage.getItem(0));
} else {
    var myLibrary = [];
}

const bookIcon = '<i class="fa-solid fa-book">';
const delIcon = '<i class="fa-solid fa-trash-can"></i>';
const asReadIcon = '<i class="fa-solid fa-eye"></i>';
let test = ''

for (item in myLibrary) {
    renderBook(item);
}

function renderForm() {
    document.getElementById('newBookForm').style.display = "block";
    document.getElementsByClassName('newBookButton')[0].style.display = 'none';
}

function renderBook(id) {
    let book = document.createElement('div');
    let title = document.createElement('div');
    let icon = document.createElement('div');
    let announce = document.createElement('div');
    let pages = document.createElement('div');
    let author = document.createElement('div');
    let buttons = document.createElement('div');
    let delButton = document.createElement('button');
    let asReadButton = document.createElement('button');

    book.className = 'book';
    title.className = 'bookTitle';
    icon.className = 'bookIcon';
    announce.className = 'bookAnnounce';
    pages.className = 'bookPages';
    author.className = 'bookAuthor';
    buttons.className = 'buttons';
    delButton.className = 'deleteButton';
    asReadButton.className = 'asReadButton';

    title.innerHTML = myLibrary[id]["title"];
    icon.innerHTML = bookIcon;
    announce.innerHTML = myLibrary[id]["announce"];
    pages.innerHTML = myLibrary[id]['pages'];
    author.innerHTML = myLibrary[id]['author'];
    delButton.innerHTML = delIcon;
    asReadButton.innerHTML = asReadIcon;

    asReadButton.addEventListener('click', (e) => {
        e.preventDefault();
        book.classList.toggle('viewed');
    });

    delButton.addEventListener('click', (e) => {
        e.preventDefault();
        book.remove();
        myLibrary.splice(id, 1)
        localStorage.setItem(0, JSON.stringify(myLibrary));
    })
    
    buttons.append(asReadButton, delButton);
    book.append(title, icon, author, announce, pages, buttons);

    books.append(book);
}

const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let title = form.querySelector('[id="title"]').value;
    let author = form.querySelector('[id="author"]').value;
    let pages = form.querySelector('[id="pages"]').value;
    let announce = form.querySelector('[id="announce"]').value;
    let book = new Object( {
        title,
        author,
        pages,
        announce
    })
    myLibrary.push(book)
    localStorage.setItem(0, JSON.stringify(myLibrary))
    renderBook(myLibrary.length - 1);
});