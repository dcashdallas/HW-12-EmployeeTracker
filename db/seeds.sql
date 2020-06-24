-- Departments 

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
    ("Sector 7-6");


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
    ("Slog", 35000, 4);





-- Employees

INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Charles Montgomery", "Burns", 1, 1);

INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Waylon", "Smithers", 2, 1);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Lenny", "Leonard", 4, 2);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Carl", "Carlson", 4, 2);

INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Barry", "Macklebarry", 3, 2);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Chip", "Davis", 3, 3);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Don", "Bookner", 3, 3);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Inanimate Carbon", "Rod", 2, 1);

INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Pops", "Freshenmeyer", 3, 2);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Zutroy", "Zutroy", 3, 2);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Frank", "Grimes", 4, 2);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Mindy", "Simmons", 3, 2);
INSERT into employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Canary M.", "Burns", 1, 1);
