
INSERT INTO department (name)
VALUES ("Engineering"),
       ("Law"),
       ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineering", 130000, 01),
       ("Account Manager", 160000, 03 ),
       ("Lead Engineer", 150000, 01),
       ("Accountant", 125000, 03),
       ("Legal Lead", 250000, 02);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sonia", "Sotomayor", 01, NULL),
       ("Maria", "Hinojosa", 02, 01), 
       ("Selena", "Quintanilla", 02, NULL),
       ("Frida", "Kahlo", 03, 02),
       ("Celia", "Cruz", 04, NULL); 
 