let myLibrary = [];
const library_content = document.querySelector('#library_content');

function Book(title, author, pages, bRead){
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = bRead;
	this.info = function(){
		let str = this.title + ' by ' + this.author + ', ';
		str += this.pages + ' pages, ';
		str += this.read == true ? 'was read.' : 'was not read.';
		return str;
	}
}

function addBookToLibrary(){
	event.preventDefault();
	popup.style.display = 'none';
	const book = new Book(form.title.value, form.author.value, form.pages.value, form.is_read.checked);
	myLibrary.push(book);
	setLocalStorage();
	build();	
	
	form.reset();
}

const addBook = document.querySelector('#addBtn');
const popup = document.querySelector('#popup');
addBook.addEventListener('click', () => popup.style.display = 'block');
const span = document.getElementsByTagName('span')[0];
span.addEventListener('click', () => popup.style.display = 'none');
const newBook = document.querySelector('.submit');
newBook.addEventListener('click', addBookToLibrary);

function build(){
	const library = document.querySelector('#library_content');
	const bookList = document.querySelectorAll('.book');
	bookList.forEach(book => library.removeChild(book));
	let i;
	for(i = 0; i < myLibrary.length; i++){
		displayCard(myLibrary[i], i);
	}
}


function displayCard(book, idx) {
	const displayBook = document.createElement('div');
	displayBook.classList.add('book');
	const p_title = document.createElement('p');
	const p_author = document.createElement('p');
	const p_pages = document.createElement('p');
	const removeBtn = document.createElement('button');
	const readBtn = document.createElement('button');
	readBtn.setAttribute('id','readBtn');
	if(book.read){
		readBtn.textContent = 'Read';
		readBtn.style.backgroundColor = '#00ff00';
	} else {
		readBtn.textContent = 'Not Read';
		readBtn.style.backgroundColor = '#d9d9d9';
	}
	removeBtn.setAttribute('id','removeBtn');
	removeBtn.textContent = 'Remove';
	p_title.setAttribute('id','title_text');
	p_author.setAttribute('id','author_text');
	p_pages.setAttribute('id','pages_text');
	p_title.textContent = book.title;
	p_author.textContent = book.author;
	p_pages.textContent = book.pages + ' pages';
	displayBook.setAttribute('data-index-number', idx);
	displayBook.appendChild(p_title);
	displayBook.appendChild(p_author);
	displayBook.appendChild(p_pages);
	displayBook.appendChild(readBtn);
	displayBook.appendChild(removeBtn);
	library_content.appendChild(displayBook);

	readBtn.addEventListener('click', () => {
		book.read = !book.read;
		setLocalStorage();
		build();
	})

	removeBtn.addEventListener('click', () => {
		const parent = removeBtn.parentNode;
		myLibrary.splice(parent.dataset.indexNumber,1);
		setLocalStorage();
		build();
	})
}

function setLocalStorage(){
	localStorage.setItem('library', JSON.stringify(myLibrary))
}

if(!localStorage.getItem('library')){
	build();
} else {
	let storedBooks = JSON.parse(localStorage.getItem('library'));
	myLibrary = storedBooks;
	build();
}

	

