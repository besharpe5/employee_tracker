DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

-- This creates the department table
CREATE TABLE department (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- This creates the roles table
CREATE TABLE roles (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED,
    CONSTRAINT `fk_department_id` FOREIGN KEY (department_id) REFERENCES department(id) 
    ON DELETE SET NULL
);

-- This creates the employee table
CREATE TABLE employee (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INTEGER UNSIGNED NOT NULL,
    INDEX roles_ind (roles_id),
    CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
    manager_id INTEGER UNSIGNED,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);