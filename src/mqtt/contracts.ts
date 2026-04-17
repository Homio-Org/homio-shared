import type { EventName } from "./topics";
import type {
  DeviceCommandPayload,
  DeviceStatePayload,
  EventPayload,
  TelemetryPayload,
} from "./payloads";

export type DeviceTopicContractKind = "telemetry" | "state" | "command";

export interface DeviceTopicContract {
  houseId: string;
  deviceId: string;
  kind: DeviceTopicContractKind;
}

export type DeviceTopicPayloadMap = {
  telemetry: TelemetryPayload;
  state: DeviceStatePayload;
  command: DeviceCommandPayload;
};

export type DeviceTopicPayload<K extends DeviceTopicContractKind> = DeviceTopicPayloadMap[K];

export interface MqttEventContract<E extends EventName = EventName> {
  houseId: string;
  event: E;
  payload: EventPayload<E>;
}
