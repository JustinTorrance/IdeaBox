var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var saveBtn = document.querySelector('.save-btn');
var searchInput = document.querySelector('.search-input');
var cardSection = document.querySelector('.card-section');

saveBtn.addEventListener('click', createCard);
cardSection.addEventListener('click', deleteCard);

function createCard(event) {
event.preventDefault();
cardSection.innerHTML += `
<article class="card-article">
    <div class="card-top">
      <h3 class="card-title">${titleInput.value}</h3>
      <i class="far fa-times-circle delete-btn"></i>
    </div>
    <p class="card-body">${bodyInput.value}</p>
    <div class="card-bottom">
      <i class="fas fa-arrow-circle-up"></i>
      <i class="fas fa-arrow-circle-down"></i>
      <p class="quality-label">quality: </p>
      <p class="selected-quality">swill</p>
    </div>
  </article>`
titleInput.value = '';
bodyInput.value = '';
titleInput.focus();
}


function deleteCard(event){
  if (event.target.classList.contains('delete-btn')) {
    event.target.parentNode.parentNode.remove();
  }
}
