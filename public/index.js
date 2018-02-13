'use strict';

window.addEventListener('load', () => {
  mainPaigeRenderer('GET', '/users');
})

const mainPaigeRenderer = function(method, query) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open(method, `http://localhost:8080${query}`);
  httpRequest.setRequestHeader('Accept', '*');
  httpRequest.setRequestHeader('Content-type', 'application/json');
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === httpRequest.DONE && httpRequest.status === 200) {
      let response = JSON.parse(httpRequest.responseText);
      response.forEach(element => dropDownCreator(element));
      }
  }
  httpRequest.send();
}

const dropDownCreator = function(element) {
  const userNameField = document.querySelector('.name');
  let option = document.createElement('option');
  option.textContent = element.name;
  userNameField.appendChild(option);
}