import mongoose from 'mongoose';
import { logger } from '../../shared/utils/logger';

class MongoDB {
  static async connect(): Promise<void> {
    try {
      const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/user-activity';
      await mongoose.connect(uri);
      logger.info('Connected to MongoDB successfully');
    } catch (error) {
      logger.error('Failed to connect to MongoDB', error);
      throw error;
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      logger.info('Disconnected from MongoDB successfully');
    } catch (error) {
      logger.error('Failed to disconnect from MongoDB', error);
    }
  }
}

export default MongoDB;