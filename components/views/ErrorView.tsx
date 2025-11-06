
import React from 'react';
import Section, { StatusCard } from '../ui/Section';
import StatusBadge from '../ui/StatusBadge';

interface ErrorViewProps {
    onRetry: () => void;
}

const ErrorView: React.FC<ErrorViewProps> = ({ onRetry }) => {
    return (
        <Section title="📊 扫描状态">
            <StatusCard>
                <div className="flex justify-between items-center">
                    <StatusBadge status="error" text="扫描失败" />
                    <span className="text-[11px] text-gray-500">2024-11-06 14:28:15</span>
                </div>

                <div className="text-center py-10 px-5">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-base font-semibold text-red-400 mb-2">扫描服务连接失败</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        无法连接到 HawkAI 扫描服务<br />
                        请检查网络连接或稍后重试
                    </p>
                </div>

                <div className="flex gap-2 justify-center">
                    <button onClick={onRetry} className="px-4 py-2 rounded-md text-xs font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors">
                        🔄 重新扫描
                    </button>
                    <button className="px-4 py-2 rounded-md text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">
                        📄 查看日志
                    </button>
                    <button className="px-4 py-2 rounded-md text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">
                        ⏭️ 跳过本次
                    </button>
                </div>
            </StatusCard>
        </Section>
    );
};

export default ErrorView;
