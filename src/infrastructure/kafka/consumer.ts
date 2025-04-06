import { Kafka, Consumer } from 'kafkajs';
import { logger } from '../../shared/utils/logger';

class KafkaConsumer {
  private consumer: Consumer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'user-activity-service',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
    });
    this.consumer = kafka.consumer({ groupId: 'user-activity-group' });
  }

  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      logger.info('Kafka consumer connected successfully');
    } catch (error) {
      logger.error('Failed to connect Kafka consumer', error);
      throw error;
    }
  }

  async subscribe(topic: string, callback: (message: any) => Promise<void>): Promise<void> {
    try {
      await this.consumer.subscribe({ topic, fromBeginning: true });
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          if (message.value) {
            await callback(JSON.parse(message.value.toString()));
          }
        }
      });
      logger.info(`Subscribed to topic: ${topic}`);
    } catch (error) {
      logger.error(`Failed to subscribe to topic ${topic}`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
      logger.info('Kafka consumer disconnected successfully');
    } catch (error) {
      logger.error('Failed to disconnect Kafka consumer', error);
    }
  }
}

export default new KafkaConsumer();