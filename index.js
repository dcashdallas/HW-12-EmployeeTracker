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

async function addRole(roleInfo) {
    const departmentId = await getDepartmentId(roleInfo.departmentName);
    const salary = roleInfo.salary;
    const title = roleInfo.roleName;
    let query = 'INSERT into role (title, salary, department_id) VALUES (?,?,?)';
    let args = [title, salary, departmentId];
    const rows = await db.query(query, args);
    console.log(`Added role ${title}`);
}

async function addDepartment(departmentInfo) {
    const departmentName = departmentInfo.departmentName;
    let query = 'INSERT into department (name) VALUES (?)';
    let args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
}

async function addEmployee(employeeInfo) {
    let roleId = await getRoleId(employeeInfo.role);
    let managerId = await getEmployeeId(employeeInfo.manager);

    let query = "INSERT into employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)";
    let args = [employeeInfo.first_name, employeeInfo.last_name, roleId, managerId];
    const rows = await db.query(query, args);
    console.log(`Added employee ${employeeInfo.first_name} ${employeeInfo.last_name}.`);
}

async function viewAllDepartments() {
    // SELECT * from department;

    let query = "SELECT * FROM department";
    const rows = await db.query(query);
    console.table(rows);
}

async function viewAllRoles() {
    console.log("");
    // SELECT * FROM role;
    let query = "SELECT * FROM role";
    const rows = await db.query(query);
    console.table(rows);
    return rows;
}

userPrompt();
