import inquirer from 'inquirer';
import Department from './models/department';
import Role from './models/role';
import Employee from './models/employee';
import db from './utils/db';

const main = async () => {
  const answer = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Update a department',
      'Delete a department',
      'Update an employee',
      'Delete an employee',
      'Exit',
    ],
  });
  switch (answer.action) {
    case 'View all departments':
      const departments = await Department.getAllDepartments();
      console.log(departments);
      break;
    case 'View all roles':
      const roles = await Role.getAllRoles();
      console.log(roles);
      break;
    case 'View all employees':
      const employees = await Employee.getAllEmployees();
      console.log(employees);
      break;
    case 'Add a department':
      const departmentName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the department name:',
      });
      await db.query('INSERT INTO department (name) VALUES ($1)', [departmentName.name]);
      break;
    case 'Add a role':
      const roleName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the role name:',
      });
      const roleSalary = await inquirer.prompt({
        type: 'number',
        name:'salary',
        message: 'Enter the role salary:',
      });
      const departmentId = await inquirer.prompt({
        type: 'number',
        name: 'departmentId',
        message: 'Enter the department ID:',
      });
      await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleName.name, roleSalary.salary, departmentId.departmentId]);
      break;
    case 'Add an employee':
      const firstName = await inquirer.prompt({
        type: 'input',
        name: 'firstName',
        message: 'Enter the employee first name:',
      });
      const lastName = await inquirer.prompt({
        type: 'input',
        name: 'lastName',
        message: 'Enter the employee last name:',
      });
      const roleId = await inquirer.prompt({
        type: 'number',
        name: 'roleId',
        message: 'Enter the role ID:',
      });
      const managerId = await inquirer.prompt({
        type: 'number',
        name:'managerId',
        message: 'Enter the manager ID (or 0 if none):',
      });
      await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName.firstName, lastName.lastName, roleId.roleId, managerId.managerId]);
      break;
    case 'Update an employee role':
      const employeeId = await inquirer.prompt({
        type: 'number',
        name: 'employeeId',
        message: 'Enter the employee ID:',
      });
      const newRoleId = await inquirer.prompt({
        type: 'number',
        name: 'newRoleId',
        message: 'Enter the new role ID:',
      });
      await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId.newRoleId, employeeId.employeeId]);
      break;
    case 'Update a department':
      const departmentsList = await Department.getAllDepartments();
      const departmentChoices = departmentsList.map((department) => ({
        name: department.name,
        value: department.id,
      }));
      const departmentIdUpdate = await inquirer.prompt({
        type: 'list',
        name: 'id',
        message: 'Select a department to update:',
        choices: departmentChoices,
      });
      const updatedDepartmentName = await inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Enter the new department name:',
      });
      await db.query('UPDATE department SET name = $1 WHERE id = $2', [updatedDepartmentName.name, departmentIdUpdate.id]);
      break;
    case 'Delete a department':
      const departmentsListDelete = await Department.getAllDepartments();
      const departmentChoicesDelete = departmentsListDelete.map((department) => ({
        name: department.name,
        value: department.id,
      }));
      const departmentIdDelete = await inquirer.prompt({
        type: 'list',
        name: 'id',
        message: 'Select a department to delete:',
        choices: departmentChoicesDelete,
      });
      await db.query('DELETE FROM department WHERE id = $1', [departmentIdDelete.id]);
      break;  
    case 'Exit':
      process.exit(0);
  }
  main();
};

main();