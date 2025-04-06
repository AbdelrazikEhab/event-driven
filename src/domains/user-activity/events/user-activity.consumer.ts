import kafkaConsumer from '../../../infrastructure/kafka/consumer';
import { UserActivityService } from '../services/user-activity.service';
import { UserActivityRepository } from '../repositories/user-activity.repo';
import { logger } from '../../../shared/utils/logger';

export class UserActivityConsumer {
  private static readonly TOPIC = 'user-activities';
  private static readonly service = new UserActivityService(new UserActivityRepository());

  static async start(): Promise<void> {
    await kafkaConsumer.subscribe(this.TOPIC, async (message) => {
      try {
        await this.service.recordActivity(message);
        logger.info(`Processed user activity: ${JSON.stringify(message)}`);
      } catch (error) {
        logger.error(`Failed to process user activity: ${error}`);
      }
    });
    logger.info(`User activity consumer started for topic: ${this.TOPIC}`);
  }
}