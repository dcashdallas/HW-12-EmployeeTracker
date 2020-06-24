
-- Departments 
INSERT into department
    (name)
VALUES
    ("Sector 7-6");
INSERT into department
    (name)
VALUES
    ("Nuclear Inspectors");
INSERT into department
    (name)
VALUES
    ("Saftey Inspectors");
INSERT into department
    (name)
VALUES
    ("Danger Emissions");
INSERT into department
    (name)
VALUES
    ("Executives");
    

-- Roles 

INSERT into role
    (title, salary, department_id)
VALUES
    ("CEO", 1000000, 1);

INSERT into role
    (title, salary, department_id)
VALUES
    ("Management", 100000, 2);

INSERT into role
    (title, salary, department_id)
VALUES
    ("Engineers", 90000, 3);

INSERT into role
    (title, salary, department_id)
VALUES
    ("Supervisor", 45000, 4);

INSERT into role
    (title, salary, department_id)
VALUES
    ("Safety Inspectors", 30000, 5);



-- Employees

INSERT into employee
    (first_name, last_name, role_title, manager_id)
VALUES
    ("Charles Montgomery", "Burns", "CEO", null);

INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Waylon", "Smithers", 2, null);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Lenny", "Leonard", 2, 1);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Carl", "Carlson", 2, 1);

INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Barry", "Macklebarry", 3, null);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Chip", "Davis", 4, 3);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Don", "Bookner", 4, 3);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Inanimate Carbon", "Rod", 4, 3);

INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Pops", "Freshenmeyer", 4, null);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Zutroy", "Zutroy", 3, null);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Frank", "Grimes", 4, null);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Mindy", "Simmons", 4, null);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Canary M.", "Burns", 4, null);
