export type DeviceOnlineStatus = "online" | "offline" | "unknown";

export interface DeviceState {
  /** Device identifier. */
  deviceId: string;
  /** House identifier for scoping the device state. */
  houseId: string;
  /** Current connectivity status of the device. */
  status: DeviceOnlineStatus;
  /** Last seen timestamp in ISO 8601 format. */
  lastSeenAt?: string;
  /** Latest telemetry snapshot associated with this state. */
  state?: Record<string, unknown>;
  /** Optional firmware version currently reported by device. */
  firmwareVersion?: string;
}
