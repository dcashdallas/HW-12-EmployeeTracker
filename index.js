var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sublime#96",
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

async function viewAllEmployees() {
    console.log("");

    // SELECT * FROM employee;
    let query = "SELECT * FROM employee";
    const rows = await db.query(query);
    console.table(rows);
}

async function updateEmployeeRole(employeeInfo) {

    const roleId = await getRoleId(employeeInfo.role);
    const employee = getFirstAndLastName(employeeInfo.employeeName);

    let query = 'UPDATE employee SET role_id=? WHERE employee.first_name=? AND employee.last_name=?';
    let args = [roleId, employee[0], employee[1]];
    const rows = await db.query(query, args);
    console.log(`Updated employee ${employee[0]} ${employee[1]} with role ${employeeInfo.role}`);
}

async function getAddEmployeeInfo() {
    const managers = await getManagerNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?"
            },
            {
                type: "list",
                message: "What is the employee's role?",
                name: "role",
                choices: [
                    // populate from db
                    ...roles
                ]
            },
            {
                type: "list",
                message: "Who is the employee's manager?",
                name: "manager",
                choices: [
                    // populate from db
                    ...managers
                ]
            }
        ])
}

async function getUpdateEmployeeRoleInfo() {
    const employees = await getEmployeeNames();
    const roles = await getRoles();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to update?",
                name: "employeeName",
                choices: [
                    // populate from db
                    ...employees
                ]
            },
            {
                type: "list",
                message: "What is the employee's new role?",
                name: "role",
                choices: [
                    // populate from db
                    ...roles
                ]
            }
        ])

}

async function getManagerNames() {
    let query = "SELECT * FROM employee WHERE manager_id IS NULL";

    const rows = await db.query(query);
    //console.log("number of rows returned " + rows.length);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function main() {
    let exitLoop = false;
    while (!exitLoop) {
        const prompt = await userPrompt();

        switch (prompt.action) {
            case 'Add department': {
                const newDepartmentName = await getDepartmentInfo();
                await addDepartment(newDepartmentName);
                break;
            }

            case 'Add role': {
                const newRole = await getRoleInfo();
                console.log("add a role");
                await addRole(newRole);
                break;
            }

            case 'Add employee': {
                const newEmployee = await getAddEmployeeInfo();
                console.log("add an employee");
                console.log(newEmployee);
                await addEmployee(newEmployee);
                break;
            }

            case 'View all departments': {
                await viewAllDepartments();
                break;
            }

            case 'View all roles': {
                await viewAllRoles();
                break;
            }

            case 'View all employees': {
                await viewAllEmployees();
                break;
            }

            case 'Update employee role': {
                const employee = await getUpdateEmployeeRoleInfo();
                await updateEmployeeRole(employee);
                break;
            }

            case 'Exit': {
                exitLoop = true;
                process.exit(0); // successful exit
                return;
            }

            default:
                console.log(`Internal warning. Shouldn't get here. action was ${prompt.action}`);
        }
    }
}

process.on("exit", async function (code) {
    await db.close();
    return console.log(`About to exit with code ${code}`);
});

main();
