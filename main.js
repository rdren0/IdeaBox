var searchInput     =     document.querySelector('.search-input');
var searchButton    =     document.querySelector('.search-button');
var saveButton      =     document.querySelector('.save-button');
var cardTitle       =     document.querySelector('.card-title');
var cardBody        =     document.querySelector('.card-body');
var closeButton     =     document.querySelector('.close-button');
var cardQuality     =     document.querySelector('.card-quality');
var cardArea        =     document.querySelector('.box3');
var ideasArray      =     [];
var qualityArray    =     ['Quality: Swill', 'Quality: Plausible', 'Quality: Genius'];
var swillButton     =     document.querySelector('.swill-quality');
var plausibleButton =     document.querySelector('.plausible-quality');
var geniusButton    =     document.querySelector('.genius-quality');
var buttons         =     document.querySelector('.box2b');



//Event Listeners
saveButton.addEventListener('click', createCard);
searchInput.addEventListener('keyup', searchIdeas);
cardArea.addEventListener('click', function(event) {
  if (event.target.classList.contains('up-button')) {
    vote(event, 'up');
  } else if (event.target.classList.contains('down-button')) {
    vote(event, 'down')
  }
});

buttons.addEventListener('click', function(event) {
   if (event.target.classList.contains('quality-button')) {
   random(event.target.innerText);
 };
});


window.onload = function() {
  var keys = Object.keys(localStorage);
  for (var i = 0; i < keys.length; i++) {
    var parseObj = JSON.parse(localStorage.getItem(keys[i]));
    newCard = new Ideas(parseObj.id, parseObj.title, parseObj.body, parseObj.quality);
    // var sortedIdeasArray = ideasArray.sort();
    ideasArray.push(newCard);
    appendCard(newCard);  
  }
}
//////need onclick event for "show more" button ///

    console.log(ideasArray);
function searchIdeas (event) {
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

function random (quality) {
  var qualityLevel = document.querySelectorAll('.quality-level');
  qualityLevel.forEach(function(objQuality) {
   if (objQuality.innerText.indexOf(quality) != -1) {
     objQuality.parentElement.parentElement.style.display = 'block';
   }  else if (objQuality.innerText.indexOf(quality) === -1) {
     objQuality.parentElement.parentElement.style.display = 'none';
   }
   console.log(objQuality.parentElement.parentElement.parentElement)
  });
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
    <h2 class="card-title"contentEditable = "true">${idea.title}</h2>
    <p class="card-body" contentEditable = "true";>
    ${idea.body}
    </p>
    <hr>
    <img class="card-buttons down-button"src="images/down.svg">
    <img class="card-buttons up-button"src="images/up.svg">
    <h4 class="card-quality"> <span class="quality-level">${qualityArray[idea.quality]}</span></h4>
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
  let deleteIndex = ideasArray.findIndex(function(idea) {
    return id === idea.id;
  });
  ideasArray.splice(deleteIndex, 1)
}

function findIdNumber(objId) {
  for (var i = 0; i < ideasArray.length; i++) {
    if (parseInt(ideasArray[i].id) === parseInt(objId)) {
      console.log(i)
      return i
    }
  }
};

function vote(event, votebutton) {
  var index = findIdNumber(event.target.parentElement.dataset.id);
  if (votebutton === 'up') {
    ideasArray[index].updateQuality('up');
    event.target.nextElementSibling.innerText = qualityArray[ideasArray[index].quality];   
    console.log(qualityArray[ideasArray[index].quality]);
  } else if (votebutton === 'down') {
    console.log('down')
    ideasArray[index].updateQuality('down');
    event.target.nextElementSibling.nextElementSibling.innerText = qualityArray[ideasArray[index].quality];
  }
  ideasArray[index].saveToStorage();
  ideasArray.splice(index, 1, ideasArray[index]);
};


