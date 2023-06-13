const inquirer = require("inquirer");
const connection = require("./config/connection");
const mysql = require('mysql2')

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
