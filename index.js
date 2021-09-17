const inquirer = require('inquirer');
const fs = require('fs');
require('console.table');
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
      switch (response.choice) {
        case 'View All Employees':
        ViewAllEmployees()
      break;
        case 'Add Employee':
         AddEmployee()
       break;
       case 'Update Employee Role':
         UpdateEmployeeRole()
       break;
       case 'View All Roles':
         ViewAllRoles()
       break;
       case 'Add Role':
         AddRole()
       break;
       case 'View All Departments':
         ViewAllDepartments()
       break;
       case 'Add Department':
         AddDepartment()
       break;
     }
    });

  }
  

// View All Employees function
const ViewAllEmployees = () => {

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

// asking what is the employ name 



// then call add employe the answers from this funtion

// Add Employee function
const AddEmployee = (answer) => {
  const sql = `INSERT INTO employee e (e.first_name, e.last_name, e.role_id, e.manager_id)
    VALUES (?)`;
  const params = [answer.first_name, ]// whatever answr for athe add employee]];
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
   
  }

// Update View All Roles Function  
const ViewAllRoles = () => {

  const sql = `SELECT * FROM role`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    console.table(rows);
    init();
});

}

// Add Role Function
const AddRole = () => {

}

// View All Departments Function
const ViewAllDepartments = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
       return;
    }
    console.table(rows);
    init();
});
}

// Add Department Function
const AddDepartment = () => {
}

// Function call to initialize app
init();