import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { pool } from '../config/db';

export interface User {
  id?: number;
  name: string;
  email: string;
}

export class UserRepository {
  
  public async findAll(): Promise<User[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users');
    return rows as User[];
  }

  public async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  public async create(user: User): Promise<User> {
    const { name, email } = user;
    const [result] = await pool.query<ResultSetHeader>('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return { id: result.insertId, name, email };
  }

  public async update(id: number, user: User): Promise<User | null> {
    const { name, email } = user;
    const [result] = await pool.query<ResultSetHeader>('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    if (result.affectedRows === 0) return null;
    return { id, name, email };
  }

  public async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
