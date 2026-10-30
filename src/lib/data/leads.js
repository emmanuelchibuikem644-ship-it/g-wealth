/**
 * G-wealth Republic — Seed Leads Data (~40 leads)
 */

import { LEAD_STAGES, LEAD_SOURCES, LEAD_PRIORITY, PROPERTY_TYPES } from "../constants";

const firstNames = ["Adewale", "Sarah", "Michael", "Olumide", "Chinedu", "Amara", "David", "Ngozi", "Samuel", "Jennifer", "Chika", "Blessing", "Emeka", "Grace", "Kosi", "Fatima", "Tayo", "Mary", "Kunle", "Chioma", "Ibrahim", "Adeola", "Etop", "Ruth", "Obi", "Zainab", "Tope", "Esther", "Segun", "Bola", "Kelechi", "Joy", "Aisha", "Bello", "Uche", "Cynthia", "Femi", "Sandra", "Emeka", "Lydia"];
const lastNames = ["Johnson", "Okafor", "Adeyemi", "Mensah", "Okolo", "Eze", "Bello", "Sholabi", "Okonkwo", "Okafor", "Adeyemi", "Mensah", "Okolo", "Eze", "Bello", "Sholabi", "Okonkwo", "Aderibigbe", "Okon", "Uzochukwu", "Ahmed", "Adeyemi", "Mensah", "Okolo", "Eze"];

function makeName(i) {
  return `${firstNames[i % firstNames.length]} ${lastNames[Math.floor(i / firstNames.length) % lastNames.length]}`;
}

function makeEmail(i) {
  return `${firstNames[i % firstNames.length].toLowerCase()}.${lastNames[Math.floor(i / firstNames.length) % lastNames.length].toLowerCase()}@example.com`;
}

function makePhone(i) {
  const digits = (1234567 + i * 7890123).toString().slice(-8);
  return `+234 80${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
}

const leadStages = Object.values(LEAD_STAGES);
const leadSources = Object.values(LEAD_SOURCES);
const priorities = Object.values(LEAD_PRIORITY);
const propertyIds = ["prop_001", "prop_002", "prop_003", "prop_004", "prop_005", "prop_006", "prop_007", "prop_008", "prop_009", "prop_010", "prop_011", "prop_012"];
const agentIds = ["user_003", "user_005"];

const baseDate = new Date("2025-06-01T00:00:00Z");
function daysFromBase(days) {
  return new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

export const leads = [];
for (let i = 0; i < 40; i++) {
  const stage = leadStages[i % leadStages.length];
  const source = leadSources[i % leadSources.length];
  const priority = priorities[i % priorities.length];
  const propId = propertyIds[i % propertyIds.length];
  const agentId = agentIds[i % agentIds.length];
  const daysOffset = Math.floor(i * 6.5);

  const leadObj = {
    id: `lead_${String(i + 1).padStart(3, "0")}`,
    fullName: makeName(i),
    email: makeEmail(i),
    phone: makePhone(i),
    source,
    sourceLabel: {
      [LEAD_SOURCES.WEBSITE]: "Website",
      [LEAD_SOURCES.SOCIAL_MEDIA]: "Social Media",
      [LEAD_SOURCES.REFERRAL]: "Referral",
      [LEAD_SOURCES.WALK_IN]: "Walk-in",
      [LEAD_SOURCES.ADVERTISEMENT]: "Advertisement",
      [LEAD_SOURCES.WHATSAPP]: "WhatsApp",
    }[source],
    propertyId: propId,
    propertyName: "Demo Property",
    assignedAgentId: i < 20 ? agentId : null,
    stage,
    stageLabel: {
      [LEAD_STAGES.NEW]: "New",
      [LEAD_STAGES.CONTACTED]: "Contacted",
      [LEAD_STAGES.INSPECTION_BOOKED]: "Inspection Booked",
      [LEAD_STAGES.NEGOTIATING]: "Negotiating",
      [LEAD_STAGES.CLOSED_WON]: "Closed Won",
      [LEAD_STAGES.CLOSED_LOST]: "Closed Lost",
    }[stage],
    priority,
    priorityLabel: {
      [LEAD_PRIORITY.LOW]: "Low",
      [LEAD_PRIORITY.MEDIUM]: "Medium",
      [LEAD_PRIORITY.HIGH]: "High",
    }[priority],
    createdAt: daysFromBase(daysOffset),
    updatedAt: daysFromBase(daysOffset + Math.floor(Math.random() * 10)),
    lastContactDate: stage !== LEAD_STAGES.NEW ? daysFromBase(daysOffset + 2) : null,
    followUpDate: stage === LEAD_STAGES.NEW || stage === LEAD_STAGES.CONTACTED ? daysFromBase(daysOffset + 1) : null,
    notes: [
      { id: `note_${i}_1`, content: `Initial contact made via ${source}.`, date: daysFromBase(daysOffset + 1), author: "system" },
      { id: `note_${i}_2`, content: "Client expressed interest in payment plan options.", date: daysFromBase(daysOffset + 3), author: agentId || "system" },
    ],
    demoLabel: true,
  };
  leads.push(leadObj);
}

export const leadStagesList = Object.entries({
  [LEAD_STAGES.NEW]: "New",
  [LEAD_STAGES.CONTACTED]: "Contacted",
  [LEAD_STAGES.INSPECTION_BOOKED]: "Inspection Booked",
  [LEAD_STAGES.NEGOTIATING]: "Negotiating",
  [LEAD_STAGES.CLOSED_WON]: "Closed Won",
  [LEAD_STAGES.CLOSED_LOST]: "Closed Lost",
}).map(([value, label]) => ({ value, label }));
