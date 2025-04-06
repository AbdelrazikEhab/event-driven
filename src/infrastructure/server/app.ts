import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { userActivityRouter } from '../../interfaces/http/controllers/routes';
import { logger } from '../../shared/utils/logger';
import { UserActivityConsumer } from '../../domains/user-activity/events/user-activity.consumer';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.startConsumers();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
    this.express.use(express.json());
  }

  private routes(): void {
    this.express.use('/api/activities', userActivityRouter);
  }

  private async startConsumers(): Promise<void> {
    try {
      await UserActivityConsumer.start();
    } catch (error) {
      logger.error('Failed to start consumers', error);
    }
  }
}

export default new App().express;