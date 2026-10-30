"use client";

import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Input } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { formatCurrency, calculateMonthlyInstallment, calculateMortgagePayment, calculateTotalInterest } from "@/lib/utils";
import { DemoNotice } from "@/components/DemoNotice";

export default function CalculatorPage() {
  const [calcType, setCalcType] = useState("installment");
  const [price, setPrice] = useState(5000000);
  const [deposit, setDeposit] = useState(1000000);
  const [months, setMonths] = useState(24);
  const [mortgagePrice, setMortgagePrice] = useState(5000000);
  const [mortgageDeposit, setMortgageDeposit] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10.5);
  const [mortgageMonths, setMortgageMonths] = useState(24);

  const depositPercent = price > 0 ? Math.round((deposit / price) * 100) : 0;
  const monthlyInstalment = calculateMonthlyInstallment(price, deposit, months);
  const remainingBalance = Math.max(0, price - deposit);
  const principal = Math.max(0, mortgagePrice - mortgageDeposit);
  const monthlyMortgage = calculateMortgagePayment(principal, interestRate, mortgageMonths);
  const totalInterest = calculateTotalInterest(principal, interestRate, mortgageMonths);
  const totalRepayment = principal + totalInterest;

  const handlePriceChange = (e) => {
    const val = Number(e.target.value);
    setPrice(val || 0);
    setDeposit(Math.round(val * 0.2));
  };

  return (
    <>
      <Navigation />
      <DemoNotice className="mb-4 mx-4 mt-4" />
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-2">Payment & Instalment Calculator</h1>
          <p className="text-slate-600 mb-8">Estimate your monthly payments. Results are illustrative estimates, not formal financial offers.</p>

          <div className="mb-6 flex gap-2">
            <button onClick={() => setCalcType("installment")} className={`px-4 py-2 rounded-lg font-medium text-sm ${calcType === "installment" ? "bg-gold text-navy" : "bg-white text-slate-600 border border-border"}`}>Instalment Calculator (0% interest)</button>
            <button onClick={() => setCalcType("mortgage")} className={`px-4 py-2 rounded-lg font-medium text-sm ${calcType === "mortgage" ? "bg-gold text-navy" : "bg-white text-slate-600 border border-border"}`}>Mortgage Calculator (with interest)</button>
          </div>

          <Card>
            <CardHeader>
              <div className="font-serif text-xl text-navy">{calcType === "installment" ? "Instalment Plan Calculator" : "Mortgage Repayment Calculator"}</div>
            </CardHeader>
            <CardContent>
              {calcType === "installment" ? (
                <div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Property Price (₦)" type="number" value={price || ""} onChange={handlePriceChange} min="0" />
                    <Input label="Initial Deposit (₦)" type="number" value={deposit || ""} onChange={(e) => setDeposit(Number(e.target.value) || 0)} min="0" />
                    <Input label="Number of Months" type="number" value={months || ""} onChange={(e) => setMonths(Number(e.target.value) || 0)} min="1" max="360" />
                    <div />
                  </div>
                  <div className="mt-6 rounded-lg bg-navy/5 p-4 text-center">
                    <p className="text-sm text-slate-500">Deposit Percentage</p>
                    <p className="text-2xl font-bold text-navy">{depositPercent}%</p>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-lg bg-white p-4 text-center shadow">
                      <p className="text-sm text-slate-500">Remaining Balance</p>
                      <p className="text-2xl font-bold text-navy">{formatCurrency(remainingBalance)}</p>
                    </div>
                    <div className="rounded-lg bg-white p-4 text-center shadow">
                      <p className="text-sm text-slate-500">Monthly Instalment</p>
                      <p className="text-2xl font-bold text-gold">{formatCurrency(monthlyInstalment)}</p>
                    </div>
                    <div className="rounded-lg bg-gold/10 p-4 text-center">
                      <p className="text-sm text-gold">Formula</p>
                      <p className="text-xs text-navy">(Price - Deposit) ÷ Months</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Input label="Property Price (₦)" type="number" value={mortgagePrice || ""} onChange={(e) => setMortgagePrice(Number(e.target.value) || 0)} min="0" />
                    <Input label="Initial Deposit (₦)" type="number" value={mortgageDeposit || ""} onChange={(e) => setMortgageDeposit(Number(e.target.value) || 0)} min="0" />
                    <Input label="Annual Interest Rate (%)" type="number" step="0.1" value={interestRate || ""} onChange={(e) => setInterestRate(Number(e.target.value) || 0)} min="0" max="100" />
                    <Input label="Loan Term (Months)" type="number" value={mortgageMonths || ""} onChange={(e) => setMortgageMonths(Number(e.target.value) || 0)} min="1" max="360" />
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 text-center shadow"><p className="text-sm text-slate-500">Loan Principal</p><p className="text-xl font-bold text-navy">{formatCurrency(principal)}</p></div>
                    <div className="rounded-lg bg-white p-4 text-center shadow"><p className="text-sm text-slate-500">Monthly Payment</p><p className="text-xl font-bold text-gold">{formatCurrency(monthlyMortgage)}</p></div>
                    <div className="rounded-lg bg-white p-4 text-center shadow"><p className="text-sm text-slate-500">Total Interest</p><p className="text-xl font-bold text-navy">{formatCurrency(totalInterest)}</p></div>
                    <div className="rounded-lg bg-white p-4 text-center shadow"><p className="text-sm text-slate-500">Total Repayment</p><p className="text-xl font-bold text-navy">{formatCurrency(totalRepayment)}</p></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6 rounded-lg bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Important:</strong> These calculators provide illustrative estimates only. Results do not constitute a financing offer or approval.
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

