
import React from 'react';
import Section, { StatusCard } from '../ui/Section';
import StatusBadge from '../ui/StatusBadge';

interface UnreadViewProps {
    onViewReport: () => void;
}

const UnreadView: React.FC<UnreadViewProps> = ({ onViewReport }) => {
    return (
        <div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 border border-blue-500 rounded-md p-3 mb-4 flex items-center gap-3">
                <div className="text-3xl flex-shrink-0">📬</div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white mb-1">您有 1 个未读的扫描报告</h3>
                    <p className="text-[11px] text-blue-100">上次提交(2小时前)发现 3 个风险,建议查看</p>
                </div>
            </div>

            <Section title="📊 上次扫描结果">
                <StatusCard>
                    <div className="flex justify-between items-center mb-4">
                        <StatusBadge status="warning" text="发现风险" />
                        <span className="text-[11px] text-gray-500">2024-11-06 12:15:28</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                         <div className="bg-[#43454a] border border-[#555555] rounded-md p-3 text-center">
                            <div className="text-2xl font-bold mb-1 text-red-500">1</div>
                            <div className="text-[11px] text-gray-500">🔴 高风险</div>
                        </div>
                        <div className="bg-[#43454a] border border-[#555555] rounded-md p-3 text-center">
                            <div className="text-2xl font-bold mb-1 text-yellow-500">2</div>
                            <div className="text-[11px] text-gray-500">🟠 中风险</div>
                        </div>
                        <div className="bg-[#43454a] border border-[#555555] rounded-md p-3 text-center">
                            <div className="text-2xl font-bold mb-1 text-yellow-300">0</div>
                            <div className="text-[11px] text-gray-500">🟡 低风险</div>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <button onClick={onViewReport} className="px-4 py-2 rounded-md text-xs font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors">
                            📄 查看详细报告
                        </button>
                        <button className="px-4 py-2 rounded-md text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">
                            ⏭️ 稍后处理
                        </button>
                    </div>
                </StatusCard>
            </Section>
        </div>
    );
};

export default UnreadView;
