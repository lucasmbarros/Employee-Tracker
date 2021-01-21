INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Customer Support'), ('Wrestler');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Sales Lead', 100, 1),
  ('Salesperson', 800, 1),
  ('Lead Engineer', 150, 2),
  ('Software Engineer', 120, 2),
  ('Customer Support Trainer', 145, 3),
  ('Customer Support Rep', 125, 3),
  ('Developer', 250, 2),
  ('Wrestler', 999, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'John', 1, 3),
  ('Frank', 'Frank', 2, 1),
  ('Bobby', 'Bobby', 3, null),
  ('Joe', 'Joe', 4, 3),
  ('Mary', 'Mary', 6, null),
  ('Ana', 'Ana', 7, 2),
  ('Sue', 'Sue', 3, 6),
  ('John', 'Cena', 8, null);