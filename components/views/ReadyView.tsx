
import React from 'react';

const ReadyView: React.FC = () => {
    return (
        <div className="text-center py-20 px-5">
            <div className="text-6xl mb-4 opacity-60">🔍</div>
            <h3 className="text-base font-semibold text-gray-300 mb-2">就绪状态</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
                当前分支 <span className="font-mono text-green-500 font-semibold">feature/payment-refactor</span><br />
                提交代码后将自动触发可靠性扫描
            </p>
            <p className="mt-4 text-[11px] text-gray-600">⚡ 扫描不会阻塞您的提交流程</p>
        </div>
    );
};

export default ReadyView;
