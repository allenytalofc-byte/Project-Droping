import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class OrdersService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(userId: string, role: string) {
    let query = 'SELECT * FROM orders';
    const params = [];

    if (role === 'customer') {
      params.push(userId);
      query += ' WHERE customer_id = $1';
    }

    query += ' ORDER BY created_at DESC';
    const result = await this.db.query(query, params);
    return result.rows;
  }

  async findById(id: string) {
    const result = await this.db.query(
      `SELECT o.*, u.full_name as customer_name, u.email as customer_email
       FROM orders o
       JOIN users u ON o.customer_id = u.id
       WHERE o.id = $1`,
      [id],
    );
    return result.rows[0];
  }
}
