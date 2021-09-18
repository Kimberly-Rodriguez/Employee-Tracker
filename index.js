const inquirer = require("inquirer");
require("console.table");
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "tracker_db",
  },
  console.log(`Connected to the tracker_db database.`)
);

// Main prompt function
const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit"
        ],
        name: "choice",
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "View All Employees":
          ViewAllEmployees();
          break;
        case "Add Employee":
          AddEmployee();
          break;
        case "Update Employee Role":
          UpdateEmployeeRole();
          break;
        case "View All Roles":
          ViewAllRoles();
          break;
        case "Add Role":
          AddRole();
          break;
        case "View All Departments":
          ViewAllDepartments();
          break;
        case "Add Department":
          AddDepartment();
          break;
        default:
          db.end();
      }
    });
};

// View All Employees function
const ViewAllEmployees = () => {
  const sql = `SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, e.manager_id
  FROM employee e
  JOIN role r 
  ON r.id = e.role_id 
  JOIN department d
  ON  d.id = r.department_id`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};

// AddEmployee Function
const AddEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Plase add employee's first name",
        name: "first_name",
      },
      {
        type: "input",
        message: "Plase add employee's last name",
        name: "last_name",
      },
      {
        type: "list",
        message: "Plase add employee's role id",
        choices: ["1: Engineering", "2: Law", "3: Accounting"],
        name: "role_id",
      },
      {
        type: "list",
        message: "Plase add manager id/name",
        choices: [
          "1: Sonia Sotomayor",
          "2: Selena Quintanilla",
          "Null: Not applicable",
        ],
        name: "manager_id",
      },
    ])

    .then((answer) => {
      const sql = `INSERT INTO employee e (e.first_name, e.last_name, e.role_id, e.manager_id) VALUES (?, ?, ?, ?)`;
      const params = [
        answer.first_name,
        answer.last_name,
        answer.role_id,
        answer.manager_id,
      ];
      db.query(sql, params, (err, rows) => {
        if (err) throw err;
        init();
      });
    });
};

// Update EmployeeRole
const UpdateEmployeeRole = () => {
  inquirer.prompt([
    {
      type: "list",
      message: "Plase select the employee that you wish to update",
      choice:
        "Sonia Sotomayor, Maria Hinojosa, Selena Quintanilla, Frida Kahlo, Celia Cruz",
      name: "first_name",
    },
  ]);
  // add if statment to add additional information?
};

// View All Roles Function
const ViewAllRoles = () => {
  const sql = `SELECT r.id, r.title, d.name, r.salary
  FROM role r 
  JOIN department  d
  on r.department_id = d.id;`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};

// Add Role Function
const AddRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please add the title of the role",
        name: "title",
      },
      {
        type: "input",
        message: "Please add a salary",
        name: "salary",
      },
      {
        type: "list",
        message: "Please add a department id",
        // what to do if the department id is differnt from 01,02,03
        name: "department_id",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [answer.title, answer.salary, answer.department_id];
      db.query(sql, params, (err, rows) => {
        if (err) throw err;
        init();
      });
    });
};

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
};

// Add Department Function
const AddDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please add a department",
        name: "name",
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const params = [answer.name];
      db.query(sql, params, (err, rows) => {
        if (err) throw err;
        init();
      });
    });
};

// Function call to initialize app
init();
