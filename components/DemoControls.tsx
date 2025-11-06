import React from 'react';
import { ScanState, ActiveTab } from '../types';

interface DemoControlsProps {
    setScanState: (state: ScanState) => void;
    currentState: ScanState;
    setTab: (tab: ActiveTab) => void;
}

const DemoButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => {
    const activeClasses = 'bg-green-600 text-white';
    const inactiveClasses = 'bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white';
    return (
        <button
            onClick={onClick}
            className={`block w-full text-left px-3 py-2 mb-1.5 rounded-md text-xs cursor-pointer transition-colors ${isActive ? activeClasses : inactiveClasses}`}
        >
            {children}
        </button>
    );
};

const DemoControls: React.FC<DemoControlsProps> = ({ setScanState, currentState, setTab }) => {
    return (
        <div className="fixed bottom-5 right-5 bg-[#43454a] border border-[#555555] rounded-md p-4 shadow-xl z-40 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xs font-semibold text-gray-300 mb-3">🎮 用户旅程演示</h3>
            
            <div className="mb-4">
                <h4 className="text-[11px] text-gray-500 mb-2 uppercase font-semibold">📋 核心流程</h4>
                <DemoButton onClick={() => setScanState(ScanState.Login)} isActive={currentState === ScanState.Login}>0. 登录/连接</DemoButton>
                <DemoButton onClick={() => setScanState(ScanState.Ready)} isActive={currentState === ScanState.Ready}>1. 准备阶段（等待提交）</DemoButton>
                <DemoButton onClick={() => setScanState(ScanState.Start)} isActive={false}>2. 触发扫描（Toast提示）</DemoButton>
                <DemoButton onClick={() => setScanState(ScanState.Scanning)} isActive={currentState === ScanState.Scanning}>3. 扫描进行中（队列）</DemoButton>
                <DemoButton onClick={() => setScanState(ScanState.Risks)} isActive={currentState === ScanState.Risks}>4. 发现风险（完整报告）</DemoButton>
                <DemoButton onClick={() => setScanState(ScanState.Success)} isActive={currentState === ScanState.Success}>5. 无风险（自动消失）</DemoButton>
            </div>

            <div className="mb-4">
                <h4 className="text-[11px] text-gray-500 mb-2 uppercase font-semibold">⚠️ 异常场景</h4>
                <DemoButton onClick={() => setScanState(ScanState.Error)} isActive={currentState === ScanState.Error}>扫描失败</DemoButton>
                <DemoButton onClick={() => setScanState(ScanState.Timeout)} isActive={currentState === ScanState.Timeout}>扫描超时</DemoButton>
                <DemoButton onClick={() => setScanState(ScanState.Unread)} isActive={currentState === ScanState.Unread}>IDE重启（未读报告）</DemoButton>
            </div>

            <div>
                <h4 className="text-[11px] text-gray-500 mb-2 uppercase font-semibold">⚙️ 其他</h4>
                <DemoButton onClick={() => setTab(ActiveTab.Settings)} isActive={false}>配置面板</DemoButton>
            </div>
        </div>
    );
};

export default DemoControls;