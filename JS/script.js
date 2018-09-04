
// Connection test
console.log('it works');

const grid = document.querySelector('#grid');
const card = document.querySelectorAll('.card');
const overlay = document.querySelector('#overlay');

//// HELPER FUNCTIONS
const createChildElement = (tagName, className, innerHTML, parentElement) => {
  const addElement = document.createElement(tagName);
  addElement.className = className;
  addElement.innerHTML = innerHTML;
  parentElement.append(addElement);
};

// Fetch
fetch('https://randomuser.me/api/?results=12&?nat=us')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const employeeData = data.results;

    for(i=0; i<employeeData.length; i+=1){
      const fullName = `${employeeData[i].name.first} ${employeeData[i].name.last}`;
      let employeeCard =
          `<img src='${employeeData[i].picture.large}' alt='${fullName}' class='profile-pic'>
            <div class='text-info'>
              <p class='name'>${fullName}</p>
              <p class='email'>${employeeData[i].email}</p>
              <p class='city'>${employeeData[i].location.city}</p>
            </div>`;
      createChildElement('div', 'card', employeeCard, grid);

      const address = `${employeeData[i].location.street} ${employeeData[i].location.city} ${employeeData[i].location.state} ${employeeData[i].location.postcode}`;
      const showEmployeeOverlay = (employee) => {
        overlay.style.display = 'none';
        let employeeOverlay =
            `<img src="${employeeData[i].picture.large}" alt="${fullName}" class='overlay-pic'>
            <div class='main-info'>
              <h3>${fullName}</h3>
              <p>${employeeData[i].email}</p>
              <p>${employeeData[i].location.city}</p>
            </div>
            <div class='contact'>
              <p>${employeeData[i].cell}</p>
              <p>${address}</p>
              <p>Birthday: ${employeeData[i].dob.date}</p>
            </div>`;
        createChildElement('div', 'box-content', employeeOverlay, overlay);
      }
      grid.addEventListener('click', () => {
        showEmployeeOverlay(employeeData[i]);
        overlay.style.display = 'flex';
      });
    }
});
