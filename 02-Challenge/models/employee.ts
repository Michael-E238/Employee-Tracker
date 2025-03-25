import db from './../utils/db';

class Employee {
  id: number;
  firstName: string;
  lastName: string;
  roleId: number;
  managerId: number | null;

  constructor(id: number, firstName: string, lastName: string, roleId: number, managerId: number | null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
  }

  static async getAllEmployees(): Promise<Employee[]> {
    const result = await db.query('SELECT * FROM employee');
    return result.rows.map((row) => new Employee(row.id, row.first_name, row.last_name, row.role_id, row.manager_id));
  }

  static async getEmployeeById(id: number): Promise<Employee | null> {
    const result = await db.query('SELECT * FROM employee WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return new Employee(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].role_id, result.rows[0].manager_id);
  }

  static async createEmployee(firstName: string, lastName: string, roleId: number, managerId: number | null): Promise<Employee> {
    const result = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [firstName, lastName, roleId, managerId]);
    return new Employee(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].role_id, result.rows[0].manager_id);
  }

  static async updateEmployee(id: number, firstName: string, lastName: string, roleId: number, managerId: number | null): Promise<Employee> {
    const result = await db.query('UPDATE employee SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4 WHERE id = $5 RETURNING *', [firstName, lastName, roleId, managerId, id]);
    return new Employee(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].role_id, result.rows[0].manager_id);
  }

  static async deleteEmployee(id: number): Promise<void> {
    await db.query('DELETE FROM employee WHERE id = $1', [id]);
  }
}

export default Employee;