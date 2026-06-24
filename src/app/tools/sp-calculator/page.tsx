"use client";

import { useState, useCallback } from "react";

interface SPResult {
  monthlyRevenue: number;
  monthlyProfit: number;
  annualProfit: number;
  roi: number;
  breakevenMonths: number;
  awsS3Cost: number;
  awsEgressCost: number;
  awsTotal: number;
  shelbySavings: number;
}

function calculateSP(
  storageTB: number,
  readRate: number,
  monthlyCost: number,
): SPResult {
  const storageGB = storageTB * 1024;
  const writeFee = 0.0096;
  const readFee = 0.0138;
  const replicationFactor = 2;
  const rpcShare = 0.5;

  const writeRevenue = (storageGB / replicationFactor) * writeFee;
  const readRevenue =
    (storageGB / replicationFactor) * readFee * readRate * (1 - rpcShare);
  const totalRevenue = writeRevenue + readRevenue;
  const profit = totalRevenue - monthlyCost;

  const awsS3Cost = storageGB * 0.023;
  const awsEgressCost = storageGB * readRate * 0.05;
  const awsTotal = awsS3Cost + awsEgressCost;

  return {
    monthlyRevenue: Math.round(totalRevenue * 100) / 100,
    monthlyProfit: Math.round(profit * 100) / 100,
    annualProfit: Math.round(profit * 12 * 100) / 100,
    roi: Math.round((profit / monthlyCost) * 100),
    breakevenMonths: profit > 0 ? Math.ceil(monthlyCost / profit) : Infinity,
    awsS3Cost: Math.round(awsS3Cost * 100) / 100,
    awsEgressCost: Math.round(awsEgressCost * 100) / 100,
    awsTotal: Math.round(awsTotal * 100) / 100,
    shelbySavings: Math.round((awsTotal - totalRevenue) * 100) / 100,
  };
}

const PRESETS = [
  { label: "小型 (125TB)", storageTB: 125, readRate: 2, cost: 480 },
  { label: "中型 (200TB)", storageTB: 200, readRate: 3, cost: 800 },
  { label: "大型 (600TB)", storageTB: 600, readRate: 4, cost: 2079 },
];

export default function SPCalculatorPage() {
  const [storageTB, setStorageTB] = useState(125);
  const [readRate, setReadRate] = useState(2);
  const [monthlyCost, setMonthlyCost] = useState(480);

  const result = useCallback(
    () => calculateSP(storageTB, readRate, monthlyCost),
    [storageTB, readRate, monthlyCost],
  )();

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setStorageTB(p.storageTB);
    setReadRate(p.readRate);
    setMonthlyCost(p.cost);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">SP 节点收益计算器</h1>
      <p className="text-zinc-400 mb-8">
        基于 Jump Crypto 成本建模。公式：月收益 = 写费用 + 读费用 &minus; 硬件成本。
      </p>

      <div className="flex gap-2 flex-wrap mb-8">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="px-3 py-1.5 text-xs rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        <label className="block">
          <span className="text-sm text-zinc-400">存储容量 (TB)</span>
          <input
            type="range"
            min={10}
            max={1000}
            value={storageTB}
            onChange={(e) => setStorageTB(Number(e.target.value))}
            className="w-full mt-2 accent-blue-500"
          />
          <span className="text-lg font-bold text-blue-400">{storageTB} TB</span>
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">读取率 (次/月/GB)</span>
          <input
            type="range"
            min={1}
            max={8}
            step={0.5}
            value={readRate}
            onChange={(e) => setReadRate(Number(e.target.value))}
            className="w-full mt-2 accent-blue-500"
          />
          <span className="text-lg font-bold text-blue-400">{readRate}x</span>
        </label>
        <label className="block">
          <span className="text-sm text-zinc-400">月硬件成本 ($)</span>
          <input
            type="number"
            value={monthlyCost}
            onChange={(e) => setMonthlyCost(Number(e.target.value))}
            className="w-full mt-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-md text-white"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <ResultCard label="月收益" value={`$${result.monthlyRevenue}`} />
        <ResultCard label="月利润" value={`$${result.monthlyProfit}`} highlight />
        <ResultCard label="年利润" value={`$${result.annualProfit}`} />
        <ResultCard label="ROI" value={`${result.roi}%`} />
      </div>

      <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
        <h3 className="font-semibold mb-4">vs AWS S3 对比</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-zinc-500">AWS S3 存储</div>
            <div className="font-semibold">${result.awsS3Cost}/月</div>
          </div>
          <div>
            <div className="text-zinc-500">AWS 出口流量</div>
            <div className="font-semibold">${result.awsEgressCost}/月</div>
          </div>
          <div>
            <div className="text-zinc-500">AWS 总计</div>
            <div className="font-semibold text-red-400">${result.awsTotal}/月</div>
          </div>
          <div>
            <div className="text-zinc-500">Shelby 节省</div>
            <div className="font-semibold text-green-400">${result.shelbySavings}/月</div>
          </div>
        </div>
      </div>

      {result.breakevenMonths === Infinity ? (
        <p className="text-red-400 text-sm mt-4">当前参数下无法覆盖成本。请增加存储量或读取率。</p>
      ) : (
        <p className="text-zinc-400 text-sm mt-4">
          预估回本周期：<span className="text-white font-medium">{result.breakevenMonths} 个月</span>
        </p>
      )}

      <p className="text-xs text-zinc-600 mt-8">
        免责声明：以上计算基于 Jump Crypto 公开的成本模型参数，仅供参考。实际收益受网络使用率、审计分数、代币价格等多种因素影响。不构成投资建议。
      </p>
    </div>
  );
}

function ResultCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
      <div className="text-xs text-zinc-500 mb-1">{label}</div>
      <div className={`text-xl font-bold ${highlight ? "text-green-400" : "text-white"}`}>
        {value}
      </div>
    </div>
  );
}
