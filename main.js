var myLibrary = {}
if (localStorage.length > 0) {
    myLibrary = JSON.parse(localStorage.getItem(0));
}

const bookIcon = '<i class="fa-solid fa-book">';
const delIcon = '<i class="fa-solid fa-trash-can"></i>';
const asReadIcon = '<i class="fa-solid fa-eye"></i>';

class book{
    constructor(id, title, author, pages, announce, viewed) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.announce = announce;
        this.id = id;
        this.viewed = viewed;
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

        this.viewed && book.classList.add('viewed');
    
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
            myLibrary[this.id].viewed = true;
            localStorage.setItem(0, JSON.stringify(myLibrary));
            return
        } myLibrary[this.id].viewed = false;
        localStorage.setItem(0, JSON.stringify(myLibrary));
        return
    };

    remove(obj) {
        obj.remove();
        delete myLibrary[this.id]
        localStorage.setItem(0, JSON.stringify(myLibrary));
    }
};

let lastid = 0
for (let key in myLibrary) {
    let newBook = new book(myLibrary[key].id, myLibrary[key].title, myLibrary[key].author, myLibrary[key].pages, myLibrary[key].announce, myLibrary[key].viewed);
    lastid = myLibrary[key].id
    newBook.renderBook()
}

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
    let id = lastid + 1;
    let viewed = false
    myLibrary[id] = new book(id, title, author, pages, announce, viewed)
    localStorage.setItem(0, JSON.stringify(myLibrary))
    lastid++
    myLibrary[id].renderBook();
});