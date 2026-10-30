/**
 * G-wealth Republic — Application Constants
 * Demo mode: all data is seeded placeholder content.
 */

export const BRAND = {
  name: "G-wealth Republic",
  tagline: "Premium Nigerian Real Estate",
  logo: "G-wealth",
  primaryColor: "#1e3a8a",
  accentColor: "#3b82f6",
  whiteColor: "#ffffff",
};

export const CURRENCY = {
  code: "NGN",
  symbol: "₦",
  locale: "en-NG",
};

export const PROPERTY_TYPES = {
  RESIDENTIAL_LAND: "residential-land",
  COMMERCIAL_LAND: "commercial-land",
  HOUSE: "house",
  APARTMENT: "apartment",
};

export const TITLE_DOCUMENTS = {
  C_OF_O: "Certificate of Occupancy",
  GOVERNORS_CONSENT: "Governor's Consent",
  DEED_OF_PLEAD: "Deed of Peppad",
  RUMMAGE: "Survey/Caveat",
  OTHER: "Other",
};

export const AVAILABILITY_STATUS = {
  AVAILABLE: "available",
  RESERVED: "reserved",
  SOLD: "sold",
};

export const LEAD_STAGES = {
  NEW: "new",
  CONTACTED: "contacted",
  INSPECTION_BOOKED: "inspection-booked",
  NEGOTIATING: "negotiating",
  CLOSED_WON: "closed-won",
  CLOSED_LOST: "closed-lost",
};

export const LEAD_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const LEAD_SOURCES = {
  WEBSITE: "website",
  SOCIAL_MEDIA: "social-media",
  REFERRAL: "referral",
  WALK_IN: "walk-in",
  ADVERTISEMENT: "advertisement",
  WHATSAPP: "whatsapp",
};

export const APPOINTMENT_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  RESCHEDULE_REQUESTED: "reschedule-requested",
  RESCHEDULED: "rescheduled",
  DECLINED: "declined",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

export const USER_ROLES = {
  SUPER_ADMIN: "super-admin",
  MANAGER: "manager",
  SALES_AGENT: "sales-agent",
  CONTENT_EDITOR: "content-editor",
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.SUPER_ADMIN]: "Super Admin",
  [USER_ROLES.MANAGER]: "Manager",
  [USER_ROLES.SALES_AGENT]: "Sales Agent",
  [USER_ROLES.CONTENT_EDITOR]: "Content Editor",
};

export const PROPERTY_TYPE_LABELS = {
  [PROPERTY_TYPES.RESIDENTIAL_LAND]: "Residential Land",
  [PROPERTY_TYPES.COMMERCIAL_LAND]: "Commercial Land",
  [PROPERTY_TYPES.HOUSE]: "House",
  [PROPERTY_TYPES.APARTMENT]: "Apartment",
};

export const CITIES = ["Lagos", "Abuja", "Port Harcourt", "Asaba"];

export const NEIGHBORHOODS = {
  Lagos: ["Ibeju-Lekki", "Epe", "Lekki", "Victoria Island", "Ikoyi", "Ajao Estate"],
  Abuja: ["Maitama", "Wuse", "Wuye", "Asokoro", "Lugbe", "Katrin"],
  "Port Harcourt": ["Port Harcourt GRA", "Dopemu", "Obi Ngwa", "Rumuodumaya", "Eleme"],
  Asaba: ["Asaba GRA", "Kwaya Kwu", "Umuagbook", "Ibrahim Tayo", "Obosi"],
};

export const DEMO_LOGIN = {
  email: "admin@gwealth.com",
  password: "admin123",
};

export const DEMO_DATA_LABEL = "DEMO DATA";

export const SESSION_TIMEOUT_MINUTES = 30;

export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  ADMIN_ITEMS_PER_PAGE: 20,
};
