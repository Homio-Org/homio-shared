# homio-shared

Shared TypeScript types, JSON Schemas, OpenAPI fragments, and MQTT helpers for the Homio platform.

## Install

Link from sibling services (local development):

```bash
cd homio-shared
npm install
npm run build
```

In a consumer `package.json`:

```json
{
  "dependencies": {
    "homio-shared": "file:../homio-shared"
  }
}
```

## MQTT topics

Default prefix: `smart-home` (override with `MQTT_TOPIC_PREFIX` in data-collector).

| Kind | Pattern |
|------|---------|
| Telemetry | `smart-home/{houseId}/device/{deviceId}/telemetry` |
| Command | `smart-home/{houseId}/device/{deviceId}/command` |
| State | `smart-home/{houseId}/device/{deviceId}/state` |

`houseId` is the persisted house UUID. `deviceId` in topics is the Device Manager internal device UUID (`devices.id`), not the optional external `deviceId` field.

TypeScript helpers live in `src/mqtt/topics.ts` (`telemetryTopic`, `commandTopic`, `buildCommandTopic`, parsers, subscription patterns).

## DTOs

| Export | File |
|--------|------|
| `Device`, `DeviceType` | `src/dtos/device.ts` |
| `DeviceCommandRequest`, `MqttCommandPayload` | `src/dtos/device-command.ts` |
| `DeviceState` | `src/dtos/device-state.ts` |
| `House`, `Room` | `src/dtos/location.ts` |
| `Telemetry` | `src/dtos/telemetry.ts` |
| `Rule` | `src/dtos/rule.ts` |
| `Notification` | `src/dtos/notification.ts` |

Entry point: `src/index.ts`.

## Schemas and OpenAPI

- JSON Schema: `schemas/*.json`
- OpenAPI fragments: `openapi/common.yaml`, `openapi/telemetry.yaml`, `openapi/device.yaml`, `openapi/mqtt.yaml`

## Scripts

```bash
npm run build
npm run test:topics
```
