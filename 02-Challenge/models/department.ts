import db from './../utils/db';

class Department {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  static async createDepartment(name: string): Promise<Department> {
    const result = await db.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [name]);
    return new Department(result.rows[0].id, result.rows[0].name);
  }

  static async getAllDepartments(): Promise<Department[]> {
    const result = await db.query('SELECT * FROM department');
    return result.rows.map((row) => new Department(row.id, row.name));
  }

  static async getDepartmentById(id: number): Promise<Department | null> {
    const result = await db.query('SELECT * FROM department WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return new Department(result.rows[0].id, result.rows[0].name);
  }

  static async updateDepartment(id: number, name: string): Promise<Department> {
    const result = await db.query('UPDATE department SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    return new Department(result.rows[0].id, result.rows[0].name);
  }

  static async deleteDepartment(id: number): Promise<void> {
    await db.query('DELETE FROM department WHERE id = $1', [id]);
  }
}

export default Department;