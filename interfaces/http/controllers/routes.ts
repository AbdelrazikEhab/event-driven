import { Router } from 'express';
import { UserActivityController } from '../controllers/user-activity.controller';

export const userActivityRouter = Router();

userActivityRouter.get('/', UserActivityController.getActivities);
userActivityRouter.post('/', UserActivityController.recordActivity);