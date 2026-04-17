export const NOTIFICATION_TYPES = ["info", "warning", "error", "critical"] as const;
export type NotificationLevel = (typeof NOTIFICATION_TYPES)[number];

export const NOTIFICATION_CHANNELS = ["in-app", "push", "email", "telegram", "webhook"] as const;
export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number];

export interface Notification {
  /** Notification identifier. */
  id: string;
  /** House identifier for routing/visibility. */
  houseId: string;
  /** Optional related device identifier. */
  deviceId?: string;
  /** Notification title. */
  title: string;
  /** Notification body. */
  message: string;
  /** Priority/severity level. */
  level: NotificationLevel;
  /** Delivery channel. */
  channel: NotificationChannel;
  /** Creation timestamp in ISO 8601 format. */
  createdAt: string;
  /** Optional read timestamp in ISO 8601 format. */
  readAt?: string;
}
