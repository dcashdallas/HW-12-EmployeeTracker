
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
    ("Safety Inspector", 30000, 3);



-- Employees

INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Charles Montgomery", "Burns", "CEO", null);

INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Waylon", "Smithers", "CEO", "Charles Montgomery Burns");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Lenny", "Leonard", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Carl", "Carlson", "CEO", "Waylon Smithers");

INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Barry", "Macklebarry", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Chip", "Davis", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Don", "Bookner", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Inanimate Carbon", "Rod", "CEO", "Waylon Smithers");

INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Pops", "Freshenmeyer", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Zutroy", "Zutroy", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Frank", "Grimes", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Mindy", "Simmons", "CEO", "Waylon Smithers");
INSERT into employee
    (First_Name, Last_Name, Role_Title, Manager_Name)
VALUES
    ("Canary M.", "Burns", "CEO", "Waylon Smithers");
