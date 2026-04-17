# homio-shared
Common types, JSON schemas, OpenAPI spec files, topics protocol.

## Shared DTOs
- `Device`
- `Room`, `House`
- `Telemetry`
- `Rule`
- `Notification`
- `DeviceState`

TypeScript exports:
- `src/index.ts`
- `src/dtos/index.ts`
- `src/mqtt/topics.ts`
- `src/mqtt/payloads.ts`
- `src/mqtt/contracts.ts`

## Schemas
- JSON Schema: `schemas/*.json`
- OpenAPI fragments: `openapi/telemetry.yaml`, `openapi/common.yaml`
- MQTT payload schemas: `schemas/mqtt-payloads.json`
