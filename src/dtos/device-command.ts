export const DEVICE_COMMAND_ACTIONS = [
  "on",
  "off",
  "simulation.start",
  "simulation.stop",
  "parameters",
] as const;

export type DeviceCommandAction = (typeof DEVICE_COMMAND_ACTIONS)[number];

export const MQTT_DEVICE_COMMANDS = [
  "start",
  "stop",
  "on",
  "off",
  "parameters",
  "simulation",
] as const;

export type MqttDeviceCommand = (typeof MQTT_DEVICE_COMMANDS)[number];

export interface DeviceCommandRequest {
  action?: DeviceCommandAction;
  houseId?: string;
  parameters?: Record<string, unknown>;
  payload?: Record<string, unknown>;
}

export interface MqttCommandPayload {
  command?: MqttDeviceCommand | string;
  running?: boolean;
  parameters?: Record<string, unknown>;
  action?: string;
  params?: Record<string, unknown>;
  [key: string]: unknown;
}
