
// Connection test
console.log('it works');

// Variables
const grid = document.querySelector('#grid');
const overlay = document.querySelector('#overlay');
let name = '';
let names = [];
let usernames = [];
let index = ''
let next = '';
let prev = '';
let employeeData = '';
let employeeOverlays = [];


// Fetch
fetch('https://randomuser.me/api/?results=12&?nat=us')
  .then(response => response.json())
  .then(data => {
    employeeData = data.results;
    createEmployeeProfiles(employeeData);
    showOverlay();
    search(employeeData);
    });


//// HELPER FUNCTION
const createChildElement = (tagName, className, innerHTML, index, parentElement) => {
  const addElement = document.createElement(tagName);
  addElement.className = className;
  addElement.innerHTML = innerHTML;
  addElement.setAttribute('data-index', index);
  parentElement.append(addElement);
};


// create card + overlay
const createEmployeeProfiles = (employeeData) => {
  for(i=0; i<employeeData.length; i+=1){
    name = `${employeeData[i].name.first} ${employeeData[i].name.last}`;
    names.push(name);
    let username = `${employeeData[i].login.username}`;
    usernames.push(username);
    const dataIndex = `${[i]}`;
  let employeeCard =
      `<div class='emp-card' data-index='${[i]}'>
        <img src='${employeeData[i].picture.large}' alt='${employeeData[i].name.first} ${employeeData[i].name.last}' class='profile-pic' data-index='${[i]}'>
        <div id='text-info' data-index='${[i]}'>
          <p class='name' data-index='${[i]}'>${name}</p>
          <p class='email' data-index='${[i]}'>${employeeData[i].email}</p>
          <p class='city' data-index='${[i]}'>${employeeData[i].location.city}</p>
        </div>
      </div>`;
  createChildElement('section', 'card', employeeCard, dataIndex, grid);

    let fullBirthdate = `${employeeData[i].dob.date}`;
    let birthday = `${fullBirthdate.substring(5, 7)}/${fullBirthdate.substring(8,10)}/${fullBirthdate.substring(0,4)}`;

  employeeOverlays[i] =
      `<div class="box-content">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129" id='x'><path id='p' d="M7.6,121.4c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2l51.1-51.1l51.1,51.1c0.8,0.8,1.8,1.2,2.9,1.2c1,0,2.1-0.4,2.9-1.2   c1.6-1.6,1.6-4.2,0-5.8L70.3,64.5l51.1-51.1c1.6-1.6,1.6-4.2,0-5.8s-4.2-1.6-5.8,0L64.5,58.7L13.4,7.6C11.8,6,9.2,6,7.6,7.6   s-1.6,4.2,0,5.8l51.1,51.1L7.6,115.6C6,117.2,6,119.8,7.6,121.4z"/></svg>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129" id='right' class='arrow right'><path d="m40.4,121.3c-0.8,0.8-1.8,1.2-2.9,1.2s-2.1-0.4-2.9-1.2c-1.6-1.6-1.6-4.2 0-5.8l51-51-51-51c-1.6-1.6-1.6-4.2 0-5.8 1.6-1.6 4.2-1.6 5.8,0l53.9,53.9c1.6,1.6 1.6,4.2 0,5.8l-53.9,53.9z" class='arrow right'/></svg>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129" id='left' class='arrow left'><path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" class='arrow left'/></svg>
        <img src="${employeeData[i].picture.large}" alt="${employeeData[i].name.first} ${employeeData[i].name.last}" class='overlay-pic'>
          <div class='main-info'>
            <p class='name'>${name}</p>
            <p>${employeeData[i].email}</p>
            <p class='city'>${employeeData[i].location.city}</p>
          </div>
          <div class='contact'>
            <p>${employeeData[i].cell}</p>
            <p class='location'>${employeeData[i].location.street} ${employeeData[i].location.city} ${employeeData[i].location.state} ${employeeData[i].location.postcode}</p>
            <p class='bday'>Birthday: ${birthday}</p>
          </div>
        </div>`;
  }
};

//// show Overlay
const showOverlay = () => {
  let cards = document.querySelectorAll('.card');
  // click handler
  grid.addEventListener('click', (e) => {

    if (e.target.tagName !== 'SECTION') {
      index = e.target.getAttribute('data-index');

      for (i=0; i<cards.length; i+=1) {
        overlay.innerHTML = employeeOverlays[index];
        overlay.style.display = 'flex';
      }
  }

    overlay.addEventListener('click', (e) => {
      next = (parseInt(index) + 1);
      prev = (parseInt(index) - 1);
      if (e.target.id === 'right' && index < 11){
          overlay.innerHTML = employeeOverlays[next];
          overlay.style.display = 'flex';
          index = next;
      } else if (e.target.id === 'left' && index > 0) {
          overlay.innerHTML = employeeOverlays[prev];
          overlay.style.display = 'flex';
          index = prev;
      } else if (e.target.id === 'x' || e.target.id === 'p' || e.target.id === 'overlay'){
        overlay.style.display = 'none';
        overlay.innerHTML = '';
        index = 0;
      }
    });
  });
};


//// search

const search = function () {
  const searchBox = document.querySelector('#search');
  let cards = document.querySelectorAll('.card');

  searchBox.addEventListener('keyup', () => {
          // Search Input variable
    const input = searchBox.value.toLowerCase();

    for (i=0; i<names.length; i+=1) {
      const fullName = names[i];
      const user = usernames[i];
      if (fullName.includes(input) || user.includes(input)) {
              // Display matching results
        console.log('yes');
        cards[i].style.display = "block";

      } else {
              // Hide non-matching results
        console.log('no');
        cards[i].style.display = "none";
      }
    }
  });
};
