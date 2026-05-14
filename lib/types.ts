// 5E47 — Core domain types shared across the experience, application,
// operations, and analytics layers of the platform.

export type Role =
  | "super_admin"
  | "operator"
  | "creator"
  | "sponsor"
  | "investor"
  | "vip_guest"
  | "vendor";

export type RoleScope = "creator" | "operator" | "sponsor" | "investor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId?: string;
  avatar?: string;
  joinedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  kind: "sponsor" | "studio" | "label" | "agency" | "internal";
}

export type ResidencyStatus =
  | "applied"
  | "in_review"
  | "approved"
  | "active"
  | "alumni"
  | "rejected";

export interface Residency {
  id: string;
  creatorId: string;
  status: ResidencyStatus;
  tier: "explorer" | "resident" | "anchor";
  floor: number;
  startsAt?: string;
  endsAt?: string;
  monthlyFee: number;
}

export type StudioKind =
  | "audio"
  | "video"
  | "podcast"
  | "photo"
  | "edit"
  | "stage"
  | "vr";

export interface Studio {
  id: string;
  name: string;
  kind: StudioKind;
  floor: number;
  capacity: number;
  hourlyRate: number;
  equipment: string[];
}

export type BookingStatus = "pending" | "confirmed" | "in_use" | "completed" | "cancelled";

export interface Booking {
  id: string;
  studioId: string;
  creatorId: string;
  startsAt: string;
  endsAt: string;
  status: BookingStatus;
  cost: number;
  notes?: string;
}

export type PaymentStatus = "succeeded" | "pending" | "failed" | "refunded";
export type PaymentKind =
  | "residency_fee"
  | "studio_booking"
  | "equipment_rental"
  | "sponsorship"
  | "activation"
  | "hospitality";

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: "USD";
  kind: PaymentKind;
  status: PaymentStatus;
  createdAt: string;
  description: string;
  stripeIntentId?: string;
}

export type AccessOutcome = "granted" | "denied" | "escorted";

export interface AccessEvent {
  id: string;
  userId: string;
  doorId: string;
  doorName: string;
  floor: number;
  outcome: AccessOutcome;
  at: string;
  credential: "mobile" | "qr" | "card" | "biometric";
}

export interface Campaign {
  id: string;
  sponsorOrgId: string;
  name: string;
  status: "draft" | "active" | "wrap" | "completed";
  budget: number;
  spent: number;
  impressions: number;
  creatorReach: number;
  assets: number;
  startsAt: string;
  endsAt: string;
}

export interface Project {
  id: string;
  creatorId: string;
  title: string;
  status: "concept" | "in_production" | "review" | "shipped";
  collaborators: string[];
  greenlit: boolean;
  sponsorId?: string;
  updatedAt: string;
}

export interface DomainEvent<T = unknown> {
  id: string;
  type: EventName;
  at: string;
  actorId?: string;
  payload: T;
}

export type EventName =
  | "creator.applied"
  | "creator.approved"
  | "booking.created"
  | "booking.cancelled"
  | "payment.completed"
  | "payment.failed"
  | "studio.accessed"
  | "project.greenlit"
  | "sponsor.asset.generated"
  | "invoice.overdue"
  | "campaign.launched";

export interface KpiSnapshot {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
}
