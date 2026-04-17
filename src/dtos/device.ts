import type { DeviceState } from "./device-state";

export const DEVICE_TYPES = [
  "sensor",
  "actuator",
  "switch",
  "light",
  "climate",
  "thermostat",
  "camera",
  "lock",
  "meter",
  "alarm",
  "gateway",
  "other",
] as const;

export type DeviceType =
  | (typeof DEVICE_TYPES)[number];

export type DeviceStatus = "online" | "offline" | "unknown";

export interface Device {
  /** Internal device identifier (usually UUID). */
  id: string;
  /** External device identifier used in telemetry/MQTT topics. */
  deviceId?: string;
  /** House identifier that owns this device. */
  houseId: string;
  /** Optional room identifier where device is placed. */
  roomId?: string;
  /** Device display name. */
  name: string;
  /** Common device type. */
  type: DeviceType;
  /** Online/offline connectivity state. */
  status?: DeviceStatus;
  /** Identifier of user/service who owns this device. */
  ownerId?: string;
  /** Optional vendor/model descriptor. */
  model?: string;
  /** Optional MQTT topic prefix for command/state communication. */
  mqttTopicPrefix?: string;
  /** Arbitrary metadata for integrations. */
  metadata?: Record<string, unknown>;
  /** Cached runtime state for convenience. */
  currentState?: DeviceState;
  /** Creation timestamp in ISO 8601 format. */
  createdAt?: string;
  /** Last update timestamp in ISO 8601 format. */
  updatedAt?: string;
}
