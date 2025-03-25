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
class Role {
    constructor(id, title, salary, departmentId) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
    }
    static getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM role');
            return result.rows.map((row) => new Role(row.id, row.title, row.salary, row.department_id));
        });
    }
    static getRoleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM role WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return null;
            }
            return new Role(result.rows[0].id, result.rows[0].title, result.rows[0].salary, result.rows[0].department_id);
        });
    }
    static createRole(title, salary, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
            return new Role(result.rows[0].id, result.rows[0].title, result.rows[0].salary, result.rows[0].department_id);
        });
    }
    static updateRole(id, title, salary, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('UPDATE role SET title = $1, salary = $2, department_id = $3 WHERE id = $4 RETURNING *', [title, salary, departmentId, id]);
            return new Role(result.rows[0].id, result.rows[0].title, result.rows[0].salary, result.rows[0].department_id);
        });
    }
    static deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('DELETE FROM role WHERE id = $1', [id]);
        });
    }
}
exports.default = Role;
