DROP DATABASE IF EXISTS eetracker_db;

CREATE database eetracker_db;

USE eetracker_db;

CREATE TABLE department
(
    id INTEGER NOT NULL
    auto_increment PRIMARY KEY,
  name VARCHAR
    (30)
);

    CREATE TABLE role
    (
        id INTEGER NOT NULL
        auto_increment PRIMARY KEY,
  title VARCHAR
        (30),
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY
        (department_id) REFERENCES department
        (id)
);