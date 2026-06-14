export type RuleStatus = "enabled" | "disabled";
export type RuleTriggerType = "time" | "device_state" | "telemetry" | "manual";
export type RuleActionType = "device_command" | "notify" | "scene";

export interface RuleCondition {
  field: string;
  operator: string;
  value: string | number | boolean | string[] | number[];
}

export interface RuleAction {
  type: string;
  payload?: Record<string, unknown>;
}

export interface Rule {
  id: string;
  houseId: string;
  name: string;
  description?: string;
  status: RuleStatus;
  isEnabled?: boolean;
  trigger: string;
  triggerType?: RuleTriggerType;
  triggerConfig?: Record<string, unknown>;
  conditions?: RuleCondition[];
  actions: RuleAction[];
  actionType?: RuleActionType;
  actionConfig?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}
