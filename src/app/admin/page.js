/**
 * G-wealth Republic — Admin Dashboard
 */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Home, BarChart3, RefreshCw, Calendar, UserPlus, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllLeads, getAllAppointments, getAllCustomers, getAllAppointmentRequests, getAllProperties } from "@/lib/store";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { CountUp } from "@/components/admin/CountUp";
import {
  LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
} from "recharts";

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState("30");
  const leads = getAllLeads();
  const appointments = getAllAppointments();
  const requests = getAllAppointmentRequests();

  // Calculate KPIs from real data
  const allProps = getAllProperties();
  const totalListings = allProps.filter((p) => p.status === "published").length;
  const activeListings = allProps.filter((p) => p.status === "published" && p.availabilityStatus === "available").length;
  const soldCount = allProps.filter((p) => p.availabilityStatus === "sold").length;
  const weeklyLeads = leads.filter((l) => new Date(l.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length;
  const upcomingInspections = appointments.filter((a) => a.status === "accepted" && new Date(a.date) > new Date()).length;
  const monthlyRevenue = getAllCustomers().reduce((sum, c) => sum + (c.paymentPlans?.[0]?.payments?.reduce((pSum, p) => pSum + p.amount, 0) || 0), 0);

  // Chart data - enquiries over time (last 7 days)
  const chartDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const enquiriesData = chartDays.map((day, i) => {
    const dayStart = new Date();
    dayStart.setDate(dayStart.getDate() - (6 - i));
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const count = leads.filter((l) => new Date(l.createdAt) >= dayStart && new Date(l.createdAt) < dayEnd).length;
    return { day, count };
  });

  // Sales by location
  const locationData = ["Lagos", "Abuja", "Port Harcourt", "Asaba"].map((city) => ({
    city,
    count: leads.filter((l) => l.propertyId && l.stage === "closed-won").length,
  }));

  // Property type distribution
  const typeData = [
    { type: "Residential Land", count: getAllProperties().filter((p) => p.propertyType === "residential-land").length },
    { type: "Commercial Land", count: getAllProperties().filter((p) => p.propertyType === "commercial-land").length },
    { type: "House", count: getAllProperties().filter((p) => p.propertyType === "house").length },
    { type: "Apartment", count: getAllProperties().filter((p) => p.propertyType === "apartment").length },
  ];

  // Lead sources
  const sourceData = [
    { source: "Website", count: leads.filter((l) => l.source === "website").length },
    { source: "WhatsApp", count: leads.filter((l) => l.source === "whatsapp").length },
    { source: "Social Media", count: leads.filter((l) => l.source === "social-media").length },
    { source: "Walk-in", count: leads.filter((l) => l.source === "walk-in").length },
    { source: "Referral", count: leads.filter((l) => l.source === "referral").length },
  ].filter((s) => s.count > 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-navy">Dashboard</h1>
          <p className="text-slate-600">Overview of your real estate business performance</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="rounded-lg border border-border px-3 py-1.5 text-sm text-slate-700 focus:border-gold">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="year">This year</option>
          </select>
          <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-1" /> Refresh</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        <StatCard label="Total Listings" value={<CountUp end={totalListings} />} icon={<LayoutDashboard className="h-5 w-5" />} />
        <StatCard label="Active Listings" value={<CountUp end={activeListings} />} icon={<Home className="h-5 w-5" />} />
        <StatCard label="Sold Plots" value={<CountUp end={soldCount} />} icon={<TrendingUp className="h-5 w-5" />} />
        <StatCard label="New Enquiries" value={<CountUp end={weeklyLeads} />} icon={<UserPlus className="h-5 w-5" />} trend="12%" trendUp />
        <StatCard label="Inspections Booked" value={<CountUp end={upcomingInspections} />} icon={<Calendar className="h-5 w-5" />} />
        <StatCard label="Monthly Revenue" value={formatCurrency(monthlyRevenue)} icon={<BarChart3 className="h-5 w-5" />} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-navy mb-4">Enquiries Over Time (7 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={enquiriesData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <ChartTooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e7e9ee" }} />
              <Line type="monotone" dataKey="count" stroke="#C7A568" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-navy mb-4">Sales by Location</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={locationData}>
              <XAxis dataKey="city" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <ChartTooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #e7e9ee" }} />
              <Bar dataKey="count" fill="#C7A568" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-navy mb-4">Listings by Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={typeData} dataKey="count" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} label={({ name, ...rest }) => rest.value > 0 ? `${name}: ${rest.value}` : ""}>
                <Cell fill="#0B1730" />
                <Cell fill="#C7A568" />
                <Cell fill="#64748B" />
                <Cell fill="#10B981" />
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-navy mb-4">Lead Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={sourceData} dataKey="count" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} label={({ name, ...rest }) => rest.value > 0 ? `${name}: ${rest.value}` : ""}>
                <Cell fill="#0B1730" />
                <Cell fill="#C7A568" />
                <Cell fill="#64748B" />
                <Cell fill="#10B981" />
                <Cell fill="#F59E0B" />
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Feeds */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-navy mb-4">Recent Enquiries</h3>
          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="font-medium text-navy">{lead.fullName}</p><p className="text-xs text-slate-500">{lead.email} • {lead.propertyName || "General"}</p></div>
                <div className="text-right"><Badge variant="outline" className="text-xs">{lead.stageLabel}</Badge><p className="text-xs text-slate-400 mt-1">{timeAgo(lead.createdAt)}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-navy mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {appointments.filter((a) => a.status === "accepted").slice(0, 5).map((apt) => (
              <div key={apt.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="font-medium text-navy">{new Date(apt.date).toLocaleDateString()}</p><p className="text-xs text-slate-500">{apt.time} • {apt.visitorCount} visitors</p></div>
                <Badge variant="success" className="text-xs">Confirmed</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl bg-white p-6 shadow-sm">
          <h3 className="font-serif text-lg font-bold text-navy mb-4">Leads Needing Attention</h3>
          <div className="space-y-2">
            {leads.filter((l) => l.stage === "new").slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between rounded-lg border border-warning/30 bg-warning-bg/30 p-3">
                <div><p className="font-medium text-navy">{lead.fullName}</p><p className="text-xs text-slate-500">New lead • {timeAgo(lead.createdAt)}</p></div>
                <Button variant="gold" size="sm">Contact Now</Button>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl bg-white p-6 shadow-sm text-center">
            <UserPlus className="h-8 w-8 text-navy mx-auto mb-2" />
            <h3 className="font-medium text-navy mb-1">New Lead</h3>
            <Button variant="outline" size="sm" className="w-full">Add Lead</Button>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm text-center">
            <Home className="h-8 w-8 text-navy mx-auto mb-2" />
            <h3 className="font-medium text-navy mb-1">New Listing</h3>
            <Button variant="outline" size="sm" className="w-full">Add Property</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


