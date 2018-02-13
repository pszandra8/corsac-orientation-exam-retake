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
      dropDownReset();
      response.forEach(element => dropDownCreator(element));
      }
  }
  httpRequest.send();
}

const dropDownReset = function() {
  const userNameField = document.querySelector('.name');
  userNameField.innerHTML = '';
}

const dropDownCreator = function(element) {
  const userNameField = document.querySelector('.name');
  let option = document.createElement('option');
  option.textContent = element.name;
  option.setAttribute('id', element.id)
  userNameField.appendChild(option);
}

const manufacturerInput = document.querySelector('#manufacturer');
const serialNumberInput = document.querySelector('#serial');
const descriptionInput = document.querySelector('#description');
let optionSelect = document.querySelector('.name');
let date = new Date();

document.querySelector('.report').addEventListener('click', function (event) {
  event.preventDefault();
  const post = {
    reporter: name.id,
    manufacturer: manufacturerInput.value,
    serial_number: serialNumberInput.value,
    description: descriptionInput.value,
    reported_at: date
  };

  let httpRequest = new XMLHttpRequest();
  httpRequest.open('POST', 'http://localhost:8080/tickets');
  httpRequest.setRequestHeader('Accept', '*');
  httpRequest.setRequestHeader('Content-type', 'application/json');
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === httpRequest.DONE && httpRequest.status === 200) {
      console.log('request was successfull');
    }
  };
  httpRequest.send(JSON.stringify(post));
  console.log(post);
});
