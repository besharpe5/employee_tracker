DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

-- This creates the department table
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT UNSIGNED PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- This creates the role table
CREATE TABLE role (
    id INTEGER AUTO_INCREMENT UNSIGNED PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL UNSIGNED NOT NULL,
    department_id INTEGER UNSIGNED NOT NULL,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- This creates the employee table
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT UNSIGNED PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER UNSIGNED NOT NULL,
    INDEX role_ind (role_id),
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE,
    manager_id INTEGER UNSIGNED,
    INDEX man_ind (manager_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL ON UPDATE CASCADE
);