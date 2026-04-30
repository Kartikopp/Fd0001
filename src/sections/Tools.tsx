import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Landmark, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn, formatINR } from '../utils';

export function ToolsSection() {
  const [activeTool, setActiveTool] = useState<'sip' | 'emi'>('sip');

  return (
    <section id="tools" className="py-24 bg-neutral-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-bold text-gold uppercase tracking-[0.3em] mb-4"
          >
            Interactive
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold"
          >
            Finance Calculators
          </motion.h3>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Tool Selector Sidebar */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            <ToolButton 
              active={activeTool === 'sip'} 
              onClick={() => setActiveTool('sip')}
              icon={<TrendingUp size={20} />}
              title="SIP Calculator"
              desc="Mutual fund returns predict karein"
            />
            <ToolButton 
              active={activeTool === 'emi'} 
              onClick={() => setActiveTool('emi')}
              icon={<Landmark size={20} />}
              title="EMI Calculator"
              desc="Loan planning ko simple banayein"
            />
          </div>

          {/* Calculator Interface */}
          <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded-[40px] p-8 md:p-12">
            {activeTool === 'sip' ? <SIPCalculator /> : <EMICalculator />}
          </div>
        </div>
      </div>
    </section>
  );
}

function ToolButton({ active, onClick, icon, title, desc }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-6 rounded-3xl text-left transition-all border",
        active 
          ? "bg-gold border-gold text-black shadow-[0_10px_30px_rgba(255,215,0,0.2)]" 
          : "bg-neutral-900 border-neutral-800 text-white hover:border-neutral-700"
      )}
    >
      <div className={cn("mb-4", active ? "text-black" : "text-gold")}>
        {icon}
      </div>
      <h4 className="text-lg font-display font-bold mb-1">{title}</h4>
      <p className={cn("text-xs leading-relaxed", active ? "text-black/70" : "text-neutral-400")}>
        {desc}
      </p>
    </button>
  );
}

function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [expectedRate, setExpectedRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const results = useMemo(() => {
    const P = monthlyInvestment;
    const i = expectedRate / 100 / 12;
    const n = timePeriod * 12;
    
    const futureValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = P * n;
    const wealthGained = futureValue - investedAmount;

    return {
      totalValue: futureValue,
      investedAmount,
      wealthGained
    };
  }, [monthlyInvestment, expectedRate, timePeriod]);

  const chartData = [
    { name: 'Invested', value: results.investedAmount },
    { name: 'Gains', value: results.wealthGained }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <div className="flex-1 space-y-10">
        <InputControl 
          label="Monthly Investment" 
          value={monthlyInvestment} 
          min={500} 
          max={100000} 
          step={500}
          symbol="₹" 
          onChange={setMonthlyInvestment} 
        />
        <InputControl 
          label="Expected Return Rate (p.a)" 
          value={expectedRate} 
          min={1} 
          max={30} 
          step={0.5}
          symbol="%" 
          onChange={setExpectedRate} 
        />
        <InputControl 
          label="Time Period (Years)" 
          value={timePeriod} 
          min={1} 
          max={40} 
          step={1}
          symbol="Y" 
          onChange={setTimePeriod} 
        />

        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-neutral-900">
          <div>
            <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-2">Total Value</p>
            <p className="text-2xl font-display font-bold text-gold">{formatINR(results.totalValue)}</p>
          </div>
          <div>
            <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-2">Estimated Returns</p>
            <p className="text-2xl font-display font-bold">{formatINR(results.wealthGained)}</p>
          </div>
        </div>
      </div>

      <div className="md:w-64 flex flex-col items-center">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#1e1e1e" />
                <Cell fill="#FFD700" />
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#171717', border: '1px solid #333', borderRadius: '8px', color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-neutral-800" /> Invested</span>
            <span className="text-neutral-400">{formatINR(results.investedAmount)}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-gold" /> Returns</span>
            <span className="text-neutral-400 font-bold">{formatINR(results.wealthGained)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const results = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = tenure * 12;
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    return {
      emi,
      totalPayment,
      totalInterest
    };
  }, [loanAmount, interestRate, tenure]);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <InputControl 
          label="Loan Amount" 
          value={loanAmount} 
          min={10000} 
          max={10000000} 
          step={10000}
          symbol="₹" 
          onChange={setLoanAmount} 
        />
        <InputControl 
          label="Interest Rate (p.a)" 
          value={interestRate} 
          min={4} 
          max={25} 
          step={0.1}
          symbol="%" 
          onChange={setInterestRate} 
        />
        <InputControl 
          label="Tenure (Years)" 
          value={tenure} 
          min={1} 
          max={30} 
          step={1}
          symbol="Y" 
          onChange={setTenure} 
        />
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-2 text-center md:text-left">Monthly EMI</p>
          <p className="text-4xl font-display font-bold text-gold text-center md:text-left">{formatINR(results.emi)}</p>
        </div>
        <div className="h-10 w-px bg-neutral-800 hidden md:block" />
        <div className="text-center md:text-right">
          <p className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-2">Total Interest Payable</p>
          <p className="text-xl font-display font-bold">{formatINR(results.totalInterest)}</p>
        </div>
      </div>
    </div>
  );
}

function InputControl({ label, value, min, max, step, symbol, onChange }: any) {
  // Calculate percentage for the custom track background
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">{label}</label>
          <div className="text-xl font-display font-bold text-white">
             {symbol === '₹' ? formatINR(value) : (symbol === 'Y' ? `${value} Years` : `${value}${symbol}`)}
          </div>
        </div>
      </div>
      
      <div className="relative h-6 flex items-center group">
        {/* Custom Track Background (unfilled) */}
        <div className="absolute w-full h-1.5 bg-neutral-800 rounded-full group-hover:bg-neutral-700 transition-colors" />
        
        {/* Custom Progress Fill (the gold part) */}
        <div 
          className="absolute h-1.5 bg-gold rounded-full transition-all duration-150 ease-out shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          style={{ width: `${percentage}%` }}
        />
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-6 opacity-0 cursor-pointer z-10"
          aria-label={label}
        />
        
        {/* Custom Thumb handle */}
        <div 
          className="absolute w-5 h-5 bg-white rounded-full border-4 border-gold shadow-lg pointer-events-none transition-all duration-150 ease-out group-active:scale-125"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    </div>
  );
}
