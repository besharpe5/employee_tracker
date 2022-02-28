const { prompt } = require('inquirer');
const db = require('./db');
const connection = require('./db/connection');
require('console.table');
const appLogo = require('asciiart-logo');


loadAppLogo();

let existingEmployees = [];
connection.query(`SELECT * FROM employee`, (err, res) => {
  if (err) throw err;
  for (let i=0; i < res.length; i++) {
    existingEmployees.push({name: res[i].first_name + ' ' + res[i].last_name, value: res[i].id});
  }
});

let existingRoles = [];
connection.query(`SELECT * FROM role`, (err, res) => {
  if (err) throw err;
  for (let i=0; i < res.length; i++) {
    existingRoles.push({name: res[i].title, value: res[i].id});
  }
});

// This will show the logo text, and then load the prompts
function loadAppLogo() {
  const appLogoText = appLogo({ 
    name: 'Employee Tracker',
    font: 'Broadway'
   }).render();

  console.log(appLogoText);

  loadPrompts();
};

function loadPrompts() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        {
          name: 'View All Departments',
          value: 'VIEW_DEPARTMENTS'
        },
        {
          name: 'View All Roles',
          value: 'VIEW_ROLES'
        },
        {
          name: 'View All Employees',
          value: 'VIEW_EMPLOYEES'
        },
        {
          name: 'Add New Department',
          value: 'ADD_DEPARTMENT'
        },
        {
          name: 'Add New Role',
          value: 'ADD_ROLE'
        },
        {
          name: 'Add New Employee',
          value: 'ADD_EMPLOYEE'
        },
        {
          name: 'Update Employee Role',
          value: 'UPDATE_EMPLOYEE'
        },
        {
          name: 'Quit',
          value: 'QUIT'
        }
      ]
    }
  ]).then(res => {
    let choice = res.choice;
    // this is a switch function that will call the correlating function depending on user input
    switch (choice) {
      case 'SHOW_DEPARTMENTS':
        showDepartments();
        break;
      case 'SHOW_ROLES':
        showRoles();
        break;
      case 'SHOW_EMPLOYEES':
        showEmployees();
        break;
      case 'ADD_DEPARTMENT':
        addDepartment();
        break;
      case 'ADD_ROLE':
        addRole();
        break;
      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
      case 'UPDATE_EMPLOYEE_ROLE':
        updateEmployeeRole();
        break;
      case 'QUIT':
        connection.end();
        break;
    }
  })
}

function showDepartments() {
  db.returnAllDepartments().then((result) => {
    console.table(result);
    loadPrompts();
  });
}

function showRoles() {
  db.returnAllRoles().then((result) => {
    console.table(result);
    loadPrompts();
  });
}

function showEmployees() {
  db.returnAllEmployees().then((result) => {
    console.table(result);
    loadPrompts();
  });
}

// This will add a new department 
function addDepartment() {
  prompt([
    {
      name: 'newDepartment',
      type: 'input',
      message: 'What is the name of the new department?'
    }
  ])
  .then((answer) => {
    connection.query(
      `INSERT INTO department (name)
      VALUES (?)`,
      [answer.newDepartment],
      (err, results) => {
        loadPrompts();
      }
    );
  });
}

// This will add a new role 
function addRole() {
  let currentDepartments = [];
  connection.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    for (let i=0; i < res.length; i++) {
      existingDepartments.push({name: res[i].name, value: res[i].id});
    }
  });

  prompt([
    {
      name: 'newRoleName',
      type: 'input',
      message: 'What is the name of the new role?'
    },
    {
      name: 'newRoleSalary',
      type: 'input',
      message: 'What is the salary for this role?'
    },
    {
      name: 'newRoleDepartment',
      type: 'list',
      message: 'What department does this role belong to?',
      choices: existingDepartments
    }
  ])
  .then((answer) => {
    connection.query(
      `INSERT INTO role (title, salary, department_id)
      VALUES ('${answer.newRoleName}', '${answer.newRoleSalary}', '${answer.newRoleDepartment}')`,
      (err, results) => {
        if (err) throw err;
        loadPrompts();
      }
    );
  });
}

// This will add a new employee 
function addEmployee() {

  prompt([
    {
      name: 'employeeFirstName',
      type: 'input',
      message: "What is the employee's first name?"
    },
    {
      name: 'employeeLastName',
      type: 'input',
      message: "What is the employee's last name?"
    },
    {
      name: 'employeeRole',
      type: 'list',
      message: "What is the employee's role?",
      choices: existingRoles
    },
    {
      name: 'employeeManager',
      type: 'list',
      message: "Who is the employee's manager?",
      choices: existingEmployees
    }
  ])
  .then((answer) => {
    connection.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ('${answer.employeeFirstName}', '${answer.employeeLastName}', '${answer.employeeRole}', '${answer.employeeManager}')`,
      (err, results) => {
        if (err) throw err;
        loadPrompts();
      }
    );
  });
}

// This will update an employee entry
function updateEmployeeRole() {

  prompt([
    {
      name: 'selectedEmployee',
      type: 'list',
      message: "Which employee would you like to update?",
      choices: existingEmployees
    },
    {
      name: 'employeeRole',
      type: 'list',
      message: "What is the employee's new role?",
      choices: existingRoles
    }
  ])
  .then((answer) => {
    connection.query(
      `UPDATE employee SET role_id = '${answer.employeeRole}'
      WHERE id = '${answer.selectedEmployee}'`,
      (err, results) => {
        if (err) throw err;
        loadPrompts();
      }
    );
  });
}