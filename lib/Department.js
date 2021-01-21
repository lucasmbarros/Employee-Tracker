// import
const connection = require("../../db/database");

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
      console.log("\n");
      console.table(departments);
      promptMenu();
    });
}

// add department
async function addDepartment() {
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

module.exports = (viewDepartments, addDepartment);
