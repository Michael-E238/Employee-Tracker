"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const department_1 = __importDefault(require("./models/department"));
const role_1 = __importDefault(require("./models/role"));
const employee_1 = __importDefault(require("./models/employee"));
const db_1 = __importDefault(require("./utils/db"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield inquirer_1.default.prompt({
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
            const departments = yield department_1.default.getAllDepartments();
            console.log(departments);
            break;
        case 'View all roles':
            const roles = yield role_1.default.getAllRoles();
            console.log(roles);
            break;
        case 'View all employees':
            const employees = yield employee_1.default.getAllEmployees();
            console.log(employees);
            break;
        case 'Add a department':
            const departmentName = yield inquirer_1.default.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the department name:',
            });
            yield db_1.default.query('INSERT INTO department (name) VALUES ($1)', [departmentName.name]);
            break;
        case 'Add a role':
            const roleName = yield inquirer_1.default.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the role name:',
            });
            const roleSalary = yield inquirer_1.default.prompt({
                type: 'number',
                name: 'salary',
                message: 'Enter the role salary:',
            });
            const departmentId = yield inquirer_1.default.prompt({
                type: 'number',
                name: 'departmentId',
                message: 'Enter the department ID:',
            });
            yield db_1.default.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [roleName.name, roleSalary.salary, departmentId.departmentId]);
            break;
        case 'Add an employee':
            const firstName = yield inquirer_1.default.prompt({
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee first name:',
            });
            const lastName = yield inquirer_1.default.prompt({
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee last name:',
            });
            const roleId = yield inquirer_1.default.prompt({
                type: 'number',
                name: 'roleId',
                message: 'Enter the role ID:',
            });
            const managerId = yield inquirer_1.default.prompt({
                type: 'number',
                name: 'managerId',
                message: 'Enter the manager ID (or 0 if none):',
            });
            yield db_1.default.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName.firstName, lastName.lastName, roleId.roleId, managerId.managerId]);
            break;
        case 'Update an employee role':
            const employeeId = yield inquirer_1.default.prompt({
                type: 'number',
                name: 'employeeId',
                message: 'Enter the employee ID:',
            });
            const newRoleId = yield inquirer_1.default.prompt({
                type: 'number',
                name: 'newRoleId',
                message: 'Enter the new role ID:',
            });
            yield db_1.default.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId.newRoleId, employeeId.employeeId]);
            break;
        case 'Update a department':
            const departmentsList = yield department_1.default.getAllDepartments();
            const departmentChoices = departmentsList.map((department) => ({
                name: department.name,
                value: department.id,
            }));
            const departmentIdUpdate = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'id',
                message: 'Select a department to update:',
                choices: departmentChoices,
            });
            const updatedDepartmentName = yield inquirer_1.default.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter the new department name:',
            });
            yield db_1.default.query('UPDATE department SET name = $1 WHERE id = $2', [updatedDepartmentName.name, departmentIdUpdate.id]);
            break;
        case 'Delete a department':
            const departmentsListDelete = yield department_1.default.getAllDepartments();
            const departmentChoicesDelete = departmentsListDelete.map((department) => ({
                name: department.name,
                value: department.id,
            }));
            const departmentIdDelete = yield inquirer_1.default.prompt({
                type: 'list',
                name: 'id',
                message: 'Select a department to delete:',
                choices: departmentChoicesDelete,
            });
            yield db_1.default.query('DELETE FROM department WHERE id = $1', [departmentIdDelete.id]);
            break;
        case 'Exit':
            process.exit(0);
    }
    main();
});
main();
