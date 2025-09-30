import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async findById(id: string) {
    const result = await this.db.query(
      `SELECT id, email, full_name, role, phone, avatar_url, is_active, created_at
       FROM users WHERE id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async updateProfile(userId: string, data: any) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (data.full_name) {
      fields.push(`full_name = $${paramIndex++}`);
      values.push(data.full_name);
    }
    if (data.phone) {
      fields.push(`phone = $${paramIndex++}`);
      values.push(data.phone);
    }
    if (data.avatar_url) {
      fields.push(`avatar_url = $${paramIndex++}`);
      values.push(data.avatar_url);
    }

    if (fields.length === 0) {
      return this.findById(userId);
    }

    values.push(userId);
    const result = await this.db.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramIndex}
       RETURNING id, email, full_name, role, phone, avatar_url`,
      values,
    );

    return result.rows[0];
  }
}
