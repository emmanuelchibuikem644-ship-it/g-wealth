/**
 * G-wealth Republic — Utility Functions
 */

import { CURRENCY, PROPERTY_TYPES, TITLE_DOCUMENTS, AVAILABILITY_STATUS, LEAD_STAGES, LEAD_PRIORITY, LEAD_SOURCES, APPOINTMENT_STATUS, USER_ROLES, PROPERTY_TYPE_LABELS, USER_ROLE_LABELS } from "./constants";

/**
 * Format a number as Nigerian Naira currency.
 */
export function formatCurrency(amount, showSymbol = true) {
  if (amount == null) return showSymbol ? "₦0" : "0";
  const symbol = showSymbol ? CURRENCY.symbol : "";
  const formatted = Math.round(amount).toLocaleString("en-NG");
  return `${symbol}${formatted}`;
}

/**
 * Format a large number with appropriate suffix (k, M).
 */
export function formatCompact(amount) {
  if (amount >= 1e9) return `₦${(amount / 1e9).toFixed(1)}B`;
  if (amount >= 1e6) return `₦${(amount / 1e6).toFixed(1)}M`;
  if (amount >= 1e3) return `₦${(amount / 1e3).toFixed(0)}K`;
  return formatCurrency(amount);
}

/**
 * Calculate monthly installment from price, deposit, and months.
 */
export function calculateMonthlyInstallment(price, deposit, months) {
  if (!price || !months || months <= 0) return 0;
  const remaining = price - deposit;
  if (remaining <= 0) return 0;
  return remaining / months;
}

/**
 * Calculate mortgage payment with interest using amortization formula.
 * M = P[r(1+r)^n] / [(1+r)^n - 1]
 */
export function calculateMortgagePayment(principal, annualRate, months) {
  if (!principal || !months || months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const x = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * x) / (x - 1);
}

export function calculateTotalInterest(principal, annualRate, months) {
  const monthly = calculateMortgagePayment(principal, annualRate, months);
  return monthly * months - principal;
}

export function slugify(str) {
  return str.toLowerCase().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export function generateId(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function truncate(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * ---- Label Helpers ----
 */

export function getPropertyTypeLabel(type) {
  return PROPERTY_TYPE_LABELS[type] || type;
}

export function getTitleDocumentLabel(doc) {
  return TITLE_DOCUMENTS[doc] || doc;
}

export function getAvailabilityLabel(status) {
  const labels = {
    [AVAILABILITY_STATUS.AVAILABLE]: "Available",
    [AVAILABILITY_STATUS.RESERVED]: "Reserved",
    [AVAILABILITY_STATUS.SOLD]: "Sold",
  };
  return labels[status] || status;
}

export function getAvailabilityColor(status) {
  const colors = {
    [AVAILABILITY_STATUS.AVAILABLE]: "success",
    [AVAILABILITY_STATUS.RESERVED]: "warning",
    [AVAILABILITY_STATUS.SOLD]: "error",
  };
  return colors[status] || "slate";
}

export function getLeadStageLabel(stage) {
  const labels = {
    [LEAD_STAGES.NEW]: "New",
    [LEAD_STAGES.CONTACTED]: "Contacted",
    [LEAD_STAGES.INSPECTION_BOOKED]: "Inspection Booked",
    [LEAD_STAGES.NEGOTIATING]: "Negotiating",
    [LEAD_STAGES.CLOSED_WON]: "Closed Won",
    [LEAD_STAGES.CLOSED_LOST]: "Closed Lost",
  };
  return labels[stage] || stage;
}

export function getLeadSourceLabel(source) {
  const labels = {
    [LEAD_SOURCES.WEBSITE]: "Website",
    [LEAD_SOURCES.SOCIAL_MEDIA]: "Social Media",
    [LEAD_SOURCES.REFERRAL]: "Referral",
    [LEAD_SOURCES.WALK_IN]: "Walk-in",
    [LEAD_SOURCES.ADVERTISEMENT]: "Advertisement",
    [LEAD_SOURCES.WHATSAPP]: "WhatsApp",
  };
  return labels[source] || source;
}

export function getPriorityLabel(priority) {
  const labels = {
    [LEAD_PRIORITY.LOW]: "Low",
    [LEAD_PRIORITY.MEDIUM]: "Medium",
    [LEAD_PRIORITY.HIGH]: "High",
  };
  return labels[priority] || priority;
}

export function getAppointmentStatusLabel(status) {
  const labels = {
    [APPOINTMENT_STATUS.PENDING]: "Pending Approval",
    [APPOINTMENT_STATUS.ACCEPTED]: "Confirmed",
    [APPOINTMENT_STATUS.RESCHEDULE_REQUESTED]: "Reschedule Requested",
    [APPOINTMENT_STATUS.RESCHEDULED]: "Rescheduled",
    [APPOINTMENT_STATUS.DECLINED]: "Declined",
    [APPOINTMENT_STATUS.CANCELLED]: "Cancelled",
    [APPOINTMENT_STATUS.COMPLETED]: "Completed",
  };
  return labels[status] || status;
}

export function getRoleLabel(role) {
  return USER_ROLE_LABELS[role] || role;
}

export function hasPermission(role, permission) {
  const permissions = {
    [USER_ROLES.SUPER_ADMIN]: ["manage_settings", "manage_staff", "manage_listings", "manage_leads", "manage_customers", "manage_payments", "manage_content", "view_reports", "manage_appointments", "manage_audit"],
    [USER_ROLES.MANAGER]: ["manage_listings", "manage_leads", "manage_customers", "view_reports", "manage_appointments"],
    [USER_ROLES.SALES_AGENT]: ["view_assigned_leads", "manage_assigned_inspections", "update_lead_stages", "add_notes"],
    [USER_ROLES.CONTENT_EDITOR]: ["manage_content", "edit_pages"],
  };
  return permissions[role]?.includes(permission) || false;
}

/**
 * ---- Date Helpers ----
 */

export function formatDate(date, options = {}) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const { dateStyle = "medium", timeStyle } = options;
  return new Intl.DateTimeFormat("en-NG", { dateStyle, timeStyle }).format(d);
}

export function formatDateTime(date) {
  return formatDate(date, { dateStyle: "medium", timeStyle: "short" });
}

export function formatDateShort(date) {
  return formatDate(date, { dateStyle: "short" });
}

export function timeAgo(date) {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffMins / 24);
  if (diffSecs < 60) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return formatDateShort(date);
}

