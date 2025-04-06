import kafkaProducer from '../../../infrastructure/kafka/producer';
import { logger } from '../../../shared/utils/logger';

export class UserActivityProducer {
  private static readonly TOPIC = 'user-activities';

  static async produce(activity: {
    userId: string;
    activityType: string;
    metadata?: Record<string, any>;
  }): Promise<void> {
    try {
      await kafkaProducer.send(this.TOPIC, {
        ...activity,
        timestamp: new Date().toISOString()
      });
      logger.info(`Produced user activity event: ${JSON.stringify(activity)}`);
    } catch (error) {
      logger.error(`Failed to produce user activity event: ${error}`);
      throw error;
    }
  }
}