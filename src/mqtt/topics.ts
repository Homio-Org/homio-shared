/**
 * MQTT topic helpers for Homio — central topic layout used by all services.
 */

const PREFIX = 'homio';
const DEVICES_SEGMENT = 'devices';
const EVENTS_SEGMENT = 'events';

export type DeviceTopicKind = 'telemetry' | 'command' | 'state';
export type EventName =
  | 'telemetry.received'
  | 'device.state.updated'
  | 'rule.triggered'
  | 'notification.requested';

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
 * Build event topic for cross-service event contracts.
 * @example eventTopic('house-1', 'rule.triggered') => 'homio/house-1/events/rule.triggered'
 */
export function eventTopic(houseId: string, event: EventName): string {
  return [PREFIX, houseId, EVENTS_SEGMENT, event].join('/');
}

/** Build telemetry.received event topic. */
export function telemetryReceivedTopic(houseId: string): string {
  return eventTopic(houseId, 'telemetry.received');
}

/** Build device.state.updated event topic. */
export function deviceStateUpdatedTopic(houseId: string): string {
  return eventTopic(houseId, 'device.state.updated');
}

/** Build rule.triggered event topic. */
export function ruleTriggeredTopic(houseId: string): string {
  return eventTopic(houseId, 'rule.triggered');
}

/** Build notification.requested event topic. */
export function notificationRequestedTopic(houseId: string): string {
  return eventTopic(houseId, 'notification.requested');
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
 * Parse event topic into structured parts or return null if invalid.
 * @example parseEventTopic('homio/house-1/events/notification.requested')
 * => { houseId: 'house-1', event: 'notification.requested' }
 */
export function parseEventTopic(
  topic: string
): { houseId: string; event: EventName } | null {
  const parts = topic.split('/');
  if (parts.length !== 4 || parts[0] !== PREFIX || parts[2] !== EVENTS_SEGMENT) {
    return null;
  }
  const event = parts[3];
  if (
    event !== 'telemetry.received' &&
    event !== 'device.state.updated' &&
    event !== 'rule.triggered' &&
    event !== 'notification.requested'
  ) {
    return null;
  }
  return { houseId: parts[1], event };
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
