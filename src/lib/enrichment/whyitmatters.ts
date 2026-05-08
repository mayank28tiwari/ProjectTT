import { ImpactLabel } from "@prisma/client";

interface SignalContext {
  entities: string[];
  sourceName: string;
}

type Template = {
  why: (ctx: SignalContext) => string;
  who: (ctx: SignalContext) => string;
};

const TEMPLATES: Record<ImpactLabel, Template> = {
  BreakingChange: {
    why: (ctx) => `Apps using ${ctx.entities[0] ?? "this library"} will need code changes before upgrading. Review the release notes before bumping versions.`,
    who: (ctx) => `Engineers depending on ${ctx.entities[0] ?? "this library"}.`,
  },
  SecurityFix: {
    why: () => "A security vulnerability was patched. Upgrade affected versions to mitigate risk.",
    who: () => "Anyone running affected versions in production.",
  },
  NewCapability: {
    why: (ctx) => `New functionality is available in ${ctx.entities[0] ?? ctx.sourceName}. May enable simpler implementations or replace external dependencies.`,
    who: (ctx) => `Teams already using ${ctx.entities[0] ?? "this product"} or evaluating it.`,
  },
  CostChange: {
    why: (ctx) => `Pricing for ${ctx.entities[0] ?? ctx.sourceName} has changed. Review your current usage and budget impact.`,
    who: (ctx) => `Teams with ${ctx.entities[0] ?? ctx.sourceName} in their production stack.`,
  },
  PerformanceImprovement: {
    why: (ctx) => `${ctx.entities[0] ?? ctx.sourceName} shipped measurable performance improvements. Upgrading may reduce latency or infrastructure costs.`,
    who: (ctx) => `Engineers running ${ctx.entities[0] ?? "this tool"} at scale.`,
  },
  DeveloperExperience: {
    why: (ctx) => `Developer experience improvements in ${ctx.entities[0] ?? ctx.sourceName} reduce friction in everyday workflows.`,
    who: (ctx) => `Developers using ${ctx.entities[0] ?? "this tool"} daily.`,
  },
  Deprecation: {
    why: (ctx) => `A feature or API in ${ctx.entities[0] ?? ctx.sourceName} is being deprecated. Plan migration before it is removed.`,
    who: (ctx) => `Teams relying on the deprecated feature in ${ctx.entities[0] ?? "this project"}.`,
  },
  Silent: {
    why: (ctx) => `${ctx.entities[0] ?? ctx.sourceName} released an update. Review the changelog for relevant changes.`,
    who: (ctx) => `Teams using ${ctx.entities[0] ?? "this project"}.`,
  },
};

export function generateWhyItMatters(impactLabel: ImpactLabel, ctx: SignalContext): string {
  return TEMPLATES[impactLabel].why(ctx);
}

export function generateWhoShouldCare(impactLabel: ImpactLabel, ctx: SignalContext): string {
  return TEMPLATES[impactLabel].who(ctx);
}
