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
  | "campaign.launched"
  | "agent.message"
  | "agent.delegated"
  | "agent.action"
  | "scarcity.recomputed"
  | "programming.created"
  | "programming.promoted"
  | "growth.campaign";

export interface KpiSnapshot {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
}

// ── Multi-agent system · membership census ──────────────────────────────
// The four Houses are the unit of scarcity. Each has a hard cap; the
// predictive layer reads active/waitlist counts and recent application
// history off this census to keep occupancy inside the brand's target band.

export type HouseId = "music" | "video" | "masterclass" | "founders";

// Programming pillars 5E47 curates masterclasses and special events around.
export type ProgramTopic =
  | "content"
  | "music"
  | "video"
  | "marketing"
  | "operations"
  | "creativity";

export interface MasterclassEvent {
  id: string;
  title: string;
  topic: ProgramTopic;
  host: string;
  house?: HouseId;
  startsAt: string;
  capacity: number;
  rsvps: number;
  /** Whether the Growth agent has promoted it externally. */
  promoted: boolean;
  /** Channels it has been promoted on. */
  channels: string[];
}

// Acquisition channels the Growth agent uses to attract members — brand-led
// social reach plus exclusive luxury networks that feed the curated waitlist.
export interface AcquisitionChannel {
  id: string;
  name: string;
  kind: "social" | "luxury";
  audience: string;
  reach: number;
  /** Applications attributed to this channel last cycle. */
  waitlistContribution: number;
}

export interface HouseCensus {
  house: HouseId;
  label: string;
  /** Hard membership cap — never exceeded. */
  cap: number;
  /** Currently active members in this House. */
  active: number;
  /** Applicants in committee review / on the waitlist. */
  waitlist: number;
  /** Applications received over the last 6 admissions cycles (oldest→newest). */
  applications: number[];
}
