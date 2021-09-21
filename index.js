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
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
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
  ON d.id = r.department_id
  ORDER BY e.id ASC`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};

// AddEmployee Function
const AddEmployee = () => {
  const roleSql = "SELECT * FROM role";
  db.query(roleSql, (err, rows) => {
    if (err) throw err;
    const roles = [];

    for (let i = 0; i < rows.length; i++) {
      const object = { value: rows[i].id, name: rows[i].title };
      roles.push(object);
    }
    const employeeSql = "SELECT * FROM employee";
    db.query(employeeSql, (err, rows) => {
      if (err) throw err;
      const employees = [];

      for (let i = 0; i < rows.length; i++) {
        const object = {
          value: rows[i].id,
          name: `${rows[i].first_name} ${rows[i].last_name}`,
        };
        employees.push(object);
      }

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
            type: "rawlist",
            message: "Plase add employee's role id",
            choices: roles,
            name: "role_id",
          },
          {
            type: "rawlist",
            message: "Plase add manager id/name",
            name: "manager_id",
            choices: employees,
          },
        ])
        .then((answer) => {
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
          const params = [
            answer.first_name,
            answer.last_name,
            answer.role_id,
            parseInt(answer.manager_id),
          ];
          db.query(sql, params, (err, rows) => {
            if (err) throw err;
            init();
          });
        });
    });
  });
};

const UpdateEmployeeRole = () => {
  const sql = `SELECT * FROM employee`;
  let employees = [];

  db.query(sql, (err, rows) => {
    for (let i = 0; i < rows.length; i++) {
      const object = {
        value: rows[i].id,
        name: `${rows[i].first_name} ${rows[i].last_name}`,
      };
      employees.push(object);
    }
    const roleSql = "SELECT * FROM role";
    db.query(roleSql, (err, rows) => {
      if (err) throw err;
      const roles = [];

      for (let i = 0; i < rows.length; i++) {
        const object = { value: rows[i].id, name: rows[i].title };
        roles.push(object);
      }

      inquirer
        .prompt([
          {
            type: "rawlist",
            choices: employees,
            message: "Please select an Employee you wish to update.",
            name: "id",
          },
          {
            type: "list",
            choices: roles,
            message: "Please enter their new role: ",
            name: "role_id",
          },
        ])
        .then((answers) => {
          let prompts = [answers.role_id, answers.id];

          const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;

          db.query(sql, prompts, (err, rows) => {
            console.log("\n");
            console.log(`Success! ${answers.newRole} Employee Role Updated`);
            console.log("\n");
            init();
          });
        });
    });
  });
};

// View All Roles Function
const ViewAllRoles = () => {
  const sql = `SELECT r.id, r.title, d.name, r.salary
  FROM role r 
  JOIN department  d
  on r.department_id = d.id
  ORDER BY r.id ASC`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    console.table(rows);
    init();
  });
};

// Add Role Function
const AddRole = () => {
  const sql = `SELECT * FROM department `;
  db.query(sql, (err, rows) => {
    if (err) throw err;
    const departments = [];

    // start; end; incrementer
    for (let i = 0; i < rows.length; i++) {
      const obj = { value: rows[i].id, name: rows[i].name };
      departments.push(obj);
    }

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
          type: "rawlist",
          message: "Please add a department",
          name: "department_id",
          choices: departments,
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
  });
};

// View All Departments Function
const ViewAllDepartments = () => {
  const sql = `SELECT * FROM department ORDER BY id ASC`;
  db.query(sql, (err, rows) => {
    if (err) throw err;
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
