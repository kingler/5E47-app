import type {
  AccessEvent,
  AcquisitionChannel,
  Booking,
  Campaign,
  HouseCensus,
  MasterclassEvent,
  Organization,
  Payment,
  Project,
  ProgramTopic,
  Residency,
  Studio,
  User,
} from "./types";

// Seed dataset that powers the demo platform. Mirrors the production
// schema 1:1 so swapping to Supabase is a drop-in replacement.

export const organizations: Organization[] = [
  { id: "org_5e47", name: "5E47 Holdings", kind: "internal" },
  { id: "org_sony", name: "Sony Music X", kind: "sponsor" },
  { id: "org_nike", name: "Nike Studio Lab", kind: "sponsor" },
  { id: "org_a24", name: "A24 Residency", kind: "label" },
];

export const users: User[] = [
  {
    id: "u_creator_1",
    name: "Maya Okafor",
    email: "maya@5e47.app",
    role: "creator",
    joinedAt: "2026-01-12T10:00:00Z",
  },
  {
    id: "u_creator_2",
    name: "Devon Park",
    email: "devon@5e47.app",
    role: "creator",
    joinedAt: "2026-02-04T10:00:00Z",
  },
  {
    id: "u_creator_3",
    name: "Soraya Lin",
    email: "soraya@5e47.app",
    role: "creator",
    joinedAt: "2026-03-21T10:00:00Z",
  },
  {
    id: "u_operator_1",
    name: "Jules Reyes",
    email: "jules@5e47.app",
    role: "operator",
    joinedAt: "2025-09-01T10:00:00Z",
  },
  {
    id: "u_sponsor_1",
    name: "Priya Mehta",
    email: "priya@sony.example",
    role: "sponsor",
    organizationId: "org_sony",
    joinedAt: "2025-11-02T10:00:00Z",
  },
  {
    id: "u_investor_1",
    name: "Henry Wallace",
    email: "henry@northstar.example",
    role: "investor",
    joinedAt: "2025-10-15T10:00:00Z",
  },
];

export const userById = (id: string) => users.find((u) => u.id === id);
export const userByRole = (role: User["role"]) => users.find((u) => u.role === role);

export const studios: Studio[] = [
  {
    id: "stu_audio_a",
    name: "Audio A · Neve Console",
    kind: "audio",
    floor: 7,
    capacity: 6,
    hourlyRate: 180,
    equipment: ["Neve 8424", "Pro Tools HDX", "Genelec 1238A"],
  },
  {
    id: "stu_audio_b",
    name: "Audio B · Vocal Booth",
    kind: "audio",
    floor: 7,
    capacity: 3,
    hourlyRate: 95,
    equipment: ["U87", "SSL Bus+", "Adam A7X"],
  },
  {
    id: "stu_video_1",
    name: "Stage 1 · Volume LED",
    kind: "stage",
    floor: 6,
    capacity: 30,
    hourlyRate: 850,
    equipment: ["LED Volume", "Disguise", "ARRI Alexa 35"],
  },
  {
    id: "stu_podcast_1",
    name: "Podcast Studio · Bronze",
    kind: "podcast",
    floor: 7,
    capacity: 4,
    hourlyRate: 75,
    equipment: ["Shure SM7B x4", "RodeCaster Duo"],
  },
  {
    id: "stu_edit_1",
    name: "Edit Bay · Lumen",
    kind: "edit",
    floor: 6,
    capacity: 2,
    hourlyRate: 55,
    equipment: ["DaVinci Advanced", "Pro Display XDR"],
  },
  {
    id: "stu_photo_1",
    name: "Cyclorama · North",
    kind: "photo",
    floor: 6,
    capacity: 12,
    hourlyRate: 140,
    equipment: ["Profoto Pro-11", "Phase One IQ4"],
  },
];

export const residencies: Residency[] = [
  {
    id: "res_1",
    creatorId: "u_creator_1",
    status: "active",
    tier: "anchor",
    floor: 7,
    startsAt: "2026-02-01T00:00:00Z",
    endsAt: "2026-08-01T00:00:00Z",
    monthlyFee: 2400,
  },
  {
    id: "res_2",
    creatorId: "u_creator_2",
    status: "active",
    tier: "resident",
    floor: 6,
    startsAt: "2026-03-01T00:00:00Z",
    endsAt: "2026-09-01T00:00:00Z",
    monthlyFee: 1400,
  },
  {
    id: "res_3",
    creatorId: "u_creator_3",
    status: "in_review",
    tier: "explorer",
    floor: 5,
    monthlyFee: 800,
  },
];

const now = Date.now();
const hour = 60 * 60 * 1000;
const iso = (offset: number) => new Date(now + offset).toISOString();

