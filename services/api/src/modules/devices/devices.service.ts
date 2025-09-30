import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class DevicesService {
  constructor(private readonly db: DatabaseService) {}

  async registerDevice(userId: string, deviceToken: string, deviceType: string, deviceName?: string) {
    const result = await this.db.query(
      `INSERT INTO devices (user_id, device_token, device_type, device_name)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, device_token) 
       DO UPDATE SET last_used_at = CURRENT_TIMESTAMP, is_active = true
       RETURNING *`,
      [userId, deviceToken, deviceType, deviceName],
    );
    return result.rows[0];
  }

  async getActiveTokens(userId: string) {
    const result = await this.db.query(
      'SELECT device_token FROM devices WHERE user_id = $1 AND is_active = true',
      [userId],
    );
    return result.rows.map(row => row.device_token);
  }

  async getAllActiveTokens() {
    const result = await this.db.query(
      'SELECT device_token FROM devices WHERE is_active = true',
    );
    return result.rows.map(row => row.device_token);
  }
}
