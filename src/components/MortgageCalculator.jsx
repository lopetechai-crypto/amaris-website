import React, { useState } from 'react';
import { Calculator, Sparkles } from 'lucide-react';

export default function MortgageCalculator({ onOpenBooking }) {
  const [propertyPrice, setPropertyPrice] = useState(32000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.4);
  const [tenureYears, setTenureYears] = useState(20);

  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  const projectedValue5Y = propertyPrice * Math.pow(1.125, 5);

  const formatINR = (val) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    } else if (val >= 100000) {
      return `₹ ${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹ ${Math.round(val).toLocaleString('en-IN')}`;
  };

  return (
    <section id="calculator" className="py-24 bg-[#161210] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#211a16] border border-[#b89674]/40 text-xs text-[#d8c7b5] uppercase tracking-widest font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FINANCIAL INTELLIGENCE</span>
          </div>

          <h2 className="font-serif-header text-3xl sm:text-5xl text-[#f5efe6] font-light uppercase tracking-tight">
            SMART INVESTMENT & <br />
            <span className="text-[#d8c7b5] font-normal italic lowercase tracking-normal">mortgage estimator</span>
          </h2>
          <p className="font-sans-body text-xs sm:text-sm text-[#9c8e82] mt-4 leading-relaxed font-light">
            Model your home loan structure and forecast long-term capital appreciation in Financial District, Hyderabad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Sliders */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-[#b89674]/30 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-[#f5efe6] font-semibold">Residence Value</label>
                <span className="font-cinzel text-lg text-[#d8c7b5] font-bold">{formatINR(propertyPrice)}</span>
              </div>
              <input
                type="range"
                min="20000000"
                max="80000000"
                step="1000000"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full h-2 bg-[#2b221c] rounded-lg appearance-none cursor-pointer accent-[#d8c7b5]"
              />
              <div className="flex justify-between text-[9px] text-[#9c8e82] mt-1">
                <span>₹ 2.0 Cr</span>
                <span>₹ 8.0 Cr</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-[#f5efe6] font-semibold">Down Payment ({downPaymentPercent}%)</label>
                <span className="font-cinzel text-sm text-[#d8c7b5] font-medium">{formatINR(downPaymentAmount)}</span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full h-2 bg-[#2b221c] rounded-lg appearance-none cursor-pointer accent-[#d8c7b5]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-[#f5efe6] font-semibold">Interest Rate</label>
                <span className="font-cinzel text-sm text-[#d8c7b5] font-medium">{interestRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="7.0"
                max="11.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-[#2b221c] rounded-lg appearance-none cursor-pointer accent-[#d8c7b5]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-[#f5efe6] font-semibold">Loan Tenure</label>
                <span className="font-cinzel text-sm text-[#d8c7b5] font-medium">{tenureYears} Years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-[#2b221c] rounded-lg appearance-none cursor-pointer accent-[#d8c7b5]"
              />
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-[#211a16] p-6 sm:p-8 rounded-2xl border border-[#b89674]/40 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-[#b89674]/20 pb-4">
              <div className="w-10 h-10 rounded-xl bg-[#d8c7b5] flex items-center justify-center text-[#161210]">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-header text-lg text-[#f5efe6] font-medium">Estimated Monthly EMI</h3>
                <span className="text-[9px] text-[#d8c7b5] uppercase tracking-widest">FINANCIAL DISTRICT ASSET</span>
              </div>
            </div>

            <div className="py-2">
              <span className="font-cinzel text-3xl sm:text-4xl text-[#d8c7b5] font-bold block">
                {formatINR(emi)} / month
              </span>
            </div>

            <div className="space-y-3 text-xs border-t border-b border-[#b89674]/20 py-4">
              <div className="flex justify-between">
                <span className="text-[#9c8e82]">Total Loan Principal:</span>
                <span className="text-[#f5efe6] font-medium">{formatINR(loanAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9c8e82]">Est. Total Interest Payable:</span>
                <span className="text-[#f5efe6] font-medium">{formatINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between text-[#d8c7b5]">
                <span className="font-semibold">Projected 5-Yr Value (12.5% CAGR):</span>
                <span className="font-bold">{formatINR(projectedValue5Y)}</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3.5 rounded-full bg-[#d8c7b5] text-[#161210] text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#ffffff] transition-all"
            >
              Get Custom Bank Offer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
