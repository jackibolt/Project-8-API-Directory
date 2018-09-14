
// Connection test
console.log('it works');

const grid = document.querySelector('#grid');
const overlay = document.querySelector('#overlay');
const boxContent = document.querySelectorAll('.box-content');
const empCard = document.querySelectorAll('.emp-card');
let index = ''
let next = '';
let prev = '';
let names = [];
let employeeData = '';
let employeeOverlays = [];
let selectedIndex = 0;

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
    const name = `${employeeData[i].name.first} ${employeeData[i].name.last}`;
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

  employeeOverlays[i] =
      `<div class="box-content">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 129 129" class='x'><path d="M7.6,121.4c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2l51.1-51.1l51.1,51.1c0.8,0.8,1.8,1.2,2.9,1.2c1,0,2.1-0.4,2.9-1.2   c1.6-1.6,1.6-4.2,0-5.8L70.3,64.5l51.1-51.1c1.6-1.6,1.6-4.2,0-5.8s-4.2-1.6-5.8,0L64.5,58.7L13.4,7.6C11.8,6,9.2,6,7.6,7.6   s-1.6,4.2,0,5.8l51.1,51.1L7.6,115.6C6,117.2,6,119.8,7.6,121.4z"/></svg>
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
            <p class='bday'>Birthday: ${employeeData[i].dob.date}</p>
          </div>
        </div>`;
  const overlay = employeeOverlays[i];
  }
};

//// show Overlay
const showOverlay = () => {
  const cards = document.querySelectorAll('.card');
  // click handler
  grid.addEventListener('click', (e) => {
    if (e.target.tagName !== 'SECTION') {
      let index = e.target.getAttribute('data-index');

      for (i=0; i<cards.length; i+=1) {
        overlay.innerHTML = employeeOverlays[index];
        overlay.style.display = 'flex';
      }

      next = (parseInt(index) + 1);
      prev = (parseInt(index) - 1);
  }

    overlay.addEventListener('click', (e) => {
        console.log(e.target.id);
      if (e.target.id === 'right'){
        overlay.innerHTML = employeeOverlays[next];
        overlay.style.display = 'flex';
        index = next;
        console.log(index);
      } else if (e.target.id === 'left') {
        overlay.innerHTML = employeeOverlays[prev];
        overlay.style.display = 'flex';
        index = prev;
        console.log(index);
      } else if (e.target.tagName === 'svg' || e.target.tagName === 'path' || e.target.id === 'overlay'){
        overlay.style.display = 'none';
        overlay.innerHTML = '';
      }
    });
  });
};;


//// search

const inputBox = document.querySelector('input');

// const names = employeeData.name;

const search = function () {
    inputBox.addEventListener('keyup', () => {
        // Search Input variable
      const input = inputBox.value.toLowerCase();
      const empName = document.querySelectorAll('.name');
      // console.log(empName);
      for (i=0; i<empName.length; i+=1) {
          const cards = document.querySelectorAll('.card');
          console.log(names);
          console.log(input);

        if (names.includes(input)){
            // Display matching results
          console.log('yes');
          cards[i].style.display = " ";

        } else {         // Hide non-matching results
          console.log('no');
          cards[i].style.display = "none";
        }
      };
    })
  };