export const bookings: Booking[] = [
  {
    id: "bk_1",
    studioId: "stu_audio_a",
    creatorId: "u_creator_1",
    startsAt: iso(2 * hour),
    endsAt: iso(6 * hour),
    status: "confirmed",
    cost: 720,
    notes: "Mixing session for sponsor cut.",
  },
  {
    id: "bk_2",
    studioId: "stu_video_1",
    creatorId: "u_creator_2",
    startsAt: iso(28 * hour),
    endsAt: iso(36 * hour),
    status: "confirmed",
    cost: 6800,
  },
  {
    id: "bk_3",
    studioId: "stu_podcast_1",
    creatorId: "u_creator_1",
    startsAt: iso(-26 * hour),
    endsAt: iso(-24 * hour),
    status: "completed",
    cost: 150,
  },
  {
    id: "bk_4",
    studioId: "stu_edit_1",
    creatorId: "u_creator_3",
    startsAt: iso(50 * hour),
    endsAt: iso(54 * hour),
    status: "pending",
    cost: 220,
  },
];

export const payments: Payment[] = [
  {
    id: "pay_1",
    userId: "u_creator_1",
    amount: 2400,
    currency: "USD",
    kind: "residency_fee",
    status: "succeeded",
    createdAt: iso(-72 * hour),
    description: "May residency · Anchor tier",
  },
  {
    id: "pay_2",
    userId: "u_creator_1",
    amount: 720,
    currency: "USD",
    kind: "studio_booking",
    status: "pending",
    createdAt: iso(-2 * hour),
    description: "Audio A · 4h",
  },
  {
    id: "pay_3",
    userId: "u_creator_2",
    amount: 1400,
    currency: "USD",
    kind: "residency_fee",
    status: "succeeded",
    createdAt: iso(-60 * hour),
    description: "May residency · Resident tier",
  },
  {
    id: "pay_4",
    userId: "u_sponsor_1",
    amount: 75000,
    currency: "USD",
    kind: "sponsorship",
    status: "succeeded",
    createdAt: iso(-200 * hour),
    description: "Sony Music X · Spring activation",
  },
];

export const accessEvents: AccessEvent[] = [
  {
    id: "ax_1",
    userId: "u_creator_1",
    doorId: "door_main",
    doorName: "Main Entry",
    floor: 4,
    outcome: "granted",
    at: iso(-1 * hour),
    credential: "mobile",
  },
  {
    id: "ax_2",
    userId: "u_creator_1",
    doorId: "door_studio_a",
    doorName: "Audio A",
    floor: 7,
    outcome: "granted",
    at: iso(-0.5 * hour),
    credential: "mobile",
  },
  {
    id: "ax_3",
    userId: "u_creator_3",
    doorId: "door_edit",
    doorName: "Edit Bay",
    floor: 6,
    outcome: "denied",
    at: iso(-0.2 * hour),
    credential: "mobile",
  },
  {
    id: "ax_4",
    userId: "u_sponsor_1",
    doorId: "door_stage",
    doorName: "Stage 1",
    floor: 6,
    outcome: "escorted",
    at: iso(-3 * hour),
    credential: "qr",
  },
];

export const campaigns: Campaign[] = [
  {
    id: "cmp_1",
    sponsorOrgId: "org_sony",
    name: "Spring Slate · Emerging Voices",
    status: "active",
    budget: 250000,
    spent: 142500,
    impressions: 1840000,
    creatorReach: 14,
    assets: 38,
    startsAt: "2026-03-01T00:00:00Z",
    endsAt: "2026-06-01T00:00:00Z",
  },
  {
    id: "cmp_2",
    sponsorOrgId: "org_nike",
    name: "Studio Lab · Movement",
    status: "active",
    budget: 180000,
    spent: 64200,
    impressions: 920000,
    creatorReach: 9,
    assets: 17,
    startsAt: "2026-04-01T00:00:00Z",
    endsAt: "2026-07-01T00:00:00Z",
  },
  {
    id: "cmp_3",
    sponsorOrgId: "org_a24",
    name: "Floor 5 Residency",
    status: "wrap",
    budget: 95000,
    spent: 91200,
    impressions: 612000,
    creatorReach: 6,
    assets: 11,
    startsAt: "2026-01-15T00:00:00Z",
    endsAt: "2026-04-30T00:00:00Z",
  },
];

export const projects: Project[] = [
  {
    id: "prj_1",
    creatorId: "u_creator_1",
    title: "Night Mode (EP)",
    status: "in_production",
    collaborators: ["u_creator_2"],
    greenlit: true,
    sponsorId: "org_sony",
    updatedAt: iso(-3 * hour),
  },
  {
    id: "prj_2",
    creatorId: "u_creator_2",
    title: "Volume Stage Short",
    status: "review",
    collaborators: ["u_creator_3"],
    greenlit: true,
    updatedAt: iso(-12 * hour),
  },
  {
    id: "prj_3",
    creatorId: "u_creator_3",
    title: "Untitled Doc",
    status: "concept",
    collaborators: [],
    greenlit: false,
    updatedAt: iso(-30 * hour),
  },
];

