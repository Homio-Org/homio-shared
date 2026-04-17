export type RuleStatus = "enabled" | "disabled";
export type RuleTriggerType = "time" | "device_state" | "telemetry" | "manual";
export type RuleActionType = "device_command" | "notify" | "scene";

export interface RuleCondition {
  /** Condition field, for example: telemetry.temperature. */
  field: string;
  /** Comparison operator: gt, gte, lt, lte, eq, ne, in. */
  operator: string;
  /** Value used by operator. */
  value: string | number | boolean | string[] | number[];
}

export interface RuleAction {
  /** Action type, for example: device.command or notification.send. */
  type: string;
  /** Action payload. */
  payload?: Record<string, unknown>;
}

export interface Rule {
  /** Rule identifier. */
  id: string;
  /** House identifier where rule is executed. */
  houseId: string;
  /** Human readable rule name. */
  name: string;
  /** Optional description. */
  description?: string;
  /** Rule status. */
  status: RuleStatus;
  /** Optional API-oriented enabled flag used by some services. */
  isEnabled?: boolean;
  /** Trigger expression or topic pattern. */
  trigger: string;
  /** Optional structured trigger type used by API services. */
  triggerType?: RuleTriggerType;
  /** Optional structured trigger configuration used by API services. */
  triggerConfig?: Record<string, unknown>;
  /** Optional list of extra conditions. */
  conditions?: RuleCondition[];
  /** Actions executed when rule matches. */
  actions: RuleAction[];
  /** Optional structured single action type used by API services. */
  actionType?: RuleActionType;
  /** Optional structured single action configuration used by API services. */
  actionConfig?: Record<string, unknown>;
  /** Creation timestamp in ISO 8601 format. */
  createdAt?: string;
  /** Last update timestamp in ISO 8601 format. */
  updatedAt?: string;
}
