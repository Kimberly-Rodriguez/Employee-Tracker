const inquirer = require('inquirer');
const fs = require('fs');
require('console.table');
// Import and require mysql2
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);


// What is the best way to connce the server.js w/ index.js
// const server = require('server.js');


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
        : fs.writeFile('./dist/', generateHtml(teamData), (err) =>
          err ? console.log(err) : console.log('Success!'))
          });
}


// View All Employees function
const ViewAllEmployees = () => {
// Read 
const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    console.table(rows);
    init();
});
}

// Add Employee function
const AddEmployee = () => {
  const sql = `INSERT INTO movies (e)
    VALUES (?)`;
  const params = [body.movie_name];
  // 31 - 40 is more or less the same just the params might change
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body // this pases the info you are posting 
    });
  });
 
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