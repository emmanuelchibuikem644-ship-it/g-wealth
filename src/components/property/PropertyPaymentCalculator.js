"use client";

/**
 * G-wealth Republic — Payment Calculator for Property Detail Page
 */
import { useState } from "react";
import { Input } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, calculateMonthlyInstallment } from "@/lib/utils";

export function PropertyPaymentCalculator({ property }) {
  const price = property.price;
  const [deposit, setDeposit] = useState(Math.round(price * 0.2));
  const [months, setMonths] = useState(property.paymentPlan?.months || 24);

  const remaining = Math.max(0, price - deposit);
  const monthly = calculateMonthlyInstallment(price, deposit, months);

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl font-bold text-navy">Payment Calculator</h3>
      <p className="text-sm text-slate-500">
        Total price: {formatCurrency(price)}. Estimate your monthly instalment.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Initial Deposit (₦)"
          type="number"
          value={deposit || ""}
          onChange={(e) => setDeposit(Number(e.target.value) || 0)}
          min="0"
          max={price}
        />
        <Input
          label="Number of Months"
          type="number"
          value={months || ""}
          onChange={(e) => setMonths(Number(e.target.value) || 0)}
          min="1"
          max="360"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
        <div className="rounded-lg bg-navy/5 p-3 text-center">
          <p className="text-xs text-slate-500">Remaining</p>
          <p className="font-bold text-navy">{formatCurrency(remaining)}</p>
        </div>
        <div className="rounded-lg bg-gold/10 p-3 text-center">
          <p className="text-xs text-gold">Monthly</p>
          <p className="font-bold text-navy">{formatCurrency(monthly)}</p>
        </div>
        <div className="rounded-lg bg-navy/5 p-3 text-center">
          <p className="text-xs text-slate-500">Deposit %</p>
          <p className="font-bold text-navy">{price > 0 ? Math.round((deposit / price) * 100) : 0}%</p>
        </div>
      </div>

      <div className="rounded-lg bg-amber-50 p-3">
        <p className="text-xs text-amber-800">
          Formula: (Price - Deposit) ÷ Months. This is an illustrative estimate, not a financing offer.
        </p>
      </div>
    </div>
  );
}
