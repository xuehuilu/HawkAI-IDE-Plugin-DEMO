import React, { useState, useEffect, useCallback } from 'react';
import { ActiveTab, ScanState, Toast as ToastType, Risk } from './types';
import Toolbar from './components/Toolbar';
import Tabs from './components/Tabs';
import Toast from './components/Toast';
import DemoControls from './components/DemoControls';

import LoginView from './components/views/LoginView';
import ReadyView from './components/views/ReadyView';
import ScanningView from './components/views/ScanningView';
import SuccessView from './components/views/SuccessView';
import RisksView from './components/views/RisksView';
import ErrorView from './components/views/ErrorView';
import TimeoutView from './components/views/TimeoutView';
import UnreadView from './components/views/UnreadView';
import SettingsView from './components/views/SettingsView';
import ChatView from './components/views/ChatView';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Scan);
    const [scanState, setScanState] = useState<ScanState>(ScanState.Login);
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const [hasUnread, setHasUnread] = useState(true);
    const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
    let toastCounter = 0;

    const hideToast = (id: number) => {
        setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    };
    
    const showToast = useCallback((toast: Omit<ToastType, 'id'>) => {
        const id = toastCounter++;
        setToasts(currentToasts => [...currentToasts, { ...toast, id }]);
    }, [toastCounter]);

    const handleSetScanState = useCallback((newState: ScanState) => {
        // Clear only non-feedback toasts on state change
        setToasts(currentToasts => currentToasts.filter(t => t.title.includes('反馈')));
        setScanState(newState);

        if (newState !== ScanState.Login) {
            setActiveTab(ActiveTab.Scan);
        }

        switch (newState) {
            case ScanState.Start:
                setScanState(ScanState.Ready); // Show ready view but trigger toast
                showToast({ type: 'info', title: 'HawkAI 正在后台扫描', message: '代码已提交,可靠性扫描已启动<br>预计需要 2-3 分钟', actions: [{ label: '查看状态', primary: true, onClick: () => handleSetScanState(ScanState.Scanning) }] });
                break;
            case ScanState.Scanning:
                setHasUnread(false);
                break;
            case ScanState.Success:
                setHasUnread(false);
                showToast({ type: 'success', title: '✅ 扫描完成 - 未发现风险', message: '本次提交代码可靠性良好<br>扫描耗时: 2分15秒' });
                break;
            case ScanState.Risks:
                setHasUnread(true);
                showToast({ type: 'warning', title: '⚠️ 发现 3 个可靠性风险', message: '🔴 高风险 1个  🟠 中风险 2个<br>建议立即查看并处理', actions: [{ label: '立即查看', primary: true, onClick: () => hideToast(toasts[toasts.length - 1]?.id) }] });
                break;
            case ScanState.Error:
                setHasUnread(false);
                showToast({ type: 'error', title: '❌ 扫描失败', message: '无法连接到 HawkAI 服务<br>请检查网络或稍后重试', actions: [{ label: '重试', primary: true, onClick: () => handleSetScanState(ScanState.Scanning) }] });
                break;
            case ScanState.Timeout:
                 setHasUnread(false);
                 showToast({ type: 'warning', title: '⏱️ 扫描超时提醒', message: '扫描已运行 10 分钟<br>可能是代码变更较大导致', actions: [{ label: '继续等待', primary: true, onClick: () => hideToast(toasts[toasts.length - 1]?.id)}, {label: '取消', primary: false, onClick: () => handleSetScanState(ScanState.Ready)}]});
                 break;
            case ScanState.Unread:
                 setHasUnread(true);
                 showToast({ type: 'info', title: '📬 您有未读的扫描报告', message: '上次提交(2小时前)发现 3 个风险', actions: [{ label: '立即查看', primary: true, onClick: () => handleSetScanState(ScanState.Risks)}] });
                 break;
        }
    }, [showToast, toasts]);
    
    const handleLoginSuccess = () => {
        showToast({ type: 'success', title: '✅ 连接成功', message: '已成功连接到 HawkAI 服务' });
        if (hasUnread) {
            handleSetScanState(ScanState.Unread);
        } else {
            handleSetScanState(ScanState.Ready);
        }
    };

    const handleSwitchTab = (tab: ActiveTab) => {
        if(scanState === ScanState.Login) return;
        setActiveTab(tab);
        if(tab === ActiveTab.Scan) {
           setHasUnread(false);
        }
    };
    
    const handleStartChat = (risk: Risk) => {
        setSelectedRisk(risk);
        setActiveTab(ActiveTab.Chat);
    };

    const handleCloseChat = () => {
        setSelectedRisk(null);
        setActiveTab(ActiveTab.Scan);
    };

    const renderContent = () => {
        if (activeTab === ActiveTab.Settings) {
            return <SettingsView />;
        }
        if (activeTab === ActiveTab.Chat && selectedRisk) {
            return <ChatView risk={selectedRisk} showToast={showToast} />;
        }

        switch (scanState) {
            case ScanState.Login: return <LoginView onLoginSuccess={handleLoginSuccess} />;
            case ScanState.Ready: return <ReadyView />;
            case ScanState.Scanning: return <ScanningView />;
            case ScanState.Success: return <SuccessView />;
            case ScanState.Risks: return <RisksView showToast={showToast} onStartChat={handleStartChat} />;
            case ScanState.Error: return <ErrorView onRetry={() => handleSetScanState(ScanState.Scanning)} />;
            case ScanState.Timeout: return <TimeoutView onCancel={() => handleSetScanState(ScanState.Ready)} />;
            case ScanState.Unread: return <UnreadView onViewReport={() => handleSetScanState(ScanState.Risks)} />;
            default: return <RisksView showToast={showToast} onStartChat={handleStartChat} />;
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-[450px] min-h-[600px] bg-[#3c3f41] border border-[#555555] rounded-md flex flex-column shadow-lg mx-auto flex-col">
                <Toolbar onSettingsClick={() => handleSwitchTab(ActiveTab.Settings)} />
                <Tabs 
                    activeTab={activeTab} 
                    setActiveTab={handleSwitchTab} 
                    hasUnread={hasUnread}
                    showChatTab={!!selectedRisk}
                    onCloseChat={handleCloseChat}
                />
                <div className="flex-1 overflow-y-auto p-4 bg-[#3c3f41]">
                    {renderContent()}
                </div>
            </div>
             <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
                {toasts.map(toast => (
                    <Toast key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
                ))}
            </div>
            <DemoControls setScanState={handleSetScanState} currentState={scanState} setTab={setActiveTab}/>
        </div>
    );
};

export default App;