var inquirer = require("inquirer");
var Database = require("./async-db");
const chalk = require('chalk');


var db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "eetracker_db"
});



console.log((chalk.yellowBright(`
                                NOMMMMMMMMMM$MR
                          DM+..................$MMMMMNOI
                       ,M+...................?$8+.+D??DNZ?NM+
                      M.......................==....=D???????$D
                    N?............................$D=.DII77II??I8
                   M=.............................7DD.=Z?????+ZN?+
                  +...................................N?????????NM
                  M.........................=O?......O8OI????????OO
                 7..........................$NN=....8????I8??????IO
                 M.................................?8??????N?????N:
                 M............................7N=..N??????8ND=.7
                 O........................?Z8:,D...N??????7?.7.M
                  M=................?ONZNN:    N...D7?????$?..M
                   D.$NND88888D8OD?:   MNN  ,?+....D?????77N?
                   M, MM  Z......D:,        ,7?......77??M
                    7,  ,Z?........=8      ?D=.........N:
                    D=8NN...........O +__===7..........8
                    ZN+............._____.....=.......M
                   =7......$O+................+ND.......+,
                  N......+...D..............N?,N=........M
                 M...........D...........=N=,==...........M   $MMMN,
                N..........ID=..........N:,NNN.............ZM$.M+.INN7
               N......ZDI=...........+D.MMMNM8MZ...........8=O=.....O8M,
               ....$8  8............NNM,       78D........N............D
               ...M   8..........+NMN         :...N.......7..........+NNM
               =M7    M.......$NMI            M....N?....7=.........O..=
                        :.~~~~               M.....O=..??.......88.....M
                                              ?.....N..$........O.......M
                                             M......D.D=.......?=.......D:
                                           M.=D....II........8=.O........I
                                         M..?7...O+........O..?D.......N
                                        N...?7.7Z=........D=..N........8
                                                                  
                             Hello Smithers. You are quite good at turning me on
                      Welcome to the Springfield Nuclear Plant Employee Tracking System                     
                            `))
);


async function userPrompt() {

    return inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "action",
                choices: [
                    "View all employees",
                    "View all departments",
                    "View all roles",
                    "Add employee",
                    "Add department",
                    "Add role",
                    "Update employee role",
                    "Remove employee",
                    "Exit"
                ]
            }
        ])
}

async function getDepartmentId(departmentName) {
    let query = "SELECT * FROM department WHERE department.name=?";
    let args = [departmentName];
    const rows = await db.query(query, args);
    return rows[0].id;
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

async function getDepartmentInfo() {
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the name of the new department?",
                name: "departmentName"
            }
        ])
}

async function getEmployeeId(fullName) {
    // First split the name into first name and last name
    let employee = getFirstAndLastName(fullName);

    let query = 'SELECT id FROM employee WHERE employee.first_name=? AND employee.last_name=?';
    let args = [employee[0], employee[1]];
    const rows = await db.query(query, args);
    return rows[0].id;
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

function getFirstAndLastName(fullName) {

    let employee = fullName.split(" ");
    if (employee.length == 2) {
        return employee;
    }

    const last_name = employee[employee.length - 1];
    let first_name = " ";
    for (let i = 0; i < employee.length - 1; i++) {
        first_name = first_name + employee[i] + " ";
    }
    return [first_name.trim(), last_name];
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

async function getEmployeeNames() {
    let query = "SELECT * FROM employee";

    const rows = await db.query(query);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
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
    let query = "SELECT * FROM employee WHERE manager_id=1";

    const rows = await db.query(query);
    //console.log("number of rows returned " + rows.length);
    let employeeNames = [];
    for (const employee of rows) {
        employeeNames.push(employee.first_name + " " + employee.last_name);
    }
    return employeeNames;
}

async function getRoles() {
    let query = "SELECT title FROM role";
    const rows = await db.query(query);
    //console.log("Number of rows returned: " + rows.length);

    let roles = [];
    for (const row of rows) {
        roles.push(row.title);
    }

    return roles;
}

async function getDepartmentNames() {
    let query = "SELECT name FROM department";
    const rows = await db.query(query);
    //console.log("Number of rows returned: " + rows.length);

    let departments = [];
    for (const row of rows) {
        departments.push(row.name);
    }

    return departments;
}

async function getRoleId(roleName) {
    let query = "SELECT * FROM role WHERE role.title=?";
    let args = [roleName];
    const rows = await db.query(query, args);
    return rows[0].id;
}

async function getRoleInfo() {
    const departments = await getDepartmentNames();
    return inquirer
        .prompt([
            {
                type: "input",
                message: "What is the title of the new role?",
                name: "roleName"
            },
            {
                type: "input",
                message: "What is the salary of the new role?",
                name: "salary"
            },
            {
                type: "list",
                message: "Which department uses this role?",
                name: "departmentName",
                choices: [
                    // populate from db
                    ...departments
                ]
            }
        ])
}

async function removeEmployee(employeeInfo) {
    const employeeName = getFirstAndLastName(employeeInfo.employeeName);
    // DELETE from employee WHERE first_name="Cyrus" AND last_name="Smith";
    let query = "DELETE from employee WHERE first_name=? AND last_name=?";
    let args = [employeeName[0], employeeName[1]];
    const rows = await db.query(query, args);
    console.log(`Employee removed: ${employeeName[0]} ${employeeName[1]}`);
}

async function getRemoveEmployeeInfo() {
    const employees = await getEmployeeNames();
    return inquirer
        .prompt([
            {
                type: "list",
                message: "Which employee do you want to remove?",
                name: "employeeName",
                choices: [
                    // populate from db
                    ...employees
                ]
            }
        ])
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
            case 'Remove employee': {
                const employee = await getRemoveEmployeeInfo();
                await removeEmployee(employee);
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
