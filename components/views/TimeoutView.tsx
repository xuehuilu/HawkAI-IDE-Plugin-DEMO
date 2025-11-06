
import React from 'react';
import Section, { StatusCard } from '../ui/Section';
import StatusBadge from '../ui/StatusBadge';

interface TimeoutViewProps {
    onCancel: () => void;
}

const TimeoutView: React.FC<TimeoutViewProps> = ({ onCancel }) => {
    return (
        <Section title="📊 扫描状态">
            <StatusCard>
                <div className="flex justify-between items-center">
                    <StatusBadge status="timeout" text="扫描超时" />
                    <span className="text-[11px] text-gray-500">运行时间: 10分32秒</span>
                </div>

                <div className="text-center py-10 px-5">
                    <div className="text-6xl mb-4">⏰</div>
                    <h3 className="text-base font-semibold text-yellow-400 mb-2">扫描时间超出预期</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        可能原因: 本次代码变更较大(共 156 个文件)<br />
                        您可以选择继续等待或取消本次扫描
                    </p>
                </div>

                <div className="flex gap-2 justify-center">
                    <button className="px-4 py-2 rounded-md text-xs font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors">
                        ⏳ 继续等待
                    </button>
                    <button onClick={onCancel} className="px-4 py-2 rounded-md text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">
                        ❌ 取消扫描
                    </button>
                </div>
            </StatusCard>
        </Section>
    );
};

export default TimeoutView;
