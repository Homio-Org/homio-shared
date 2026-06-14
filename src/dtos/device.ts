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

export type DeviceType = (typeof DEVICE_TYPES)[number];

export const DEVICE_STATUSES = ["online", "offline", "unknown"] as const;

export type DeviceStatus = (typeof DEVICE_STATUSES)[number];

export interface Device {
  id: string;
  deviceId?: string;
  houseId: string;
  roomId?: string;
  name: string;
  type: DeviceType;
  status?: DeviceStatus;
  ownerId?: string;
  model?: string;
  mqttTopicPrefix?: string;
  metadata?: Record<string, unknown>;
  currentState?: DeviceState;
  createdAt?: string;
  updatedAt?: string;
}
