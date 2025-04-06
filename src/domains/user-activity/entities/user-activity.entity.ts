import { Schema, model, Document } from 'mongoose';

export interface IUserActivity extends Document {
  userId: string;
  activityType: string;
  timestamp: Date;
  metadata: Record<string, any>;
}

const userActivitySchema = new Schema<IUserActivity>({
  userId: { type: String, required: true, index: true },
  activityType: { type: String, required: true, index: true },
  timestamp: { type: Date, required: true, index: true, default: Date.now },
  metadata: { type: Schema.Types.Mixed, default: {} }
});

userActivitySchema.index({ userId: 1, activityType: 1, timestamp: -1 });

export const UserActivity = model<IUserActivity>('UserActivity', userActivitySchema);