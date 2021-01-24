// imports
const inquirer = require("inquirer");
const cTable = require("console.table");
const connection = require("../db/database");

// view departments
function viewDepartments() {
  connection
    .promise()
    .query(`SELECT * FROM department`)
    .then(([departments]) => {
      console.log(`
    =================
    Departments
    =================
    `);
      console.table(departments);
      promptMenu();
    });
}

// add department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "Enter the name of the new department:",
      name: "department_name",
    })
    .then(({ department_name }) => {
      return connection
        .promise()
        .query(`INSERT INTO department SET ?`, { name: department_name });
    })
    .then(({ departmentAdded }) => {
      console.log(`
        =================
        Department added
        =================
        `);
      promptMenu();
    });
}

// view roles
function viewRoles() {
  connection
    .promise()
    .query(`SELECT * FROM role`)
    .then(([roles]) => {
      console.log(`
    =================
    Roles
    =================
    `);
      console.log("\n");
      console.table(roles);
      promptMenu();
    });
}

// add role
async function addRole() {
  const [departments] = await connection
    .promise()
    .query(`SELECT id AS value, name FROM department`);

  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the title of the new role:",
        name: "role_title",
      },
      {
        type: "number",
        message: "Enter the salary of the new role:",
        name: "role_salary",
      },
      {
        type: "list",
        message: "Select the department this role belongs to:",
        name: "department",
        choices: departments,
      },
    ])
    .then((answers) => {
      return connection.promise().query(`INSERT INTO role SET ?`, {
        title: answers.role_title,
        salary: answers.role_salary,
        department_id: answers.department,
      });
    })
    .then((roleAdded) => {
      console.log(`
        =================
        Role added
        =================
        `);
      promptMenu();
    });
}

// view employees
function viewEmployees() {
  connection
    .promise()
    .query(
      `SELECT employees.id, employees.first_name, employees.last_name, 
      department.name AS department, 
      role.title AS title, role.salary AS salary, 
      CONCAT(manager.first_name, " ", manager.last_name) AS manager
      FROM employees
      LEFT JOIN role ON employees.role_id = role.id
      LEFT JOIN department ON department_id = department.id
      LEFT JOIN employees AS manager ON employees.manager_id = manager.id`
    )
    .then(([employees]) => {
      console.log(`
    =================
    Employees
    =================
    `);
      console.log("\n");
      console.table(employees);
      promptMenu();
    });
}

// add employee
async function addEmployee() {
  const [roles] = await connection
    .promise()
    .query(`SELECT id AS value, title AS name FROM role`);
  const [employees] = await connection
    .promise()
    .query(
      `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name from employees`
    );

  // add option for no manager
  employees.unshift({ value: null, name: "None" });

  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "list",
        message: "What is the employee's role?",
        name: "role_id",
        choices: roles,
      },
      {
        type: "list",
        message:
          "Which employee do you want to set as manager for the selected employee?",
        name: "manager_id",
        choices: employees,
      },
    ])
    .then((answers) => {
      const sql = `INSERT INTO employees SET ?`;
      return connection.promise().query(sql, answers);
    })
    .then(({ results }) => {
      console.log("Employee added");
      promptMenu();
    });
}

// update employee
async function updateEmployeeRole() {
  const [employees] = await connection
    .promise()
    .query(
      `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name from employees`
    );
  const [roles] = await connection
    .promise()
    .query(`SELECT id AS value, title AS name FROM role`);

  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        name: "id",
        choices: employees,
      },
      {
        type: "list",
        message: "What is the employee's new role?",
        name: "role_id",
        choices: roles,
      },
    ])
    .then(({ id, role_id }) => {
      return connection
        .promise()
        .query(`UPDATE employees SET ? WHERE ?`, [{ role_id }, { id }]);
    })
    .then(({ employeeUpdated }) => {
      console.log(`
          =================
          Employee Updated
          =================
          `);
      promptMenu();
    });
}


// main menua
const promptMenu = () => {
  console.log(`
    =================
    Employee Manager
    =================
    `);

  return inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "Please select an option:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update employee role",
          "Close program",
        ],
      },
    ])
    .then(({ menu }) => {
      switch (menu) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployeeRole();
          break;
        case "Close program":
          connection.end();
          break;
      }
    });
};

module.exports = { promptMenu };
