INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineering", 130000, 01),
       ("Account Manager", 160000, 02 ),
       ("Lead Engineer", 150000, 03),
       ("Accountant" 125000, 04),
       ("Legal Lead", 250000, 05);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sonia", "Sotomayor", 01, 1),
("Maria", "Hinojosa", 02, 2), 
("Selena", "Quintanilla", 02, 3),
("Frida", "Kahlo", 03, 4),
("Celia", "Cruz", 04, 5); 
 