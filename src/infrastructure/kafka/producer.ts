import { Kafka, Producer } from 'kafkajs';
import { logger } from '../../shared/utils/logger';

class KafkaProducer {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'user-activity-service',
      brokers: [process.env.KAFKA_BROKERS || 'localhost:9092']
    });
    this.producer = kafka.producer();
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
      logger.info('Kafka producer connected successfully');
    } catch (error) {
      logger.error('Failed to connect Kafka producer', error);
      throw error;
    }
  }

  async send(topic: string, message: any): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }]
      });
    } catch (error) {
      logger.error(`Failed to send message to topic ${topic}`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      logger.info('Kafka producer disconnected successfully');
    } catch (error) {
      logger.error('Failed to disconnect Kafka producer', error);
    }
  }
}

export default new KafkaProducer();