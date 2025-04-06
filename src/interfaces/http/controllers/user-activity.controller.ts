import { Request, Response } from 'express';
import { UserActivityService } from '../../../domains/user-activity/services/user-activity.service';
import { UserActivityRepository } from '../../../domains/user-activity/repositories/user-activity.repo';
import { ApiError } from '../../../shared/errors/api-error';
import { logger } from '../../../shared/utils/logger';

const service = new UserActivityService(new UserActivityRepository());

export class UserActivityController {
  static async getActivities(req: Request, res: Response) {
    try {
      const { userId, activityType, page = 1, limit = 10 } = req.query;
      
      let result;
      if (userId) {
        result = await service.getUserActivities(
          userId as string,
          parseInt(page as string),
          parseInt(limit as string)
        );
      } else if (activityType) {
        result = await service.getActivitiesByType(
          activityType as string,
          parseInt(page as string),
          parseInt(limit as string)
        );
      } else {
        throw new ApiError('Either userId or activityType must be provided', 400);
      }

      res.json({
        data: result.docs,
        total: result.totalDocs,
        pages: result.totalPages,
        page: result.page
      });
    } catch (error) {
      logger.error('Failed to get activities', error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  static async recordActivity(req: Request, res: Response) {
    try {
      const { userId, activityType, metadata } = req.body;
      
      if (!userId || !activityType) {
        throw new ApiError('userId and activityType are required', 400);
      }

      const activity = await service.recordActivity( {userId, activityType, metadata} );
      res.status(201).json(activity);
    } catch (error) {
      logger.error('Failed to record activity', error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}