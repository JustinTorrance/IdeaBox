var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveBtn = document.querySelector('.save-btn');
var searchInput = document.querySelector('.search-input');
var cardSection = document.querySelector('.card-section');
var upVoteBtn = document.querySelector('.upvote-btn');
var downVoteBtn = document.querySelector('.downvote-btn');

saveBtn.addEventListener('click', createCard);
cardSection.addEventListener('click', deleteCard);
titleInput.addEventListener('keyup', toggleSaveButton);
bodyInput.addEventListener('keyup', toggleSaveButton);
cardSection.addEventListener('click', upVote);
cardSection.addEventListener('click', downVote);


toggleSaveButton();
displayCards();

function toggleSaveButton(){
  if(titleInput.value === '' || bodyInput.value === ''){
    saveBtn.disabled = true;
  } else {
    saveBtn.disabled = false;
  }
}

function displayCards(e) {
  JSON.parse(localStorage.getItem("storedCardArray")).forEach(function(potato) {
    cardHTML(potato);
  });
};


function createCard(event) {
  event.preventDefault();
  var newCard = new CardConstructor(titleInput.value, bodyInput.value); 
  cardHTML(newCard);
  var cardArray = [];
  if (JSON.parse(localStorage.getItem("storedCardArray"))) { //Check if storedCardArray exists in localStorage
    cardArray = JSON.parse(localStorage.getItem("storedCardArray")); 
    cardArray.push(newCard);
    localStorage.setItem('storedCardArray', JSON.stringify(cardArray));
  } else {
    cardArray.push(newCard);
    localStorage.setItem('storedCardArray', JSON.stringify(cardArray));
  }
  titleInput.value = '';
  bodyInput.value = '';
  titleInput.focus();
  toggleSaveButton();
};

function CardConstructor(title, body) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = 'swill';
};

function cardHTML(object) {
  cardSection.innerHTML += `
  <article data-index="${object.id}" class="card-article">
    <div class="card-top">
      <h3 class="card-title">${object.title}</h3>
      <i class="far fa-times-circle delete-btn"></i>
    </div>
    <p class="card-body">${object.body}</p>
    <div class="card-bottom">
      <i class="fas fa-arrow-circle-up upvote-btn"></i>
      <i class="fas fa-arrow-circle-down downvote-btn"></i>
      <p class="quality-label">quality: </p>
      <p class="selected-quality">${object.quality}</p>
    </div>
  </article>` 
};


function deleteCard(event){
  if (event.target.classList.contains('delete-btn')) {
    event.target.closest('.card-article').remove();
    var cardId = event.target.parentNode.parentNode.getAttribute('data-index');
    var cardArray = JSON.parse(localStorage.getItem('storedCardArray'));
    var newArray = cardArray.filter(function(object) {
      return object.id != cardId;
    })
    localStorage.setItem("storedCardArray", JSON.stringify(newArray));
  }
};

function upVote(event) {
    if (event.target.classList.contains('upvote-btn') && event.target.parentNode.childNodes[7].innerText === 'swill'); { 
      var cardArray = JSON.parse(localStorage.getItem('storedCardArray'));
      event.target.parentNode.childNodes[7].quality = 'plausible';
      localStorage.setItem("storedCardArray", JSON.stringify(cardArray));
    }
};
  
//if value swill, return plausible
//if value plausible, return genius






function downVote() {

};

