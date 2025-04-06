import { UserActivity, IUserActivity } from '../entities/user-activity.entity';
import { PaginateResult } from 'mongoose';

export interface IUserActivityRepository {
  create(activity: Omit<IUserActivity, '_id' | 'timestamp'>): Promise<IUserActivity>;
  findByUserId(userId: string, page: number, limit: number): Promise<PaginateResult<IUserActivity>>;
  findByType(activityType: string, page: number, limit: number): Promise<PaginateResult<IUserActivity>>;
}

export class UserActivityRepository implements IUserActivityRepository {
  async create(activity: Omit<IUserActivity, '_id' | 'timestamp'>): Promise<IUserActivity> {
    return UserActivity.create(activity);
  }

  async findByUserId(userId: string, page: number = 1, limit: number = 10): Promise<PaginateResult<IUserActivity>> {
    const options = {
      page,
      limit,
      sort: { timestamp: -1 }
    };
    
    return UserActivity.paginate({ userId }, options);
  }

  async findByType(activityType: string, page: number = 1, limit: number = 10): Promise<PaginateResult<IUserActivity>> {
    const options = {
      page,
      limit,
      sort: { timestamp: -1 }
    };
    
    return UserActivity.paginate({ activityType }, options);
  }
}