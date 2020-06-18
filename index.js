var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "eetracker_db"
});

async function userPrompt() {
    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "Add role",
                    "Add department",
                    "Add employee",
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Update employee role",
                    "Exit"
                ]
            }
        ])
}

userPrompt();
