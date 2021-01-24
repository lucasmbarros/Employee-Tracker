USE company_db;

INSERT INTO department (name)
VALUES ('Saiyan'), ('Pirate'), ('Hero'), ('Ninja');

INSERT INTO role (title, salary, department_id)
VALUES
  ('Super Saiyan', 100, 1),
  ('SSJ Blue', 800, 1),
  ('Cook', 150, 2),
  ('Swordsman', 500, 2),
  ('MHA Intern', 200, 3),
  ('Number One hero', 0, 3),
  ('Hokage', 250, 2),
  ('Akatsuki', 999, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Trunks', 'Vegeta-Son', 1, 3),
  ('Vegeta', 'Prince', 2, 1),
  ('Sanji', 'Lover', 3, null),
  ('Zoro', 'Roronoa', 4, 3),
  ('Deku', 'Midoriya', 5, null),
  ('All', 'Might', 6, 2),
  ('Naruto', 'Uzumaki', 7, 6),
  ('Itachi', 'Uchiha', 8, null);