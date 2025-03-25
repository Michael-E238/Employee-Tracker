-- Insert some sample departments
INSERT INTO department (name)
VALUES ('Sales'),
       ('Marketing'),
       ('IT');

-- Insert some sample roles
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Manager', 80000.00, 1),
       ('Marketing Manager', 90000.00, 2),
       ('Software Engineer', 100000.00, 3),
       ('Sales Representative', 50000.00, 1),
       ('Marketing Specialist', 60000.00, 2);

-- Insert some sample employees
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Jane', 'Smith', 2, NULL),
       ('Bob', 'Johnson', 3, NULL),
       ('Alice', 'Williams', 4, 1),
       ('Mike', 'Davis', 5, 2);