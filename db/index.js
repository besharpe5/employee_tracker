const res = require('express/lib/response');
const db = require('./connection');

class DB {
    // This will return all departments
    returnAllDepartments() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM department`,
                (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                }
            );
        });
    };

    // This will return all roles
    returnAllRoles() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT roles.id, roles.title, roles.salary, department.name
                FROM roles
                LEFT JOIN department ON roles.department_id = department.id`,
                (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(results);
                }
            );
        });
    };

    // This will return all employees
    returnAllEmployees() {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT employee.id, employee.first_name, employee.last_name, 
                roles.title AS job_title, roles.salary,
                department.name AS department,
                managers.first_name AS manager_first_name, managers.last_name AS manager_last_name

                FROM employee
                LEFT JOIN roles ON employee.roles_id = roles.id
                LEFT JOIN department on roles.department_id = department.id
                LEFT JOIN employee managers ON managers.id = employee.manager_id`,
            (err, results) => {
                if (err) {
                    reject(err);
                }
                resolve(results);
            }
            );
        });
    };
};

module.exports = new DB();