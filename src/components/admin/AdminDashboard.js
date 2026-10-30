/***
 * G-wealth Republic — Admin Dashboard
 * Main dashboard page with KPIs, charts, and activity feeds
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Home, BarChart3, RefreshCw, Calendar, UserPlus, TrendingUp, PieChart, Pie, Cell, ResponsiveContainer } from "lucide-react";
import { StatCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllLeads, getAllAppointments, getAllCustomers, getAllAppointmentRequests } from "@/lib/store";
import { formatCurrency, timeAgo } from "@/lib/utils";
import { CountUp } from "@/components/admin/CountUp";
import { LineChart, Line, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, PieChart as RechartsPieChart, Pie as RechartsPie, Cell as RechartsCell } from "recharts";
import property1 from "@/assets/property1.svg";
import property2 from "@/assets/property2.svg";
import property3 from "@/assets/property3.svg";