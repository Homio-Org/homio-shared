/**
 * Telemetry DTO — device telemetry payload published to MQTT.
 * Aligned with schemas/telemetry.json and openapi/telemetry.yaml.
 */
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
}
