export type NotificationLevel = "info" | "warning" | "error" | "critical";
export type NotificationChannel = "in-app" | "push" | "email" | "telegram" | "webhook";

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
