
import React, { useState } from 'react';
import Section, { StatusCard } from '../ui/Section';
import StatusBadge from '../ui/StatusBadge';
import { RISKS_DATA } from '../../constants';
import { Risk, RiskLevel } from '../../types';

const riskLevelConfig = {
    [RiskLevel.High]: {
        color: 'border-red-500',
        icon: '🔴',
        textColor: 'text-red-500',
    },
    [RiskLevel.Medium]: {
        color: 'border-yellow-500',
        icon: '🟠',
        textColor: 'text-yellow-500',
    },
    [RiskLevel.Low]: {
        color: 'border-yellow-300',
        icon: '🟡',
        textColor: 'text-yellow-300',
    },
};

const StatCard: React.FC<{ value: number; label: string; level: RiskLevel }> = ({ value, label, level }) => (
    <div className="bg-[#43454a] border border-[#555555] rounded-md p-3 text-center">
        <div className={`text-2xl font-bold mb-1 ${riskLevelConfig[level].textColor}`}>{value}</div>
        <div className="text-[11px] text-gray-500">{label}</div>
    </div>
);

const RiskItem: React.FC<{ risk: Risk; isOpen: boolean; onToggle: () => void }> = ({ risk, isOpen, onToggle }) => {
    const config = riskLevelConfig[risk.level];

    return (
        <div className={`bg-[#43454a] border border-[#555555] border-l-4 ${config.color} rounded-md mb-3 overflow-hidden`}>
            <header className="p-3 cursor-pointer flex items-center gap-3 hover:bg-[#4a4d50]" onClick={onToggle}>
                <div className="text-xl flex-shrink-0">{config.icon}</div>
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-300 mb-1">{risk.title}</h4>
                    <p className="text-xs text-gray-500 font-mono">{risk.location}</p>
                </div>
                <div className="text-xs text-gray-500 flex-shrink-0 transform transition-transform">{isOpen ? '▼' : '▶'}</div>
            </header>
            {isOpen && (
                <div className="p-3 pt-0 pl-12 border-t border-[#555555] mt-3">
                    <div className="space-y-4">
                        <div>
                            <h5 className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase">问题描述</h5>
                            <p className="text-xs text-gray-300 bg-[#3c3f41] p-2 rounded-sm leading-relaxed">{risk.description}</p>
                        </div>
                        {risk.codeSnippet && (
                            <div>
                                <h5 className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase">代码片段</h5>
                                <div className="bg-[#2b2b2b] border border-[#555555] rounded-sm p-2 text-xs font-mono overflow-x-auto">
                                    {risk.codeSnippet.lines.map(line => (
                                        <span key={line.number} className={`block whitespace-pre ${line.highlight ? 'bg-red-500/10 border-l-2 border-red-500 pl-1.5 -ml-2' : ''}`}>{line.content}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h5 className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase">影响分析</h5>
                            <ul className="text-xs text-gray-300 bg-[#3c3f41] p-2 rounded-sm leading-relaxed list-disc list-inside">
                                {risk.impact.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-[11px] font-semibold text-gray-500 mb-1.5 uppercase">修复建议</h5>
                            <div className="text-xs text-gray-300 bg-[#3c3f41] p-2 rounded-sm leading-relaxed">
                                <p>{risk.recommendation.text}</p>
                                {risk.recommendation.code && (
                                     <div className="bg-[#2b2b2b] border border-[#555555] rounded-sm p-2 text-xs font-mono overflow-x-auto mt-2">
                                        <span className="block whitespace-pre">{risk.recommendation.code}</span>
                                     </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <button className="px-3 py-1.5 rounded-sm text-xs font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors">💡 查看修复示例</button>
                        {risk.recommendation.code && <button className="px-3 py-1.5 rounded-sm text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">📋 复制建议代码</button>}
                        <button className="px-3 py-1.5 rounded-sm text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">✓ 标记已修复</button>
                    </div>
                </div>
            )}
        </div>
    );
};

const RisksView: React.FC = () => {
    const [openRisk, setOpenRisk] = useState<string | null>(RISKS_DATA[0].title);

    const toggleRisk = (title: string) => {
        setOpenRisk(openRisk === title ? null : title);
    };

    const riskCounts = RISKS_DATA.reduce((acc, risk) => {
        acc[risk.level] = (acc[risk.level] || 0) + 1;
        return acc;
    }, {} as Record<RiskLevel, number>);

    return (
        <div>
            <Section title="📊 扫描结果" className="mb-5">
                <StatusCard>
                    <div className="flex justify-between items-center mb-4">
                        <StatusBadge status="warning" text="发现风险" />
                        <span className="text-[11px] text-gray-500">2024-11-06 14:26:33</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <StatCard value={riskCounts[RiskLevel.High] || 0} label="🔴 高风险" level={RiskLevel.High} />
                        <StatCard value={riskCounts[RiskLevel.Medium] || 0} label="🟠 中风险" level={RiskLevel.Medium} />
                        <StatCard value={riskCounts[RiskLevel.Low] || 0} label="🟡 低风险" level={RiskLevel.Low} />
                    </div>
                </StatusCard>
            </Section>

            <Section title="🚨 风险详情">
                <div>
                    {RISKS_DATA.map(risk => (
                        <RiskItem
                            key={risk.title}
                            risk={risk}
                            isOpen={openRisk === risk.title}
                            onToggle={() => toggleRisk(risk.title)}
                        />
                    ))}
                </div>
            </Section>
            
            <div className="flex gap-2 mt-5">
                <button className="px-4 py-2 rounded-md text-xs font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors">📋 导出完整报告</button>
                <button className="px-4 py-2 rounded-md text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">💬 与 AI 讨论风险</button>
            </div>
        </div>
    );
};

export default RisksView;
