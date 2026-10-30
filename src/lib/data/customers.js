/**
 * G-wealth Republic — Seed Customers Data
 * All records are clearly labelled as demo data.
 */

export const customers = [
  {
    id: "cust_001",
    fullName: "Adewale Johnson",
    email: "adewale.johnson@example.com",
    phone: "+234 803 123 4567",
    address: "12, Admiralty Way, Lekki, Lagos",
    purchasedProperties: ["prop_001"],
    paymentPlans: [{
      id: "plan_001", propertyId: "prop_001", propertyTitle: "Premium Residential Plot in Ibeju-Lekki",
      totalPrice: 5000000, deposit: 1000000, depositPercent: 20, outstandingBalance: 4000000,
      monthsTotal: 24, monthsRemaining: 18, monthlyAmount: 166667, nextDueDate: "2025-12-01", status: "active",
      payments: [
        { id: "pay_001", amount: 1000000, date: "2024-06-15T00:00:00Z", method: "bank-transfer", reference: "DEP001", note: "Initial deposit" },
        { id: "pay_002", amount: 166667, date: "2024-07-15T00:00:00Z", method: "bank-transfer", reference: "INST001", note: "Instalment 1" },
      ],
    }],
    documents: [{ id: "doc_001", type: "ID", name: "International Passport", url: "#" }],
    notes: [],
    createdAt: "2024-06-10T00:00:00Z",
    demoLabel: true,
  },
  {
    id: "cust_002",
    fullName: "Sarah Okafor",
    email: "sarah.okafor@example.com",
    phone: "+234 803 234 5678",
    address: "45, Ozumba Gbadi St, VI, Lagos",
    purchasedProperties: ["prop_010"],
    paymentPlans: [{
      id: "plan_002", propertyId: "prop_010", propertyTitle: "Luxury Apartment in Victoria Island",
      totalPrice: 95000000, deposit: 28500000, depositPercent: 30, outstandingBalance: 66500000,
      monthsTotal: 60, monthsRemaining: 42, monthlyAmount: 1125000, nextDueDate: "2025-12-01", status: "active",
      payments: [{ id: "pay_003", amount: 28500000, date: "2024-05-10T00:00:00Z", method: "bank-transfer", reference: "DEP002", note: "Initial deposit" }],
    }],
    documents: [{ id: "doc_003", type: "ID", name: "Driver's License", url: "#" }],
    notes: [],
    createdAt: "2024-05-05T00:00:00Z",
    demoLabel: true,
  },
  {
    id: "cust_003",
    fullName: "Michael Eze",
    email: "michael.eze@example.com",
    phone: "+234 803 345 6789",
    address: "7, Asokoro Hills, Abuja",
    purchasedProperties: ["prop_005"],
    paymentPlans: [{
      id: "plan_003", propertyId: "prop_005", propertyTitle: "Luxury Residential Plot in Abuja",
      totalPrice: 25000000, deposit: 7500000, depositPercent: 30, outstandingBalance: 17500000,
      monthsTotal: 48, monthsRemaining: 24, monthlyAmount: 354167, nextDueDate: "2025-12-15", status: "active",
      payments: [
        { id: "pay_004", amount: 7500000, date: "2024-03-15T00:00:00Z", method: "bank-transfer", reference: "DEP003", note: "Initial deposit" },
      ],
    }],
    documents: [{ id: "doc_004", type: "ID", name: "National ID", url: "#" }],
    notes: [],
    createdAt: "2024-03-10T00:00:00Z",
    demoLabel: true,
  },
];

const _firstNames = ["Olumide", "Chinedu", "Amara", "David", "Ngozi", "Samuel", "Jennifer", "Chika", "Blessing", "Emeka"];
const _lastNames = ["Adeyemi", "Mensah", "Okolo", "Eze", "Bello", "Sholabi", "Okonkwo", "Aderibigbe", "Okon", "Uzochukwu"];
const _prices = [5000000, 8500000, 12000000, 15000000, 25000000, 30000000, 45000000, 55000000, 75000000, 95000000];
const _titles = ["Premium Residential Plot in Ibeju-Lekki", "Serene Residential Plot in Epe", "Elegant Residential Plot in Mowe", "Prime Residential Plot in Asaba", "Luxury Residential Plot in Abuja", "Strategic Commercial Plot in Lagos", "Premium Residential Plot in Port Harcourt", "Large Residential Plot in Abuja Outskirts", "Premium Plot in Lekki", "Luxury Apartment"];

for (let i = 0; i < 22; i++) {
  const pIdx = i % 10;
  const price = _prices[pIdx];
  const deposit = Math.round(price * 0.25);
  customers.push({
    id: `cust_${String(i + 4).padStart(3, "0")}`,
    fullName: `${_firstNames[i % 10]} ${_lastNames[i % 10]}`,
    email: `${_firstNames[i % 10].toLowerCase()}.${_lastNames[i % 10].toLowerCase()}@example.com`,
    phone: `+234 80${String(i).padStart(2, "0")} ${String(i * 3 + 1).padStart(3, "0")} ${String(i * 7 + 9).padStart(4, "0")}`,
    address: `${String(Math.floor(Math.random() * 100) + 1)}, Sample Street, ${["Lagos", "Abuja", "PHC", "Asaba"][i % 4]}`,
    purchasedProperties: [`prop_${String(pIdx + 1).padStart(3, "0")}`],
    paymentPlans: [{
      id: `plan_${String(i + 4).padStart(3, "0")}`,
      propertyId: `prop_${String(pIdx + 1).padStart(3, "0")}`,
      propertyTitle: _titles[pIdx],
      totalPrice: price, deposit: deposit, depositPercent: 25,
      outstandingBalance: price - deposit - (i * 50000),
      monthsTotal: 36, monthsRemaining: 36 - (i % 36),
      monthlyAmount: Math.round((price - deposit) / 36),
      nextDueDate: new Date(2025, 10 + (i % 2), 15).toISOString().split("T")[0],
      status: "active",
      payments: [{ id: `pay_${String(i + 4).padStart(3, "0")}_0`, amount: deposit, date: new Date(2024, 5 + (i % 6), 10).toISOString(), method: i % 2 === 0 ? "bank-transfer" : "cash", reference: `DEP${String(i + 4).padStart(3, "0")}`, note: "Initial deposit" }],
    }],
    documents: [{ id: `doc_${String(i + 4).padStart(3, "0")}_0`, type: "ID", name: "International Passport", url: "#" }],
    notes: [{ id: `note_${String(i + 4).padStart(3, "0")}_0`, content: "Customer has shown consistent payment history.", date: new Date(2025, 5, 15 + i).toISOString(), author: "system" }],
    createdAt: new Date(2024, 3 + (i % 6), 10 + i).toISOString(),
    demoLabel: true,
  });
}

export default customers;

