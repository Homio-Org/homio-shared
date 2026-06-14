export const COMMON_TELEMETRY_KEYS = [
  "temperature",
  "humidity",
  "sound_level",
  "illuminance",
  "co2",
  "motion",
  "battery",
] as const;

export const SENSOR_TYPES = COMMON_TELEMETRY_KEYS;

export type TelemetryMetricKey = (typeof COMMON_TELEMETRY_KEYS)[number] | string;

export interface TelemetryPoint {
  key: TelemetryMetricKey;
  value: number;
  unit?: string;
}

export interface Telemetry {
  temperature?: number;
  humidity?: number;
  sound_level?: number;
  illuminance?: number;
  co2?: number;
  motion?: boolean;
  ts?: string;
  battery?: number;
  metrics?: Record<string, number | boolean | string | null>;
  points?: TelemetryPoint[];
  deviceId?: string;
  houseId?: string;
}
