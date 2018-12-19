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
var resultsArray    =     [];

//Event Listeners
saveButton.addEventListener('click', createCard);
// cardArea.addEventListener('click', deleteCard);
searchInput.addEventListener('keyup', searchIdeas);
// upButton.addEventListener('click', upQuality);
// downButton.addEventListener('click', downQuality);


//Functions to work on****************
function searchIdeas (event) {
  //****search functionality ideas
  // const results = searchInput.value.toUpperCase();     
  // for (var i = 0; i < ideasArray.length; i++) {
  //   if (ideasArray[i].cardTitle === searchInput.value) {
  //     resultsArray.push(ideasArray[i]);
  //     console.log(resultsArray[i]);
  //*****************
    event.preventDefault();
    var searchWord = searchInput.value.toUpperCase();
    var filteredIdeas = ideasArray.filter(function(obj) {
      var titleText = obj.title.toUpperCase();
      var bodyText = obj.body.toUpperCase();
      return titleText.includes(searchWord) || bodyText.includes(searchWord);
    });
    cardArea.innerHTML = "";
    filteredIdeas.forEach(function(obj) {
      appendCard(obj)
    })
    }
  


// function upQuality() {
//   if (cardQuality.innerText === 'Quality: Swill') {
//     cardQuality.innerText = 'Quality: Plausible';
//   } else if (car)
// }

// function downQuality() {

// }

//*************************************


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



