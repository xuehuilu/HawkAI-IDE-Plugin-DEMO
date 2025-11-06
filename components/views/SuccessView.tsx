
import React from 'react';
import Section, { StatusCard } from '../ui/Section';
import StatusBadge from '../ui/StatusBadge';
import Timeline from '../ui/Timeline';
import { COMPLETED_TIMELINE_STEPS } from '../../constants';

const SuccessView: React.FC = () => {
    return (
        <Section title="📊 扫描结果">
            <StatusCard>
                <div className="flex justify-between items-center">
                    <StatusBadge status="success" text="扫描完成" />
                    <span className="text-[11px] text-gray-500">2024-11-06 14:26:33</span>
                </div>

                <div className="text-center py-10 px-5">
                    <div className="text-6xl mb-4">✅</div>
                    <h3 className="text-lg font-semibold text-green-400 mb-2">未发现可靠性风险</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        本次代码变更已通过所有可靠性检查<br />
                        共分析 <strong>23 个文件</strong>，<strong>187 行代码</strong><br />
                        扫描耗时: <strong>2分15秒</strong>
                    </p>
                </div>

                <Timeline steps={COMPLETED_TIMELINE_STEPS} />

                <div className="flex gap-2 mt-5">
                    <button className="px-4 py-2 rounded-md text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">
                        📋 查看详细报告
                    </button>
                </div>
            </StatusCard>
        </Section>
    );
};

export default SuccessView;
