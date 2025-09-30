import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(filters?: any) {
    let query = `
      SELECT p.*, c.name as category_name,
             u.full_name as supplier_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.supplier_id = u.id
      WHERE p.is_active = true
    `;
    const params = [];

    if (filters?.category_id) {
      params.push(filters.category_id);
      query += ` AND p.category_id = $${params.length}`;
    }

    query += ' ORDER BY p.created_at DESC LIMIT 100';
    
    const result = await this.db.query(query, params);
    return result.rows;
  }

  async findById(id: string) {
    const result = await this.db.query(
      `SELECT p.*, c.name as category_name,
              u.full_name as supplier_name, u.email as supplier_email
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       LEFT JOIN users u ON p.supplier_id = u.id
       WHERE p.id = $1`,
      [id],
    );
    return result.rows[0];
  }

  async create(supplierId: string, data: any) {
    const result = await this.db.query(
      `INSERT INTO products (supplier_id, category_id, name, slug, description,
                            short_description, sku, price, compare_at_price,
                            cost_price, stock_quantity, images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        supplierId,
        data.category_id,
        data.name,
        data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
        data.description,
        data.short_description,
        data.sku,
        data.price,
        data.compare_at_price,
        data.cost_price,
        data.stock_quantity || 0,
        JSON.stringify(data.images || []),
      ],
    );
    return result.rows[0];
  }

  async update(id: string, supplierId: string, data: any) {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    const allowedFields = [
      'name', 'description', 'short_description', 'price',
      'compare_at_price', 'cost_price', 'stock_quantity', 'images',
      'is_active', 'category_id'
    ];

    allowedFields.forEach(field => {
      if (data[field] !== undefined) {
        fields.push(`${field} = $${paramIndex++}`);
        values.push(field === 'images' ? JSON.stringify(data[field]) : data[field]);
      }
    });

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id, supplierId);
    const result = await this.db.query(
      `UPDATE products SET ${fields.join(', ')}
       WHERE id = $${paramIndex} AND supplier_id = $${paramIndex + 1}
       RETURNING *`,
      values,
    );

    return result.rows[0];
  }

  async delete(id: string, supplierId: string) {
    await this.db.query(
      'UPDATE products SET is_active = false WHERE id = $1 AND supplier_id = $2',
      [id, supplierId],
    );
    return { message: 'Produto desativado com sucesso' };
  }
}
