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
var ideasArray      =     [];


saveButton.addEventListener('click', createCard);
// cardArea.addEventListener('click', deleteCard);


window.onload = function() {
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var parseObj = JSON.parse(localStorage.getItem(keys[i]));
    newCard = new Ideas(parseObj.id, parseObj.title, parseObj.body, null);
    ideasArray.push(newCard);
    appendCard(newCard);    
  }
}

function createCard (event) {
  event.preventDefault();
  var titleInput      =     document.querySelector('#title');
  var bodyInput       =     document.querySelector('#body');
  const newIdea = new Ideas(Date.now(), titleInput.value, bodyInput.value)
  newIdea.saveToStorage();
  ideasArray.push(newIdea);
  appendCard(newIdea);
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
    <button onclick="deleteCard(${idea.id})" class="close-button"></button><img class="card-buttons close-button"src="images/close.svg">
  </article>`
  cardArea.innerHTML = card + cardArea.innerHTML;
}

function deleteCard (id) {
  let element = document.querySelector(`[data-id="${id}"]`);
  element.remove();
  let deleteIdea = ideasArray.find(function(idea) {
    return id === idea.id;
  });
  deleteIdea.deleteFromStorage();
  console.log(deleteIdea);
  let deleteIndex = ideasArray.findIndex(function(idea) {
    return id === idea.id;
  });
  ideasArray.splice(deleteIndex, 1)
}



