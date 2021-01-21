// import
const connection = require("../../db/database");


// view employees
function viewEmployees() {
  connection
    .promise()
    .query(
      `SELECT employees.id, employees.first_name, employees.last_name, department.name, 
        role.title, role.salary, 
        CONCAT (manager.first_name, ' ', manager.last_name) 
        AS manager_name FROM role 
    
    LEFT JOIN employees ON employees.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employees AS manager ON manager.id = employees.manager_id`
    )
    .then(([employees]) => {
      console.log(`
    =================
    Employees
    =================
    `);
      console.log("\n");
      console.table(employees);
      choicePrompt();
    });
}

// add employee
async function addEmployee() {
  const roles = await connection
    .promise()
    .query(`SELECT id AS value, title AS name FROM role`);
  const employees = await connection
    .promise()
    .query(
      `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name from employee`
    );

  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter employee's first name!");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name? (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter employee's last name!");
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "manager",
        message: "Is this employee a manager?",
        default: false,
      },
    ])
    .then((ifManager) => {
      if (!ifManager.manager) {
        return connection
          .promise()
          .query(`INSERT INTO employee SET ?`, { manager_id: null });
      } else {
        return inquirer.prompt([
          {
            type: "list",
            name: "role_id",
            message: "What is this employee's role?",
            choices: [roles],
          },
          {
            type: "list",
            message:
              "Which employee do you want to set as manager for the selected employee?",
            name: "manager_id",
            choices: [employees],
          },
        ]);
      }
    })
    .then(({ first_name, last_name, role_id, manager_id }) => {
      return connection.promise().query(`INSERT INTO employee SET ?`, {
        first_name: first_name,
        last_name: last_name,
        role_id: role_id,
        manager_id: manager_id,
      });
    })
    .then(({ employeeAdded }) => {
      console.log(`
          =================
          Employee added
          =================
          `);
      promptMenu();
    });
}

async function updateEmployeeRole() {
  const employees = await connection
    .promise()
    .query(
      `SELECT id AS value, CONCAT(first_name, " ", last_name) AS name from employee`
    );
  const roles = await connection
    .promise()
    .query(`SELECT id AS value, title AS name FROM role`);

  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        name: "id",
        choices: [employees],
      },
      {
        type: "list",
        message: "What is the employee's new role?",
        name: "role_id",
        choices: [roles],
      },
    ])
    .then(({ id, role_id }) => {
      return connection
        .promise()
        .query(`UPDATE employee SET ? WHERE ?`, [{ role_id }, { id }]);
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

module.exports = (viewEmployees, addEmployee, updateEmployeeRole);
