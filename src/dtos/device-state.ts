export type DeviceOnlineStatus = "online" | "offline" | "unknown";

export interface DeviceState {
  deviceId: string;
  houseId: string;
  status: DeviceOnlineStatus;
  lastSeenAt?: string;
  state?: Record<string, unknown>;
  firmwareVersion?: string;
}
