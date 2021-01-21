// imports
const inquirer = require("inquirer");

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
        ],
      },
    ])
};
