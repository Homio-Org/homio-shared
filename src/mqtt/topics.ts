/**
 * MQTT topic helpers for Homio — central topic layout used by all services.
 */

const PREFIX = 'homio';

/**
 * Build telemetry topic for a device in a house.
 * @example telemetryTopic('house-1', 'dev-1') => 'homio/house-1/devices/dev-1/telemetry'
 */
export function telemetryTopic(houseId: string, deviceId: string): string {
  return [PREFIX, houseId, 'devices', deviceId, 'telemetry'].join('/');
}

/**
 * Build devices list topic for a house (e.g. for presence/announce).
 * @example devicesTopic('house-1') => 'homio/house-1/devices'
 */
export function devicesTopic(houseId: string): string {
  return [PREFIX, houseId, 'devices'].join('/');
}

/**
 * Build command topic for a device (server -> device).
 * @example commandTopic('house-1', 'dev-1') => 'homio/house-1/devices/dev-1/command'
 */
export function commandTopic(houseId: string, deviceId: string): string {
  return [PREFIX, houseId, 'devices', deviceId, 'command'].join('/');
}

/**
 * Parse telemetry topic into { houseId, deviceId } or null.
 * @example parseTelemetryTopic('homio/house-1/devices/dev-1/telemetry') => { houseId: 'house-1', deviceId: 'dev-1' }
 */
export function parseTelemetryTopic(
  topic: string
): { houseId: string; deviceId: string } | null {
  const parts = topic.split('/');
  if (
    parts.length !== 5 ||
    parts[0] !== PREFIX ||
    parts[2] !== 'devices' ||
    parts[4] !== 'telemetry'
  ) {
    return null;
  }
  return { houseId: parts[1], deviceId: parts[3] };
}
