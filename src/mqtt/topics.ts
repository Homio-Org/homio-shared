/**
 * MQTT topic helpers for Homio — central topic layout used by all services.
 */

const PREFIX = 'homio';
const DEVICES_SEGMENT = 'devices';

export type DeviceTopicKind = 'telemetry' | 'command' | 'state';

/**
 * Build telemetry topic for a device in a house.
 * @example telemetryTopic('house-1', 'dev-1') => 'homio/house-1/devices/dev-1/telemetry'
 */
export function telemetryTopic(houseId: string, deviceId: string): string {
  return [PREFIX, houseId, DEVICES_SEGMENT, deviceId, 'telemetry'].join('/');
}

/**
 * Build devices list topic for a house (e.g. for presence/announce).
 * @example devicesTopic('house-1') => 'homio/house-1/devices'
 */
export function devicesTopic(houseId: string): string {
  return [PREFIX, houseId, DEVICES_SEGMENT].join('/');
}

/**
 * Build command topic for a device (server -> device).
 * @example commandTopic('house-1', 'dev-1') => 'homio/house-1/devices/dev-1/command'
 */
export function commandTopic(houseId: string, deviceId: string): string {
  return [PREFIX, houseId, DEVICES_SEGMENT, deviceId, 'command'].join('/');
}

/**
 * Build state topic for a device (device -> server).
 * @example stateTopic('house-1', 'dev-1') => 'homio/house-1/devices/dev-1/state'
 */
export function stateTopic(houseId: string, deviceId: string): string {
  return [PREFIX, houseId, DEVICES_SEGMENT, deviceId, 'state'].join('/');
}

/**
 * Parse a device topic into structured parts or return null if invalid.
 * @example parseDeviceTopic('homio/house-1/devices/dev-1/command')
 * => { houseId: 'house-1', deviceId: 'dev-1', kind: 'command' }
 */
export function parseDeviceTopic(
  topic: string
): { houseId: string; deviceId: string; kind: DeviceTopicKind } | null {
  const parts = topic.split('/');
  if (parts.length !== 5 || parts[0] !== PREFIX || parts[2] !== DEVICES_SEGMENT) {
    return null;
  }
  const kind = parts[4];
  if (kind !== 'telemetry' && kind !== 'command' && kind !== 'state') {
    return null;
  }
  return { houseId: parts[1], deviceId: parts[3], kind };
}

/**
 * Parse telemetry topic into { houseId, deviceId } or null.
 * @example parseTelemetryTopic('homio/house-1/devices/dev-1/telemetry') => { houseId: 'house-1', deviceId: 'dev-1' }
 */
export function parseTelemetryTopic(
  topic: string
): { houseId: string; deviceId: string } | null {
  const parsed = parseDeviceTopic(topic);
  if (!parsed || parsed.kind !== 'telemetry') {
    return null;
  }
  return { houseId: parsed.houseId, deviceId: parsed.deviceId };
}
