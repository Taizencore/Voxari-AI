import { z } from 'zod';

// Vertical States
export const VerticalStateSchema = z.enum([
  'VERTICAL_DRAFT',
  'VERTICAL_READY',
  'VERTICAL_ACTIVE',
  'VERTICAL_SHADOW',
  'VERTICAL_CANARY',
  'VERTICAL_DEPRECATED',
  'VERTICAL_ARCHIVED'
]);

// Department States
export const DepartmentStateSchema = z.enum([
  'DEPT_DRAFT',
  'DEPT_PROVISIONING',
  'DEPT_ACTIVE',
  'DEPT_PAUSED',
  'DEPT_THROTTLED',
  'DEPT_DEGRADED',
  'DEPT_ESCALATION_ONLY',
  'DEPT_ARCHIVED'
]);

// Agent States
export const AgentStateSchema = z.enum([
  'AGENT_DRAFT',
  'AGENT_PROVISIONING',
  'AGENT_ACTIVE',
  'AGENT_LISTEN_ONLY',
  'AGENT_TRAINING_MODE',
  'AGENT_PAUSED',
  'AGENT_ESCALATION_LOCKED',
  'AGENT_UNDERPERFORMING',
  'AGENT_OPTIMIZING',
  'AGENT_DEPRECATED'
]);

// Call States
export const CallStateSchema = z.enum([
  'CALL_CREATED',
  'CALL_QUEUED',
  'CALL_RINGING',
  'CALL_ANSWERED',
  'CALL_ESTABLISHING_STREAMS',
  'CALL_LIVE',
  'CALL_TERMINATING',
  'CALL_ENDED',
  'CALL_FAILED'
]);

// Base Entities
export const WorkspaceSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  vertical: z.string(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const DepartmentSchema = z.object({
  id: z.string().uuid(),
  workspaceId: z.string().uuid(),
  name: z.string(),
  state: DepartmentStateSchema,
  config: z.record(z.any())
});

export const AgentSchema = z.object({
  id: z.string().uuid(),
  departmentId: z.string().uuid(),
  name: z.string(),
  state: AgentStateSchema,
  voiceConfig: z.object({
    provider: z.string().default('deepgram'),
    voiceId: z.string()
  })
});

export type VerticalState = z.infer<typeof VerticalStateSchema>;
export type DepartmentState = z.infer<typeof DepartmentStateSchema>;
export type AgentState = z.infer<typeof AgentStateSchema>;
export type CallState = z.infer<typeof CallStateSchema>;
export type Workspace = z.infer<typeof WorkspaceSchema>;
export type Department = z.infer<typeof DepartmentSchema>;
export type Agent = z.infer<typeof AgentSchema>;
