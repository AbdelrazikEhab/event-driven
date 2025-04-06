export interface UserActivityMessage {
    userId: string;
    activityType: string;
    timestamp: string;
    metadata?: Record<string, any>;
  }