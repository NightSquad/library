if (window.localStorage.length > 0) {
    var myLibrary = JSON.parse(localStorage.getItem(0));
} else {
    var myLibrary = [];
}

const bookIcon = '<i class="fa-solid fa-book">';
const delIcon = '<i class="fa-solid fa-trash-can"></i>';
const asReadIcon = '<i class="fa-solid fa-eye"></i>';

class book{
    constructor(id, title, author, pages, announce) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.announce = announce;
        this.id = id;
    }

    renderBook() {
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
    
        title.innerHTML = this.title;
        icon.innerHTML = bookIcon;
        announce.innerHTML = this.announce;
        pages.innerHTML = this.pages;
        author.innerHTML = this.author;
        delButton.innerHTML = delIcon;
        asReadButton.innerHTML = asReadIcon;

        if (myLibrary[this.id].viewed == 'true') {
            book.classList.add('viewed');
        }
    
        asReadButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.asRead(book);
        });
    
        delButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.remove(book);
        })
        
        buttons.append(asReadButton, delButton);
        book.append(title, icon, author, announce, pages, buttons);
    
        books.append(book);
    }

    asRead(obj) {
        obj.classList.toggle('viewed');
        if (obj.classList.contains('viewed')) {
            myLibrary[this.id].viewed = 'true';
            localStorage.setItem(0, JSON.stringify(myLibrary));
            return
        } myLibrary[this.id].viewed = 'false';
        localStorage.setItem(0, JSON.stringify(myLibrary));
        return
    };

    remove(obj) {
        obj.remove();
        myLibrary.splice(this.id, 1)
        localStorage.setItem(0, JSON.stringify(myLibrary));
    }


};

myLibrary.forEach((element, index) => {
    let newBook = new book(index, element.title, element.author, element.pages, element.announce);
    newBook.renderBook(index);
})

function renderForm() {
    document.getElementById('newBookForm').style.display = "block";
    document.getElementsByClassName('newBookButton')[0].style.display = 'none';
}

const form = document.getElementById('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let title = form.querySelector('[id="title"]').value;
    let author = form.querySelector('[id="author"]').value;
    let pages = form.querySelector('[id="pages"]').value;
    let announce = form.querySelector('[id="announce"]').value;
    let id = myLibrary.length;
    let test = new book(id, title, author, pages, announce)
    myLibrary.push(test)
    localStorage.setItem(0, JSON.stringify(myLibrary))
    test.renderBook();
});