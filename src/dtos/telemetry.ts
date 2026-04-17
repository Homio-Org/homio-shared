/**
 * Telemetry DTO — device telemetry payload published to MQTT.
 * Aligned with schemas/telemetry.json and openapi/telemetry.yaml.
 */
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
  /** Telemetry metric key, for example: temperature, humidity, co2. */
  key: TelemetryMetricKey;
  /** Numeric value of the metric. */
  value: number;
  /** Optional metric unit, for example: C, %, ppm. */
  unit?: string;
}

export interface Telemetry {
  /** Temperature in Celsius */
  temperature?: number;
  /** Relative humidity in percent (0–100) */
  humidity?: number;
  /** Sound level (e.g. dB) */
  sound_level?: number;
  /** Illuminance in lux */
  illuminance?: number;
  /** CO2 concentration in ppm */
  co2?: number;
  /** Motion detected */
  motion?: boolean;
  /** ISO 8601 timestamp of the reading */
  ts?: string;
  /** Battery level (e.g. 0–100 percent or voltage) */
  battery?: number;
  /** Generic metrics map for integrations that send dynamic keys. */
  metrics?: Record<string, number | boolean | string | null>;
  /** Optional list representation for arbitrary metrics. */
  points?: TelemetryPoint[];
  /** Source device identifier */
  deviceId?: string;
  /** Source house identifier */
  houseId?: string;
}
