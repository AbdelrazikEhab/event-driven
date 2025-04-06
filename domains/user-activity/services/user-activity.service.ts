import { IUserActivityRepository } from '../repositories/user-activity.repo';
import { IUserActivity } from '../entities/user-activity.entity';
import { PaginateResult } from 'mongoose';

export class UserActivityService {
  constructor(private readonly repository: IUserActivityRepository) {}

  async recordActivity(activity: Omit<IUserActivity, '_id' | 'timestamp'>): Promise<IUserActivity> {
    return this.repository.create(activity);
  }

  async getUserActivities(userId: string, page: number = 1, limit: number = 10): Promise<PaginateResult<IUserActivity>> {
    return this.repository.findByUserId(userId, page, limit);
  }

  async getActivitiesByType(activityType: string, page: number = 1, limit: number = 10): Promise<PaginateResult<IUserActivity>> {
    return this.repository.findByType(activityType, page, limit);
  }
}