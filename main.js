var searchInput     =     document.querySelector('.search-input');
var searchButton    =     document.querySelector('.search-button');
var titleInput      =     document.querySelector('#title');
var bodyInput       =     document.querySelector('#body');
var saveButton      =     document.querySelector('.save-button');
var cardTitle       =     document.querySelector('.card-title');
var cardBody        =     document.querySelector('.card-body');
var downButton      =     document.querySelector('.down-button');
var upButton        =     document.querySelector('.up-button');
var closeButton     =     document.querySelector('.close-button');
var cardQuality     =     document.querySelector('.card-quality');

saveButton.addEventListener('click', createCard);



function createCard (event) {
  event.preventDefault();
  cardTitle.innerText = titleInput.value;
  cardBody.innerText = bodyInput.value;
}