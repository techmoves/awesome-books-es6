import { DateTime } from './node_modules/luxon/src/luxon.js';
import Store from './modules/script.js';
import Book from './modules/book.js';
import UI from './modules/UI.js';

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();
  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  // Validate
  if (title === '' || author === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate book
    const book = new Book(title, author);
    // Add book to UI
    UI.addBookToList(book);
    // Add book to store
    Store.addBook(book);
    // Show success message
    UI.showAlert('Book Added', 'success');
    // Clear fields
    UI.clearFields();
  }
});
// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteBook(e.target);
  // Remove book from local storage
  localStorage.clear();
});

const now = DateTime.now();
DateTime.now().toString();
const formattedTime = now.toFormat('HH:mm:ss');
document.getElementById('live-time').innerHTML = formattedTime;

const itemOne = document.getElementById('item1');
const itemTwo = document.getElementById('item2');
const itemThree = document.getElementById('item3');
const bookSection = document.getElementById('book-section');
const addSection = document.getElementById('add-section');
const contactSection = document.getElementById('contact-section');

// when link is clicked the rest of the sections are hidden using the class

itemOne.addEventListener('click', () => {
  bookSection.classList.remove('hidden');
  addSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

itemTwo.addEventListener('click', () => {
  addSection.classList.remove('hidden');
  bookSection.classList.add('hidden');
  contactSection.classList.add('hidden');
});

itemThree.addEventListener('click', () => {
  contactSection.classList.remove('hidden');
  bookSection.classList.add('hidden');
  addSection.classList.add('hidden');
});

const liveTimeElement = document.getElementById('live-time');
// Function to update the live time
const updateLiveTime = () => {
  // Get the current time using Luxon
  const currentTime = DateTime.local();
  // Format the current time as desired (e.g., 'HH:mm:ss')
  const formattedTime = currentTime.toFormat('HH:mm:ss');
  // Update the live-time element with the formatted time
  liveTimeElement.textContent = formattedTime;
};
// Call the updateLiveTime function initially to set the initial time
updateLiveTime();
// Update the live time every second
setInterval(updateLiveTime, 1000);

const dateAndTime = () => {
  const now = DateTime.local();
  const formattedDateTime = now.toFormat('yyyy-MM-dd HH:mm:ss');
  document.getElementById('live-time').innerHTML = `${formattedDateTime}`;
};
dateAndTime();
setInterval(dateAndTime, 1000);