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
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    static createDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
            return new Department(result.rows[0].id, result.rows[0].name);
        });
    }
    static getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM department');
            return result.rows.map((row) => new Department(row.id, row.name));
        });
    }
    static getDepartmentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('SELECT * FROM department WHERE id = $1', [id]);
            if (result.rows.length === 0) {
                return null;
            }
            return new Department(result.rows[0].id, result.rows[0].name);
        });
    }
    static updateDepartment(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query('UPDATE department SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
            return new Department(result.rows[0].id, result.rows[0].name);
        });
    }
    static deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.query('DELETE FROM department WHERE id = $1', [id]);
        });
    }
}
exports.default = Department;
