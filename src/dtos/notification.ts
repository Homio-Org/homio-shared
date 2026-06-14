export const NOTIFICATION_TYPES = ["info", "warning", "error", "critical"] as const;
export type NotificationLevel = (typeof NOTIFICATION_TYPES)[number];

export const NOTIFICATION_CHANNELS = ["in-app", "push", "email", "telegram", "webhook"] as const;
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];

export interface Notification {
  id: string;
  houseId: string;
  deviceId?: string;
  title: string;
  message: string;
  level: NotificationLevel;
  channel: NotificationChannel;
  createdAt: string;
  readAt?: string;
}
