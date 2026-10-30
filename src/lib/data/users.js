/**
 * G-wealth Republic — Seed Staff/User Data
 */

export const users = [
  {
    id: "user_001",
    email: "admin@gwealth.com",
    passwordHash: "admin123", // DEMO ONLY - never store real passwords in plain text
    fullName: "Ademola Sholabi",
    role: "super-admin",
    active: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AS",
    lastLogin: "2025-10-29T14:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
    permissions: ["manage_settings", "manage_staff", "manage_listings", "manage_leads", "manage_customers", "manage_payments", "manage_content", "view_reports", "manage_appointments", "manage_audit"],
  },
  {
    id: "user_002",
    email: "manager@gwealth.demo",
    passwordHash: "manager123", // DEMO ONLY
    fullName: "Sarah Okolo",
    role: "manager",
    active: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SO",
    lastLogin: "2025-10-29T10:15:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    permissions: ["manage_listings", "manage_leads", "manage_customers", "view_reports", "manage_appointments"],
  },
  {
    id: "user_003",
    email: "agent@gwealth.demo",
    passwordHash: "agent12345", // DEMO ONLY
    fullName: "David Mensah",
    role: "sales-agent",
    active: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=DM",
    lastLogin: "2025-10-29T08:45:00Z",
    createdAt: "2024-02-01T00:00:00Z",
    permissions: ["view_assigned_leads", "manage_assigned_inspections", "update_lead_stages", "add_notes"],
  },
  {
    id: "user_004",
    email: "editor@gwealth.demo",
    passwordHash: "editor123", // DEMO ONLY
    fullName: "Amaka Okafor",
    role: "content-editor",
    active: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AO",
    lastLogin: "2025-10-28T16:20:00Z",
    createdAt: "2024-03-10T00:00:00Z",
    permissions: ["manage_content", "edit_pages"],
  },
  {
    id: "user_005",
    email: "agent2@gwealth.demo",
    passwordHash: "agent2123", // DEMO ONLY
    fullName: "Samuel Okonkwo",
    role: "sales-agent",
    active: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SO2",
    lastLogin: "2025-10-29T11:00:00Z",
    createdAt: "2024-03-15T00:00:00Z",
    permissions: ["view_assigned_leads", "manage_assigned_inspections", "update_lead_stages", "add_notes"],
  },
  {
    id: "user_006",
    email: "manager2@gwealth.demo",
    passwordHash: "mgr2123", // DEMO ONLY
    fullName: "Jennifer Bello",
    role: "manager",
    active: true,
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=JB",
    lastLogin: "2025-10-28T19:30:00Z",
    createdAt: "2024-04-01T00:00:00Z",
    permissions: ["manage_listings", "manage_leads", "manage_customers", "view_reports", "manage_appointments"],
  },
];

export const loginCredentials = {
  "admin@gwealth.com": "admin123",
  "manager@gwealth.com": "manager123",
  "agent@gwealth.com": "agent123",
  "editor@gwealth.com": "editor123",
};
