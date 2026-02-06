import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Database } from "../settings/db";

export interface User extends RowDataPacket {
  id?: number;
  name: string;
  email: string;
}

export class UserRepository {
  private readonly db = Database.getInstance();

  public async findAll(): Promise<User[]> {
    const [rows] = await this.db.query<User[]>("SELECT * FROM users");
    return rows;
  }

  public async findById(id: number): Promise<User | null> {
    const [rows] = await this.db.query<User[]>(
      "SELECT * FROM users WHERE id = ?",
      [id],
    );
    return rows.length > 0 ? rows[0] : null;
  }

  public async create(user: User): Promise<User> {
    const { name, email } = user;
    const [result] = await this.db.execute<ResultSetHeader>(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
    );
    return { id: result.insertId, name, email } as User;
  }

  public async update(id: number, user: User): Promise<User | null> {
    const { name, email } = user;
    const [result] = await this.db.execute<ResultSetHeader>(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, id],
    );
    return result.affectedRows > 0 ? ({ id, name, email } as User) : null;
  }

  public async delete(id: number): Promise<boolean> {
    const [result] = await this.db.execute<ResultSetHeader>(
      "DELETE FROM users WHERE id = ?",
      [id],
    );
    return result.affectedRows > 0;
  }
}
