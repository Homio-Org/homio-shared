import type { DeviceState } from "../dtos/device-state";
import type { Notification } from "../dtos/notification";
import type { Rule } from "../dtos/rule";
import type { Telemetry } from "../dtos/telemetry";
import type { EventName } from "./topics";

/**
 * Generic command payload published to command topic.
 * Shape is integration-specific, but action is strongly encouraged.
 */
export interface DeviceCommandPayload {
  action?: string;
  params?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Payload published by device manager to state topic.
 * Includes lightweight envelope useful for routing and auditing.
 */
export interface DeviceStatePayload extends DeviceState {
  event?: "state_updated";
  timestamp?: string;
}

/**
 * Payload published by devices to telemetry topic.
 * Can be a plain telemetry document or telemetry with optional envelope.
 */
export interface TelemetryPayload extends Telemetry {
  event?: "telemetry";
  timestamp?: string;
}

export interface TelemetryReceivedEventPayload {
  event: "telemetry.received";
  houseId: string;
  deviceId: string;
  timestamp: string;
  payload: TelemetryPayload;
}

export interface DeviceStateUpdatedEventPayload {
  event: "device.state.updated";
  houseId: string;
  deviceId: string;
  timestamp: string;
  payload: DeviceStatePayload;
}

export interface RuleTriggeredEventPayload {
  event: "rule.triggered";
  houseId: string;
  ruleId: string;
  timestamp: string;
  payload: Rule;
}

export interface NotificationRequestedEventPayload {
  event: "notification.requested";
  houseId: string;
  timestamp: string;
  payload: Notification;
}

export interface EventPayloadMap {
  "telemetry.received": TelemetryReceivedEventPayload;
  "device.state.updated": DeviceStateUpdatedEventPayload;
  "rule.triggered": RuleTriggeredEventPayload;
  "notification.requested": NotificationRequestedEventPayload;
}

export type EventPayload<E extends EventName = EventName> = EventPayloadMap[E];
