/**
 * G-wealth Republic — Data Store
 * Central data layer managing properties, leads, customers, appointments, and content.
 * Demo mode: persists changes to localStorage.
 */

import { properties as seedProperties } from "./data/properties";
import { leads as seedLeads } from "./data/leads";
import { customers as seedCustomers } from "./data/customers";
import { appointments, appointmentRequests as seedRequests } from "./data/appointments";
import { users as seedUsers } from "./data/users";
import { siteContent } from "./data/content";
import { slugify, sleep } from "./utils";

const STORAGE_KEY = "gwealth-demo-data";
const SIMULATED_LATENCY = 200;

let store = {
  properties: [...seedProperties],
  leads: [...seedLeads],
  customers: [...seedCustomers],
  appointments: [...appointments],
  appointmentRequests: [...seedRequests],
  users: [...seedUsers],
  content: { ...siteContent },
  favourites: [],
  compareList: [],
};

if (typeof window !== "undefined") {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      store.favourites = parsed.favourites || [];
      store.compareList = parsed.compareList || [];
      if (parsed.properties) store.properties = parsed.properties;
      if (parsed.leads) store.leads = parsed.leads;
      if (parsed.customers) store.customers = parsed.customers;
    } catch (e) { /* ignore */ }
  }
}

function save() {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      favourites: store.favourites,
      compareList: store.compareList,
      properties: store.properties,
      leads: store.leads,
      customers: store.customers,
    }));
  }
}

export async function getProperties(filters = {}, pagination = {}) {
  await sleep(SIMULATED_LATENCY);
  let result = [...store.properties];
  if (filters.publishedOnly !== false) result = result.filter((p) => p.status === "published");
  if (filters.city) result = result.filter((p) => p.city.toLowerCase() === filters.city.toLowerCase());
  if (filters.neighborhood) result = result.filter((p) => p.neighborhood.toLowerCase() === filters.neighborhood.toLowerCase());
  if (filters.propertyType) { const types = Array.isArray(filters.propertyType) ? filters.propertyType : [filters.propertyType]; result = result.filter((p) => types.includes(p.propertyType)); }
  if (filters.minPrice) result = result.filter((p) => p.price >= Number(filters.minPrice));
  if (filters.maxPrice) result = result.filter((p) => p.price <= Number(filters.maxPrice));
  if (filters.minSize) result = result.filter((p) => p.size >= Number(filters.minSize));
  if (filters.maxSize) result = result.filter((p) => p.size <= Number(filters.maxSize));
  if (filters.availability) { const statuses = Array.isArray(filters.availability) ? filters.availability : [filters.availability]; result = result.filter((p) => statuses.includes(p.availabilityStatus)); }
  if (filters.titleDocument) { const docs = Array.isArray(filters.titleDocument) ? filters.titleDocument : [filters.titleDocument]; result = result.filter((p) => docs.includes(p.titleDocument)); }
  if (filters.paymentPlan === true) result = result.filter((p) => p.paymentPlan);
  if (filters.featured === true) result = result.filter((p) => p.featured);
  if (filters.search) { const q = filters.search.toLowerCase(); result = result.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.city.toLowerCase().includes(q)); }
  const sortBy = filters.sortBy || "createdAt";
  const sortOrder = filters.sortOrder || "desc";
  result.sort((a, b) => {
    if (sortBy === "price") { const d = a.price - b.price; return sortOrder === "asc" ? d : -d; }
    if (sortBy === "size") { const d = a.size - b.size; return sortOrder === "asc" ? d : -d; }
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  if (pagination.page && pagination.limit) {
    const start = (pagination.page - 1) * pagination.limit;
    return { data: result.slice(start, start + pagination.limit), total: result.length, page: pagination.page, limit: pagination.limit, totalPages: Math.ceil(result.length / pagination.limit) };
  }
  return { data: result, total: result.length };
}

export async function getPropertyBySlug(slug) {
  await sleep(SIMULATED_LATENCY);
  return store.properties.find((p) => p.slug === slug) || null;
}

export function getAllProperties() {
  return store.properties;
}

export async function getPropertyById(id) {
  await sleep(SIMULATED_LATENCY);
  return store.properties.find((p) => p.id === id) || null;
}

export async function searchProperties(q) {
  await sleep(SIMULATED_LATENCY);
  if (!q) return store.properties.filter((p) => p.status === "published");
  const query = q.toLowerCase();
  return store.properties.filter((p) => p.status === "published" && (p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)));
}

