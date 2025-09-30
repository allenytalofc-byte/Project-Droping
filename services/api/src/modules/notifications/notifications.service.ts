import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DatabaseService } from '../../database/database.service';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class NotificationsService {
  private firebaseApp: admin.app.App;

  constructor(
    private readonly db: DatabaseService,
    private readonly devicesService: DevicesService,
  ) {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    try {
      if (admin.apps.length === 0) {
        this.firebaseApp = admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          }),
        });
        console.log('✅ Firebase Admin initialized');
      }
    } catch (error) {
      console.error('❌ Firebase initialization failed:', error);
    }
  }

  async sendToUser(userId: string, notification: any) {
    const tokens = await this.devicesService.getActiveTokens(userId);
    
    if (tokens.length === 0) {
      return { success: false, message: 'No active devices found' };
    }

    return this.sendToTokens(tokens, notification);
  }

  async sendToAll(notification: any) {
    const tokens = await this.devicesService.getAllActiveTokens();
    
    if (tokens.length === 0) {
      return { success: false, message: 'No active devices found' };
    }

    return this.sendToTokens(tokens, notification);
  }

  async sendToTokens(tokens: string[], notification: any) {
    try {
      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
          imageUrl: notification.image_url,
        },
        data: notification.data || {},
        tokens,
      };

      const response = await admin.messaging().sendMulticast(message);

      // Save notification to database
      await this.saveNotification(notification);

      return {
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('Error sending notification:', error);
      return { success: false, error: error.message };
    }
  }

  private async saveNotification(notification: any) {
    await this.db.query(
      `INSERT INTO notifications (user_id, title, body, data, image_url)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        notification.user_id || null,
        notification.title,
        notification.body,
        JSON.stringify(notification.data || {}),
        notification.image_url,
      ],
    );
  }

  async getNotifications(userId: string) {
    const result = await this.db.query(
      `SELECT * FROM notifications 
       WHERE user_id = $1 OR user_id IS NULL
       ORDER BY created_at DESC LIMIT 50`,
      [userId],
    );
    return result.rows;
  }
}