// Time-series helpers for charts (mock analytics).
export function utilizationSeries() {
  return [62, 68, 71, 74, 78, 82, 79, 85, 88, 84, 90, 92];
}

export function arrSeries() {
  return [1.2, 1.4, 1.6, 1.9, 2.3, 2.6, 3.0, 3.3, 3.7, 4.1, 4.5, 4.9];
}

export function bookingsByDay() {
  return [12, 18, 22, 17, 26, 30, 24];
}

// Membership roll behind the ~210-member narrative. The seeded users above
// are demo personas; this census is the operating roll the scarcity engine
// reasons over. Caps are a business input; active/waitlist/applications are
// the live signals the Marketing & Predictive agent consumes.
export const houseCensus: HouseCensus[] = [
  {
    house: "music",
    label: "Music",
    cap: 64,
    active: 58,
    waitlist: 34,
    applications: [18, 22, 20, 26, 29, 34],
  },
  {
    house: "video",
    label: "Video Production",
    cap: 50,
    active: 45,
    waitlist: 26,
    applications: [12, 14, 15, 17, 19, 21],
  },
  {
    house: "masterclass",
    label: "Masterclass",
    cap: 54,
    active: 46,
    waitlist: 19,
    applications: [9, 11, 10, 13, 12, 15],
  },
  {
    house: "founders",
    label: "Founders",
    cap: 67,
    active: 61,
    waitlist: 29,
    applications: [14, 16, 19, 18, 23, 25],
  },
];

export const PROGRAM_TOPIC_LABEL: Record<ProgramTopic, string> = {
  content: "Content Creation",
  music: "Music",
  video: "Video",
  marketing: "Marketing & Branding",
  operations: "Business Operations",
  creativity: "Creativity",
};

const day = 24 * hour;

// Masterclasses & special events the Curator agent programs across the six
// pillars and the Growth agent promotes to members and prospects.
export const masterclasses: MasterclassEvent[] = [
  {
    id: "mc_1",
    title: "Mixing the Verse",
    topic: "music",
    host: "a Grammy-nominated engineer",
    house: "music",
    startsAt: iso(3 * day),
    capacity: 14,
    rsvps: 11,
    promoted: true,
    channels: ["Instagram", "A Small World"],
  },
  {
    id: "mc_2",
    title: "Directing on the Volume",
    topic: "video",
    host: "a feature DP",
    house: "video",
    startsAt: iso(6 * day),
    capacity: 18,
    rsvps: 9,
    promoted: true,
    channels: ["Instagram", "YouTube"],
  },
  {
    id: "mc_3",
    title: "Brand as Story",
    topic: "marketing",
    host: "a creative director from Nike Studio Lab",
    startsAt: iso(9 * day),
    capacity: 24,
    rsvps: 16,
    promoted: true,
    channels: ["LinkedIn", "Quintessentially"],
  },
  {
    id: "mc_4",
    title: "The Quiet Founder — Scaling Without Noise",
    topic: "operations",
    host: "a mid-raise founder",
    house: "founders",
    startsAt: iso(12 * day),
    capacity: 20,
    rsvps: 13,
    promoted: false,
    channels: [],
  },
  {
    id: "mc_5",
    title: "The Shape of an Idea",
    topic: "creativity",
    host: "a multidisciplinary artist",
    startsAt: iso(15 * day),
    capacity: 16,
    rsvps: 7,
    promoted: false,
    channels: [],
  },
  {
    id: "mc_6",
    title: "Owning the Frame — Short-Form Content",
    topic: "content",
    host: "a creator with 2M followers",
    startsAt: iso(18 * day),
    capacity: 22,
    rsvps: 5,
    promoted: false,
    channels: [],
  },
];

export const acquisitionChannels: AcquisitionChannel[] = [
  { id: "ch_ig", name: "Instagram", kind: "social", audience: "Editorial brand reach", reach: 480_000, waitlistContribution: 38 },
  { id: "ch_tt", name: "TikTok", kind: "social", audience: "Creator culture", reach: 220_000, waitlistContribution: 19 },
  { id: "ch_yt", name: "YouTube", kind: "social", audience: "Long-form films & sessions", reach: 95_000, waitlistContribution: 11 },
  { id: "ch_li", name: "LinkedIn", kind: "social", audience: "Founders & operators", reach: 60_000, waitlistContribution: 14 },
  { id: "ch_asw", name: "A Small World", kind: "luxury", audience: "Private global members' network", reach: 12_000, waitlistContribution: 22 },
  { id: "ch_quin", name: "Quintessentially", kind: "luxury", audience: "Luxury concierge clientele", reach: 8_000, waitlistContribution: 17 },
  { id: "ch_amex", name: "Amex Centurion", kind: "luxury", audience: "Invitation-only cardholders", reach: 15_000, waitlistContribution: 9 },
  { id: "ch_sothebys", name: "Sotheby's network", kind: "luxury", audience: "Collectors & patrons", reach: 6_000, waitlistContribution: 6 },
];
