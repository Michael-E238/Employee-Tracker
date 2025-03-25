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
const db_1 = __importDefault(require("./../utils/db"));
class Employee {
    constructor(id, firstName, lastName, roleId, managerId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
    }
    static getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM employee');
            return result.rows.map((row) => new Employee(row.id, row.first_name, row.last_name, row.role_id, row.manager_id));
        });
    }
    static getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM employee WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return null;
            }
            return new Employee(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].role_id, result.rows[0].manager_id);
        });
    }
    static createEmployee(firstName, lastName, roleId, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
            return new Employee(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].role_id, result.rows[0].manager_id);
        });
    }
    static updateEmployee(id, firstName, lastName, roleId, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5 RETURNING *', [firstName, lastName, roleId, managerId, id]);
            return new Employee(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].role_id, result.rows[0].manager_id);
        });
    }
    static deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('DELETE FROM employee WHERE id = $1', [id]);
        });
    }
}
exports.default = Employee;
