const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');

//independent js document for HTML file
// const generateHtml = require('./src/generateHtml.js');

// Empty array that holds all team members: 
const teamData = [];

// manager function
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ['View All Employees', 
                  'Add Employee', 
                  'Update Employee Role', 
                  'View All Roles', 
                  'Add Role',
                  'View All Departments',
                  'Add Department'], 
        name: "role",
      },
    ])
    .then((response) => {
        const managerData = new Manager (response.name, response.id, response.email, response.officeNumber)
      //push to my teamData array 
        teamData.push(managerData);
        
        return (response.role === 'Engineer') ? createNewEngineer()
        : (response.role === 'Intern') ? createNewIntern()
        : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
          err ? console.log(err) : console.log('Success!'))
          });
}


//engineer function
const createNewEngineer = () => {
  inquirer
.prompt([
  {
    type: "input",
    message: " What is the name of this engineer?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the id of this engineer?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the email of this engineer?",
    name: "email",
  },
  {
    type: "input",
    message: "What is the github of this engineer?",
    name: "github",
  },
  {
    type: "list",
    message: "Do you want to add another team member, if so, which one?",
    choices: ["Engineer", "Intern", "Exit"],
    name: "role",
  },
])
    .then((response) => {
      const engineerData = new Engineer (response.name, response.id, response.email, response.github)
    //push to my teamData array 
      teamData.push(engineerData);
      
      return (response.role === 'Engineer') ? createNewEngineer()
      : (response.role === 'Intern') ? createNewIntern()
      : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
        err ? console.log(err) : console.log('Success!'))

    });
}

// intern function
const createNewIntern = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: " What is the name of this intern?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the id of this intern?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the email of this intern?",
        name: "email",
      },
      {
        type: "input",
        message: "What school does this intern attend?",
        name: "school",
      },
      {
        type: "list",
        message: "Do you want to add another team member, if so, please select one: ",
        choices: ["Engineer", "Intern", "Exit"],
        name: "role",
      },
    ])
    .then((response) => {
      const internData = new Intern (response.name, response.id, response.email, response.school)
    //push to my teamData array 
      teamData.push(internData);
      
      return (response.role === 'Engineer') ? createNewEngineer()
      : (response.role === 'Intern') ? createNewIntern()
      : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
        err ? console.log(err) : console.log('Success!'))
      
      });
  }

// Function call to initialize app
init();

module.exports = init;