
import React, { useState, useEffect } from 'react';
import Section, { StatusCard } from '../ui/Section';
import StatusBadge from '../ui/StatusBadge';
import Timeline from '../ui/Timeline';
import { SCANNING_TIMELINE_STEPS } from '../../constants';

const ScanningView: React.FC = () => {
    const [progress, setProgress] = useState(65);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.random() * 8;
                return newProgress > 100 ? 100 : newProgress;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-md p-2.5 px-3 mb-4 text-xs text-blue-400 flex items-center gap-2">
                <span>📦</span>
                <span><strong>2 个扫描任务</strong>进行中，当前处理: payment-service</span>
            </div>
            <Section title="📊 当前扫描">
                <StatusCard>
                    <div className="flex justify-between items-center mb-4">
                        <StatusBadge status="scanning" text="扫描进行中" />
                        <span className="text-[11px] text-gray-500">预计还需 1分30秒</span>
                    </div>

                    <div className="mb-3">
                        <div className="w-full h-1.5 bg-[#555555] rounded-full overflow-hidden mb-2">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-[size:200%_100%] animate-shimmer"
                                style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-gray-500">
                            <span>正在分析可靠性风险...</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="text-blue-400 font-mono text-[11px] mt-1">📄 当前分析: src/payment/PaymentService.java</div>
                    </div>

                    <Timeline steps={SCANNING_TIMELINE_STEPS} />
                </StatusCard>
            </Section>

            <div className="text-center pt-10 px-5">
                <div className="text-5xl mb-4 opacity-60">⏳</div>
                <h3 className="text-base font-semibold text-gray-300 mb-2">扫描进行中</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    HawkAI 正在深度分析您的代码变更<br/>
                    您可以继续开发,扫描完成后将自动通知您
                </p>
            </div>
        </>
    );
};

export default ScanningView;
