INSERT INTO department (id, name) 
VALUES
  (1, 'Sales'),
  (2, 'Marketing'),
  (3, 'Engineering'),
  (4, 'Finance');


INSERT INTO roles (title, salary, department_id) 
VALUES
  ('Sales Manager', 60000, 1),
  ('Sales Representative', 40000, 1),
  ('Marketing Coordinator', 45000, 2),
  ('Software Engineer', 80000, 3),
  ('Product Manager', 90000, 3),
  ('Financial Analyst', 55000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
 VALUES
  ('John', 'Connor', 1, NULL),
  ('Rocky', 'Balboa', 2, 1),
  ('Boobie', 'Miles', 2, 1),
  ('James', 'Bond', 3, NULL),
  ('John', 'Wick', 4, 3),
  ('Wonder', 'Woman', 4, 3),
  ('Anakin', 'Skywalker', 5, NULL),
  ('Regina', 'George', 6, 5);


