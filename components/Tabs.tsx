import React from 'react';
import { ActiveTab } from '../types';

interface TabProps {
    label: string;
    isActive: boolean;
    hasBadge?: boolean;
    onClick: () => void;
    onClose?: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, hasBadge, onClick, onClose }) => {
    const activeClasses = 'border-b-2 border-green-600 bg-[#3c3f41] font-semibold text-white';
    const inactiveClasses = 'border-b-2 border-transparent text-gray-300';

    return (
        <div
            onClick={onClick}
            className={`relative flex items-center group px-4 py-2.5 cursor-pointer text-xs transition-all duration-200 hover:bg-[#555555] ${isActive ? activeClasses : inactiveClasses}`}
        >
            <span>{label}</span>
            {hasBadge && (
                <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    1
                </span>
            )}
             {onClose && (
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="ml-2 w-4 h-4 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#666] hover:text-white transition-colors"
                    title="关闭"
                >
                    ✕
                </button>
            )}
        </div>
    );
};

interface TabsProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    hasUnread: boolean;
    showChatTab: boolean;
    onCloseChat: () => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, hasUnread, showChatTab, onCloseChat }) => {
    return (
        <div className="flex border-b border-[#555555] bg-[#43454a]">
            <Tab
                label="扫描状态"
                isActive={activeTab === ActiveTab.Scan}
                hasBadge={hasUnread}
                onClick={() => setActiveTab(ActiveTab.Scan)}
            />
             {showChatTab && (
                <Tab
                    label="与 AI 讨论"
                    isActive={activeTab === ActiveTab.Chat}
                    onClick={() => setActiveTab(ActiveTab.Chat)}
                    onClose={onCloseChat}
                />
            )}
            <Tab
                label="配置"
                isActive={activeTab === ActiveTab.Settings}
                onClick={() => setActiveTab(ActiveTab.Settings)}
            />
        </div>
    );
};

export default Tabs;