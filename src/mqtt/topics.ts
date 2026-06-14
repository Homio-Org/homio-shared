export const DEFAULT_MQTT_TOPIC_PREFIX = "smart-home";
export const DEVICE_TOPIC_SEGMENT = "device";
export const EVENTS_TOPIC_SEGMENT = "events";

export type DeviceTopicKind = "telemetry" | "command" | "state";
export type EventName =
  | "telemetry.received"
  | "device.state.updated"
  | "rule.triggered"
  | "notification.requested";

export function normalizeMqttTopicPrefix(prefix: string = DEFAULT_MQTT_TOPIC_PREFIX): string {
  return prefix.replace(/\/+$/, "");
}

export function telemetryTopic(
  houseId: string,
  deviceId: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  const base = normalizeMqttTopicPrefix(prefix);
  return `${base}/${houseId}/${DEVICE_TOPIC_SEGMENT}/${deviceId}/telemetry`;
}

export function commandTopic(
  houseId: string,
  deviceId: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  const base = normalizeMqttTopicPrefix(prefix);
  return `${base}/${houseId}/${DEVICE_TOPIC_SEGMENT}/${deviceId}/command`;
}

export function stateTopic(
  houseId: string,
  deviceId: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  const base = normalizeMqttTopicPrefix(prefix);
  return `${base}/${houseId}/${DEVICE_TOPIC_SEGMENT}/${deviceId}/state`;
}

export function devicesTopic(houseId: string, prefix: string = DEFAULT_MQTT_TOPIC_PREFIX): string {
  const base = normalizeMqttTopicPrefix(prefix);
  return `${base}/${houseId}/${DEVICE_TOPIC_SEGMENT}`;
}

export function telemetrySubscriptionPattern(prefix: string = DEFAULT_MQTT_TOPIC_PREFIX): string {
  const base = normalizeMqttTopicPrefix(prefix);
  return `${base}/+/${DEVICE_TOPIC_SEGMENT}/+/telemetry`;
}

export function commandSubscriptionPattern(prefix: string = DEFAULT_MQTT_TOPIC_PREFIX): string {
  const base = normalizeMqttTopicPrefix(prefix);
  return `${base}/+/${DEVICE_TOPIC_SEGMENT}/+/command`;
}

export function eventTopic(
  houseId: string,
  event: EventName,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  const base = normalizeMqttTopicPrefix(prefix);
  return `${base}/${houseId}/${EVENTS_TOPIC_SEGMENT}/${event}`;
}

export function telemetryReceivedTopic(
  houseId: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  return eventTopic(houseId, "telemetry.received", prefix);
}

export function deviceStateUpdatedTopic(
  houseId: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  return eventTopic(houseId, "device.state.updated", prefix);
}

export function ruleTriggeredTopic(
  houseId: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  return eventTopic(houseId, "rule.triggered", prefix);
}

export function notificationRequestedTopic(
  houseId: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): string {
  return eventTopic(houseId, "notification.requested", prefix);
}

export function parseDeviceTopic(
  topic: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): { houseId: string; deviceId: string; kind: DeviceTopicKind } | null {
  const base = normalizeMqttTopicPrefix(prefix);
  const parts = topic.split("/");
  if (
    parts.length !== 5 ||
    parts[0] !== base ||
    parts[2] !== DEVICE_TOPIC_SEGMENT
  ) {
    return null;
  }
  const kind = parts[4];
  if (kind !== "telemetry" && kind !== "command" && kind !== "state") {
    return null;
  }
  return { houseId: parts[1], deviceId: parts[3], kind };
}

export function parseEventTopic(
  topic: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): { houseId: string; event: EventName } | null {
  const base = normalizeMqttTopicPrefix(prefix);
  const parts = topic.split("/");
  if (
    parts.length !== 4 ||
    parts[0] !== base ||
    parts[2] !== EVENTS_TOPIC_SEGMENT
  ) {
    return null;
  }
  const event = parts[3];
  if (
    event !== "telemetry.received" &&
    event !== "device.state.updated" &&
    event !== "rule.triggered" &&
    event !== "notification.requested"
  ) {
    return null;
  }
  return { houseId: parts[1], event };
}

export function parseTelemetryTopic(
  topic: string,
  prefix: string = DEFAULT_MQTT_TOPIC_PREFIX
): { houseId: string; deviceId: string } | null {
  const parsed = parseDeviceTopic(topic, prefix);
  if (!parsed || parsed.kind !== "telemetry") {
    return null;
  }
  return { houseId: parsed.houseId, deviceId: parsed.deviceId };
}

export const buildCommandTopic = commandTopic;
