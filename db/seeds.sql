
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Law"),
       ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 130000, 1),
       ("Account Manager", 160000, 3),
       ("Lead Engineer", 150000, 1),
       ("Accountant", 125000, 3),
       ("Legal Lead", 250000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sonia", "Sotomayor", 1, NULL),
       ("Maria", "Hinojosa", 2, 1), 
       ("Selena", "Quintanilla", 2, NULL),
       ("Frida", "Kahlo", 3, 2),
       ("Celia", "Cruz", 4, NULL); 