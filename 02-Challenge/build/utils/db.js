"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db = new pg_1.Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});
const sqlDir = path_1.default.join(__dirname, '../sql');
fs_1.default.readdirSync(sqlDir).forEach((file) => {
    const filePath = path_1.default.join(sqlDir, file);
    const sql = fs_1.default.readFileSync(filePath, 'utf8');
    db.query(sql);
});
exports.default = db;
