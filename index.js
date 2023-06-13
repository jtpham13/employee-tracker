const inquirer = require("inquirer");
const connection = require("./config/connection");
const mysql = require("mysql2");

// displaying main menu
function displayMainMenu() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "exit",
      ],
    })
    .then((answers) => {
      switch (answers.action) {
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
        case "Update an employee role":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          console.log("Goodbye!");
          break;
      }
    });
}

// Viewing all the departments
function viewDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    displayMainMenu();
  });
}

// Adding a new role
function viewRoles() {
  const query = "SELECT * FROM roles";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    displayMainMenu();
  });
}

// Function to view all employees
function viewEmployees() {
  const query = "SELECT * FROM employees";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    displayMainMenu();
  });
}

// function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "Enter the name of the departments:",
    })
    .then((answers) => {
      const query = "INSERT INTO department SET?";
      connection.query(query, { name: answers.name }, (err, res) => {
        if (err) throw err;
        console.log("Department added successfully!");
        displayMainMenu();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter the title of the role:",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter the salary for the role:",
      },
      {
        name: "departmentID",
        type: "input",
        message: "Enter the department ID for the role:",
      },
    ])
    .then((answers) => {
      const { title, salary, departmentId } = answers;

      const query =
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
      connection.query(query, [title, salary, departmentId], (err, res) => {
        if (err) throw err;
        console.log("Role added successfully!");
        displayMainMenu();
      });
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the first name of the employee:",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the last name of the employee:",
      },
      {
        name: "roleId",
        type: "input",
        message: "Enter the role ID for the employee:",
      },
      {
        name: "managerId",
        type: "input",
        message: "Enter the manager ID for the employee:",
      },
    ])
    .then((answers) => {
      const { firstName, lastName, roleId, managerId } = answers;

      // Use a SQL query to insert the employee into the employees table
      const query =
        "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [firstName, lastName, roleId, managerId],
        (err, res) => {
          if (err) throw err;
          console.log("Employee added successfully!");
          // Call the function to display the main menu again
          displayMainMenu();
        }
      );
    });
}

// Function to update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        name: "employeeId",
        type: "input",
        message: "Enter the ID of the employee to update:",
      },
      {
        name: "newRoleId",
        type: "input",
        message: "Enter the ID of the new role:",
      },
    ])
    .then((answers) => {
      const { employeeId, newRoleId } = answers;

      const query = "UPDATE employees SET role_id = ? WHERE id = ?";
      connection.query(query, [newRoleId, employeeId], (err, res) => {
        if (err) throw err;
        console.log("Employee role updated successfully!");
        displayMainMenu();
      });
    });
}
