import type { Prompt } from "../../types";
import { architectureQualityPrompts } from "./architecture-quality";
import { architectureStructurePrompts } from "./architecture-structure";
import { architectureDecisionPrompts } from "./architecture-decisions";
import { distributedSystemsPrompts } from "./distributed-systems";
import { backendAndApisPrompts } from "./backend-and-apis";
import { frontendPrompts } from "./frontend";
import { deliveryAndOperationsPrompts } from "./delivery-and-operations";
import { dataAndSupabasePrompts } from "./data-and-supabase";
import { nextjsPrompts } from "./nextjs";
import { testingAndMaintenancePrompts } from "./testing-and-maintenance";
import { projectDiscoveryPrompts } from "./project-discovery";

const promptGroups: Prompt[][] = [
  projectDiscoveryPrompts,
  architectureQualityPrompts,
  architectureStructurePrompts,
  architectureDecisionPrompts,
  distributedSystemsPrompts,
  backendAndApisPrompts,
  frontendPrompts,
  deliveryAndOperationsPrompts,
  dataAndSupabasePrompts,
  nextjsPrompts,
  testingAndMaintenancePrompts,
];

const promptsById = new Map<string, Prompt>(
  promptGroups.flat().map((prompt) => [prompt.id, prompt] as [string, Prompt]),
);

const promptOrder = [
  "analyze-project-repository",
  "review-pull-request",
  "define-code-review-process",
  "create-project-code-review-checklist",
  "refactor-legacy-code",
  "design-rest-api",
  "review-software-architecture",
  "discover-quality-attributes",
  "convert-requirements-into-quality-scenarios",
  "analyze-quality-attribute-tensions",
  "analyze-internal-application-organization",
  "compare-application-organization-strategies",
  "migrate-layers-to-vertical-slices",
  "generate-architectural-alternatives",
  "evaluate-economic-impact-of-architectural-decision",
  "build-c4-system-model",
  "review-c4-system-model",
  "recommend-software-architecture",
  "generate-unit-tests",
  "investigate-production-incident",
  "improve-observability",
  "write-technical-decision-record",
  "design-cicd-pipeline",
  "generate-release-notes-from-commits",
  "turn-pull-request-into-release-note",
  "prepare-release-checklist",
  "optimize-sql-query",
  "threat-modeling",
  "setup-supabase-local-project",
  "add-supabase-package-scripts",
  "configure-supabase-environment-secrets",
  "create-supabase-seed-data",
  "recommend-shadcn-preset",
  "configure-shadcn-theme",
  "install-shadcn-core-components",
  "create-shadcn-component-gallery",
  "evaluate-configure-storybook",
  "configure-nextjs-environment",
  "configure-nextjs-error-states",
  "configure-nextjs-metadata-seo",
  "evaluate-configure-nextjs-proxy",
  "write-git-commit-messages",
  "create-contributing-guide",
  "prepare-project-onboarding-checklist",
  "define-branch-and-commit-conventions",
  "evaluate-rendering-strategies",
  "classify-frontend-state",
  "debug-frontend-issue",
  "review-docker-configuration",
  "configure-supabase-migration-workflow",
  "design-supabase-schema-rls",
  "plan-database-migration",
  "write-integration-tests",
  "document-module",
  "evaluate-architecture-evolvability",
  "define-architecture-fitness-functions",
  "critical-architecture-review",
  "analyze-hexagonal-architecture",
  "detect-domain-contamination",
  "choose-communication-style",
  "analyze-remote-call-chain",
  "analyze-distributed-failure-scenarios",
  "design-remote-call-resilience",
  "compare-api-styles",
  "review-api-contract",
  "design-api-error-model",
] as const;

function getPrompt(id: string): Prompt {
  const prompt = promptsById.get(id);
  if (!prompt) {
    throw new Error(`Missing software-development prompt: ${id}`);
  }
  return prompt;
}

// Conserva el orden histórico del catálogo aunque los datos estén separados por tema.
export const softwareDevelopmentPrompts: Prompt[] = promptOrder.map(getPrompt);