// ===== FAVOURITES =====
export function getFavourites() { return store.favourites; }
export function toggleFavourite(propertyId) {
  const idx = store.favourites.indexOf(propertyId);
  if (idx === -1) store.favourites.push(propertyId); else store.favourites.splice(idx, 1);
  save();
  return store.favourites;
}
export function isFavourite(propertyId) { return store.favourites.includes(propertyId); }

// ===== COMPARISON =====
export function getCompareList() { return store.compareList; }
export function toggleCompare(propertyId) {
  const idx = store.compareList.indexOf(propertyId);
  if (idx === -1) { if (store.compareList.length < 3) store.compareList.push(propertyId); } else { store.compareList.splice(idx, 1); }
  save();
  return store.compareList;
}
export function isComparing(propertyId) { return store.compareList.includes(propertyId); }
export function clearCompareList() { store.compareList = []; save(); return store.compareList; }

// ===== APPOINTMENT REQUESTS =====
export async function submitAppointmentRequest(data) {
  await sleep(SIMULATED_LATENCY);
  const request = { id: `req_${Date.now().toString(36)}`, ...data, status: "pending", createdAt: new Date().toISOString(), demoLabel: true };
  store.appointmentRequests.push(request);
  store.leads.unshift({ id: `lead_req_${Date.now().toString(36)}`, fullName: data.fullName, email: data.email, phone: data.phone, source: "website", sourceLabel: "Website", propertyId: data.propertyId, assignedAgentId: null, stage: "new", stageLabel: "New", priority: "medium", priorityLabel: "Medium", createdAt: request.createdAt, updatedAt: request.createdAt, notes: [{ id: "n_1", content: "Appointment request submitted.", date: request.createdAt, author: "system" }], demoLabel: true });
  save();
  return request;
}

// ===== CONTACT FORM =====
export async function submitContactForm(data) {
  await sleep(SIMULATED_LATENCY);
  const lead = { id: `lead_contact_${Date.now().toString(36)}`, fullName: data.fullName, email: data.email, phone: data.phone, source: "website", sourceLabel: "Website", propertyId: data.propertyId || null, assignedAgentId: null, stage: "new", stageLabel: "New", priority: "medium", priorityLabel: "Medium", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: [{ id: "n_1", content: `Enquiry: ${data.subject}`, date: new Date().toISOString(), author: "system" }], demoLabel: true };
  store.leads.unshift(lead);
  save();
  return lead;
}

// ===== ADMIN AUTH =====
export async function authenticateAdmin(email, password) {
  await sleep(SIMULATED_LATENCY);
  const user = store.users.find((u) => u.email === email && u.active);
  if (!user) return { success: false, error: "Invalid email or password" };
  if (user.passwordHash !== password) return { success: false, error: "Invalid email or password" };
  return { success: true, user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role, avatar: user.avatar } };
}

export function getAllUsers() {
  return store.users.map((u) => ({ id: u.id, email: u.email, fullName: u.fullName, role: u.role, active: u.active, avatar: u.avatar, createdAt: u.createdAt }));
}

// ===== ADMIN CRUD =====
export function getAllLeads() { return store.leads; }
export function getLeadById(id) { return store.leads.find((l) => l.id === id) || null; }
export function updateLead(id, data) {
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx === -1) throw new Error("Lead not found");
  store.leads[idx] = { ...store.leads[idx], ...data, updatedAt: new Date().toISOString() };
  save();
  return store.leads[idx];
}
export function getAllCustomers() { return store.customers; }
export function getCustomerById(id) { return store.customers.find((c) => c.id === id) || null; }
export function getAllAppointments() { return store.appointments; }
export function getAllAppointmentRequests() { return store.appointmentRequests; }
export function updateAppointment(id, data) {
  const idx = store.appointments.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error("Appointment not found");
  store.appointments[idx] = { ...store.appointments[idx], ...data, updatedAt: new Date().toISOString() };
  save();
  return store.appointments[idx];
}
export function createAppointment(data) {
  const appt = { id: `apt_${Date.now()}`, ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  store.appointments.push(appt);
  save();
  return appt;
}

// ===== CRISIS RESET =====
export function resetDemoData() {
  store.properties = [...seedProperties];
  store.leads = [...seedLeads];
  store.customers = [...seedCustomers];
  store.appointments = [...appointments];
  store.appointmentRequests = [...seedRequests];
  store.favourites = [];
  store.compareList = [];
  save();
  return { success: true, message: "Demo data reset." };
}


