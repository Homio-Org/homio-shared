import type { DeviceState } from "../dtos/device-state";
import type { Telemetry } from "../dtos/telemetry";

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
