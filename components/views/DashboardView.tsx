import React from 'react';
import Section from '../ui/Section';

// A simple stat card component for the dashboard
const StatCard: React.FC<{ value: string; label: string; subtext?: string; className?: string }> = ({ value, label, subtext, className = '' }) => (
    <div className={`bg-[#43454a] border border-[#555555] rounded-md p-4 ${className}`}>
        <div className="text-3xl font-bold text-gray-200 mb-1">{value}</div>
        <div className="text-xs text-gray-400">{label}</div>
        {subtext && <div className="text-[11px] text-gray-500 mt-1">{subtext}</div>}
    </div>
);

// A gauge component for the health score
const HealthScoreGauge: React.FC<{ score: number }> = ({ score }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
                <circle
                    className="text-[#555555]"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="80"
                    cy="80"
                />
                <circle
                    className="text-green-500"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="80"
                    cy="80"
                    style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-green-400">{score}</span>
                <span className="text-xs text-gray-400">项目健康分</span>
            </div>
        </div>
    );
};

// A donut chart for adoption rates
const DonutChart: React.FC<{ percentage: number; label: string }> = ({ percentage, label }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative flex items-center justify-center">
                 <svg className="w-24 h-24 transform -rotate-90">
                    <circle stroke="#555555" strokeWidth="8" fill="transparent" r={radius} cx="48" cy="48" />
                    <circle
                        className="text-blue-500"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        fill="transparent"
                        r={radius}
                        cx="48"
                        cy="48"
                         style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
                    />
                </svg>
                <span className="absolute text-xl font-semibold text-blue-400">{percentage}%</span>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">{label}</p>
        </div>
    );
};

const DashboardView: React.FC = () => {
    return (
        <div className="space-y-5">
            <Section title="📈 项目健康度">
                <div className="bg-[#43454a] border border-[#555555] rounded-md p-4 flex justify-center items-center">
                    <HealthScoreGauge score={92} />
                </div>
            </Section>

            <Section title="📊 关键指标">
                <div className="grid grid-cols-2 gap-3">
                    <StatCard value="1,286" label="累计扫描次数" />
                    <StatCard value="351" label="已发现风险" />
                    <StatCard value="312" label="已修复风险" subtext="修复率: 88.9%" />
                    <StatCard value="3.5h" label="平均修复时长" />
                </div>
            </Section>
            
            <Section title="📉 风险趋势 (近5周)">
                <div className="bg-[#43454a] border border-[#555555] rounded-md p-4 h-40 relative">
                    <svg width="100%" height="100%" viewBox="0 0 350 120" preserveAspectRatio="none">
                        {/* Grid lines */}
                        {[1, 2, 3, 4].map(i => (
                             <line key={i} x1="0" y1={i * 30} x2="350" y2={i * 30} stroke="#555555" strokeWidth="0.5" />
                        ))}
                        {/* Trend line */}
                        <polyline
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                            points="10,80 80,60 150,70 220,40 290,20"
                        />
                         {/* Data points */}
                        <circle cx="10" cy="80" r="3" fill="#f59e0b" />
                        <circle cx="80" cy="60" r="3" fill="#f59e0b" />
                        <circle cx="150" cy="70" r="3" fill="#f59e0b" />
                        <circle cx="220" cy="40" r="3" fill="#f59e0b" />
                        <circle cx="290" cy="20" r="3" fill="#f59e0b" />
                    </svg>
                    <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[10px] text-gray-500">
                        <span>5周前</span>
                        <span>4周前</span>
                        <span>3周前</span>
                        <span>2周前</span>
                        <span>上周</span>
                    </div>
                </div>
            </Section>

            <Section title="✅ 采纳率分析">
                 <div className="bg-[#43454a] border border-[#555555] rounded-md p-4 flex justify-around items-center">
                    <DonutChart percentage={78} label="一键修复采纳率" />
                    <DonutChart percentage={62} label="AI 讨论使用率" />
                </div>
            </Section>
            
             <p className="text-center text-xs text-gray-500 pt-2">
                数据统计自项目创建以来，于 2024-11-06 14:30 更新。
            </p>
        </div>
    );
};

export default DashboardView;
