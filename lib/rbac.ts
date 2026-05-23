import type { Role, RoleScope } from "./types";

// Capability strings drive UI affordances and API guards across the platform.
export type Capability =
  | "residency.apply"
  | "residency.review"
  | "residency.approve"
  | "studio.book"
  | "studio.manage"
  | "payment.pay"
  | "payment.refund"
  | "access.use"
  | "access.administer"
  | "campaign.create"
  | "campaign.report"
  | "creator.discover"
  | "investor.report"
  | "operations.oversight"
  | "billing.oversight"
  | "moderation.act"
  | "agent.converse"
  | "agent.oversee";

const ROLE_CAPABILITIES: Record<Role, Capability[]> = {
  super_admin: [
    "residency.apply",
    "residency.review",
    "residency.approve",
    "studio.book",
    "studio.manage",
    "payment.pay",
    "payment.refund",
    "access.use",
    "access.administer",
    "campaign.create",
    "campaign.report",
    "creator.discover",
    "investor.report",
    "operations.oversight",
    "billing.oversight",
    "moderation.act",
    "agent.converse",
    "agent.oversee",
  ],
  operator: [
    "residency.review",
    "residency.approve",
    "studio.manage",
    "payment.refund",
    "access.administer",
    "operations.oversight",
    "billing.oversight",
    "moderation.act",
    "creator.discover",
    "agent.converse",
    "agent.oversee",
  ],
  creator: [
    "residency.apply",
    "studio.book",
    "payment.pay",
    "access.use",
    "agent.converse",
  ],
  sponsor: [
    "campaign.create",
    "campaign.report",
    "creator.discover",
    "payment.pay",
    "agent.converse",
  ],
  investor: ["investor.report", "agent.converse"],
  vip_guest: ["access.use", "agent.converse"],
  vendor: ["access.use"],
};

export function can(role: Role | undefined, capability: Capability): boolean {
  if (!role) return false;
  return ROLE_CAPABILITIES[role].includes(capability);
}

export function homeForRole(role: Role): `/${RoleScope}` | "/" {
  switch (role) {
    case "creator":
      return "/creator";
    case "operator":
    case "super_admin":
      return "/operator";
    case "sponsor":
      return "/sponsor";
    case "investor":
      return "/investor";
    default:
      return "/";
  }
}

export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  operator: "Building Operator",
  creator: "Creator",
  sponsor: "Sponsor",
  investor: "Investor",
  vip_guest: "VIP Guest",
  vendor: "Vendor",
};
