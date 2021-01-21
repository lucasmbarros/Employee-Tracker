// imports
const inquirer = require("inquirer");
const cTable = require("console.table");

// import library
const viewDepartments,
  addDepartment = require("./lib/Department");
const viewRoles,
  addRole = require("./lib/Role");
const viewEmployees,
  addEmployee,
  updateEmployeeRole = require("./lib/Employee");

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
          "Add an employee",
          "Add a role",
          "Update employee role",
          "Close program",
        ],
      },
    ])
    .then((choice) => {
      switch (choice.name) {
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

module.exports = promptMenu;