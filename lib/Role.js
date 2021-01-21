// import
const connection = require("../../db/database");

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
      menuPrompt();
    });
}

// add role
async function addRole() {
  const departments = await connection
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
        type: 'list',
        message: 'Select the department this role belongs to:',
        name: 'role_department',
        choices: [departments],
      }
    ])
    .then(({ role_title, role_salary, role_department }) => {
      return connection.promise().query(`INSERT INTO role SET ?`, {
        title: role_title,
        salary: role_salary,
        department: role_department,
      });
    })
    .then(({ roleAdded }) => {
      console.log(`
          =================
          Role added
          =================
          `);
      menuPrompt();
    });
}

module.exports = (viewRoles, addRole);
