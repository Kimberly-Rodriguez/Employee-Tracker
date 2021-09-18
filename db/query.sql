

SELECT name, id FROM department

-- aliasing
SELECT r.title, r.id AS role_id, d.id AS department_id, d.name, r.salary
FROM role r 
JOIN department  d
on r.department_id = d.id;


SELECT e.id, e.first_name, e.last_name, r.title, d.name, r.salary, e.manager_id
FROM employee e
JOIN role r 
ON r.id = e.role_id 
JOIN department d
ON  d.id = r.department_id

INSERT INTO department (name) VALUES ('testtitle');

INSERT INTO role (title) VALUES (?);

INSERT INTO employee () VALUES;

UPDATE role SET employee = ? WHERE id = ?;

 
  -- Query to SELECT --
  SELECT * FROM employee;
  SELECT * FROM role;
  SELECT * FROM department;


  -- -- Query to Insert --
  INSERT INTO department e (e.title, e.salary, e.id) VALUES (?)
  -- INSERT INTO role (title, salary, department_id) VALUES (title, salary, department_id);
  -- INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (first_name, last_name, role_id, manager_id);

  -- -- Query to Update  --
  -- UPDATE role SET employee = ? WHERE id = ?;
  UPDATE employee SET role_id = ? WHERE id = ?;

  -- -- Query to Delete a  --
  -- DELETE FROM role WHERE id = ?;
  -- DELETE FROM employee WHERE id = ?;

  -- -- Query to Render Movies w/ their Reviews --
  -- SELECT role.title AS Title, employee.employee AS Role FROM employee JOIN role ON role.employee_id = role.id;