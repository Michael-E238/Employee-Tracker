import db from './../utils/db';

class Role {
  id: number;
  title: string;
  salary: number;
  departmentId: number;

  constructor(id: number, title: string, salary: number, departmentId: number) {
    this.id = id;
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  static async getAllRoles(): Promise<Role[]> {
    const result = await db.query('SELECT * FROM role');
    return result.rows.map((row) => new Role(row.id, row.title, row.salary, row.department_id));
  }

  static async getRoleById(id: number): Promise<Role | null> {
    const result = await db.query('SELECT * FROM role WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return new Role(result.rows[0].id, result.rows[0].title, result.rows[0].salary, result.rows[0].department_id);
  }

  static async createRole(title: string, salary: number, departmentId: number): Promise<Role> {
    const result = await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [title, salary, departmentId]);
    return new Role(result.rows[0].id, result.rows[0].title, result.rows[0].salary, result.rows[0].department_id);
  }

  static async updateRole(id: number, title: string, salary: number, departmentId: number): Promise<Role> {
    const result = await db.query('UPDATE role SET title = $1, salary = $2, department_id = $3 WHERE id = $4 RETURNING *', [title, salary, departmentId, id]);
    return new Role(result.rows[0].id, result.rows[0].title, result.rows[0].salary, result.rows[0].department_id);
  }

  static async deleteRole(id: number): Promise<void> {
    await db.query('DELETE FROM role WHERE id = $1', [id]);
  }
}

export default Role;