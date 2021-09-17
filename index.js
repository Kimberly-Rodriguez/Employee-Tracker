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
        name: "choice",
      },
    ])
    .then((response) => {
      //   const managerData = new Manager (response.name, response.id, response.email, response.officeNumber)
      // //push to my teamData array 
      //   teamData.push(managerData);
        
        return (response.choice === 'View All Employees') ? ViewAllEmployees()
        : (response.choice === 'Add Employee') ? AddEmployee()
        : (response.choice === 'Update Employee Role') ? UpdateEmployeeRole()
        : (response.choice === 'View All Roles') ? ViewAllRoles()
        : (response.choice === 'Add Role') ? AddRole()
        : (response.choice === 'View All Departments') ? ViewAllDepartments()
        : (response.choice === 'Add Department') ? AddDepartment()
      
        //Edit format below:
        : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
          err ? console.log(err) : console.log('Success!'))
          });
}


// View All Employees function
const ViewAllEmployees = () => {
  inquirer
.prompt([
  {
      // table of all Employees
  },
])
}

// Add Employee function
const AddEmployee = () => {
  inquirer
    .prompt([
      {
        // Add Employee
      },
    ])
    // .then((response) => {
    //   const internData = new Intern (response.name, response.id, response.email, response.school)
    // //push to my teamData array 
    //   teamData.push(internData);
      
    //   return (response.role === 'Engineer') ? createNewEngineer()
    //   : (response.role === 'Intern') ? createNewIntern()
    //   : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
    //     err ? console.log(err) : console.log('Success!'))
    //   });
  }

  // Up date Employee Role Function
  const UpdateEmployeeRole = () => {
    inquirer
    .prompt([
  {
      // UpdateEmployeeRole
  },
])
 // .then((response) => {
    //   const internData = new Intern (response.name, response.id, response.email, response.school)
    // //push to my teamData array 
    //   teamData.push(internData);
      
    //   return (response.role === 'Engineer') ? createNewEngineer()
    //   : (response.role === 'Intern') ? createNewIntern()
    //   : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
    //     err ? console.log(err) : console.log('Success!'))
    //   });
  }

// Update View All Roles Function  
const ViewAllRoles = () => {
  inquirer
.prompt([
  {
      // table of all Roles
  },
])
}

// Add Role Function
const AddRole = () => {
  inquirer
  .prompt([
{
    // Add New Role 
},
])
// .then((response) => {
  //   const internData = new Intern (response.name, response.id, response.email, response.school)
  // //push to my teamData array 
  //   teamData.push(internData);
    
  //   return (response.role === 'Engineer') ? createNewEngineer()
  //   : (response.role === 'Intern') ? createNewIntern()
  //   : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
  //     err ? console.log(err) : console.log('Success!'))
  //   });
}

// View All Departments Function
const ViewAllDepartments = () => {
  inquirer
.prompt([
  {
      // table of all Departments
  },
])
}

// Add Department Function
const AddDepartment = () => {
  inquirer
  .prompt([
{
    // Add New Role 
},
])
// .then((response) => {
  //   const internData = new Intern (response.name, response.id, response.email, response.school)
  // //push to my teamData array 
  //   teamData.push(internData);
    
  //   return (response.role === 'Engineer') ? createNewEngineer()
  //   : (response.role === 'Intern') ? createNewIntern()
  //   : fs.writeFile('./dist/index.html', generateHtml(teamData), (err) =>
  //     err ? console.log(err) : console.log('Success!'))
  //   });
}

// Function call to initialize app
init();

module.exports = init;