const { prompt } = require('inquirer');
const db = require('./db');
const connection = require('./db/connection');
require('console.table');
const logo = require('asciiart-logo');


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

// Display logo text then load prompts
function loadAppLogo() {
  const appLogoText = applogo({ 
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
    //switch function to call the appropriate function depending on user's choice
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

// Add a department (prompted to enter the name of the department and that department is added to the database)
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

// Add a role (prompted to enter the name, salary, and department for the role and that role is added to the database)
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

// Add an employee (prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database)
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

// Update an employee (prompted to select an employee to update and their new role and this information is updated in the database)
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