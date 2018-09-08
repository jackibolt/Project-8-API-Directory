
// Connection test
console.log('it works');

const grid = document.querySelector('#grid');
const overlay = document.querySelector('#overlay');
const boxContent = document.querySelectorAll('.box-content');
const employeeOverlays = [];

// Fetch
fetch('https://randomuser.me/api/?results=12&?nat=us')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const employeeData = data.results;
    createEmployeeProfiles(employeeData);
    showOverlay();
    });


//// HELPER FUNCTIONS
const createChildElement = (tagName, className, innerHTML, parentElement) => {
  const addElement = document.createElement(tagName);
  addElement.className = className;
  addElement.innerHTML = innerHTML;
  parentElement.append(addElement);
};


// create card + overlay
const createEmployeeProfiles = (employeeData) => {
  for(i=0; i<employeeData.length; i+=1){

  let employeeCard =
      `<img src='${employeeData[i].picture.large}' alt='${employeeData[i].name.first} ${employeeData[i].name.last}' class='profile-pic'>
        <div class='text-info'>
          <p class='name'>${employeeData[i].name.first} ${employeeData[i].name.last}</p>
          <p class='email'>${employeeData[i].email}</p>
          <p class='city'>${employeeData[i].location.city}</p>
        </div>`;
  createChildElement('div', 'card', employeeCard, grid);
  }
};

employeeOverlays[i] =
    `<div class="box-content">
      <img src="${employeeData[i].picture.large}" alt="${employeeData[i].name.first} ${employeeData[i].name.last}" class='overlay-pic'>
        <div class='main-info'>
          <h3>${employeeData[i].name.first} ${employeeData[i].name.last}</h3>
          <p>${employeeData[i].email}</p>
          <p>${employeeData[i].location.city}</p>
        </div>
        <div class='contact'>
          <p>${employeeData[i].cell}</p>
          <p>${employeeData[i].location.street} ${employeeData[i].location.city} ${employeeData[i].location.state} ${employeeData[i].location.postcode}</p>
          <p>Birthday: ${employeeData[i].dob.date}</p>
        </div>
      </div>`;


//// show Overlay
const showOverlay = () => {
  const cards = document.querySelectorAll('.card');
  const showBox = document.querySelectorAll('.show-box');
  // click handler
  grid.addEventListener('click', (e) => {
    console.log(e.target);
      overlay.innerHTML = employeeOverlays[0];
      overlay.style.display = 'flex';
  });
};
