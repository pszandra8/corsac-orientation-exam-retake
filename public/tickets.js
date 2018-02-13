'use strict';

window.addEventListener('load', () => {
  mainPaigeRenderer('GET', '/tickets');
})

const mainPaigeRenderer = function(method, query) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open(method, `http://localhost:8080${query}`);
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === httpRequest.DONE && httpRequest.status === 200) {
      let response = JSON.parse(httpRequest.responseText);
      createThead();
      response.forEach(element => createTBody(element));
      }
  }
  httpRequest.send();
}

let table = document.querySelector('table');

function createThead(){
  table.innerHTML = '';
  let thead = document.createElement('thead');
  table.appendChild(thead);
  for (let i = 0; i < 7; i++) {
    let headField = document.createElement('th');
    let headFieldContent = ['ID', 'Reporter', 'Manufacturer', 'Serial number', 'Description', 'Date', 'Actions'];
    headField.textContent = headFieldContent[i];
    thead.appendChild(headField);
  }
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
}

const createTBody = function(element) {
  const tbody = document.querySelector('tbody');
  const trow = document.createElement('tr');
  tbody.appendChild(trow);

  const userId = document.createElement('td');
  userId.textContent = element.id;
  trow.appendChild(userId);

  const reporter = document.createElement('td');
  reporter.textContent = element.reporter;
  trow.appendChild(reporter);

  const manufacturer = document.createElement('td');
  manufacturer.textContent = element.manufacturer;
  trow.appendChild(manufacturer);

  const serialNumber = document.createElement('td');
  serialNumber.textContent = element.serial_number;
  trow.appendChild(serialNumber);

  const description = document.createElement('td');
  description.textContent = element.description;
  trow.appendChild(description);

  const date = document.createElement('td');
  date.textContent = element.reported_at;
  trow.appendChild(date);

  const btnContainer = document.createElement('td');
  trow.appendChild(btnContainer);
  const actions = document.createElement('button');
  actions.setAttribute('id', element.id);
  actions.textContent = 'Delete';
  btnContainer.appendChild(actions);
  actions.addEventListener('click', deleteTicket);
}

const deleteTicket = function (event) {
  let httpRequest = new XMLHttpRequest();

  httpRequest.open('DELETE', `http://localhost:8080/tickets/${event.target.id}`);
  httpRequest.setRequestHeader('Accept', '*');
  httpRequest.setRequestHeader('Content-type', 'application/json');

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === httpRequest.DONE && httpRequest.status === 204) {
      mainPaigeRenderer('GET', '/tickets');
  }
  }
  httpRequest.send();
}
