var searchInput     =     document.querySelector('.search-input');
var searchButton    =     document.querySelector('.search-button');
var saveButton      =     document.querySelector('.save-button');
var cardTitle       =     document.querySelector('.card-title');
var cardBody        =     document.querySelector('.card-body');
var downButton      =     document.querySelector('.down-button');
var upButton        =     document.querySelector('.up-button');
var closeButton     =     document.querySelector('.close-button');
var cardQuality     =     document.querySelector('.card-quality');
var cardArea        =     document.querySelector('.box3');
var cardArray       =     [];


saveButton.addEventListener('click', createCard);


window.onload = function() {
  JSON.parse(localStorage.getItem());
}

function createCard (event) {
  var titleInput      =     document.querySelector('#title');
  var bodyInput       =     document.querySelector('#body');
  event.preventDefault();
  const newIdea = new Ideas(Date.now(), titleInput.value, bodyInput.value)
  appendCard(newIdea);
  newIdea.saveToStorage();
  cardArray.push(newIdea);
}

function appendCard (idea) {
  var card =
  `<article class="idea-cards" data-id="${idea.id}">
        <h2 class="card-title"> ${idea.title}</h2>
        <p class="card-body">
          ${idea.body}
        </p>
        <hr>
       <img class="card-buttons down-button"src="images/down.svg">
        <img class="card-buttons up-button"src="images/up.svg">
        <h4 class="card-quality"> Quality: Swill</h4>
        <img class="card-buttons close-button"src="images/close.svg">
      </article>`
      cardArea.innerHTML += card;
}



