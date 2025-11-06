
import React from 'react';
import { ActiveTab } from '../types';

interface TabProps {
    label: string;
    isActive: boolean;
    hasBadge?: boolean;
    onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, hasBadge, onClick }) => {
    const activeClasses = 'border-b-2 border-green-600 bg-[#3c3f41] font-semibold text-white';
    const inactiveClasses = 'border-b-2 border-transparent text-gray-300';

    return (
        <div
            onClick={onClick}
            className={`relative px-4 py-2.5 cursor-pointer text-xs transition-all duration-200 hover:bg-[#555555] ${isActive ? activeClasses : inactiveClasses}`}
        >
            {label}
            {hasBadge && (
                <span className="absolute top-1.5 right-1.5 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    1
                </span>
            )}
        </div>
    );
};

interface TabsProps {
    activeTab: ActiveTab;
    setActiveTab: (tab: ActiveTab) => void;
    hasUnread: boolean;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, hasUnread }) => {
    return (
        <div className="flex border-b border-[#555555] bg-[#43454a]">
            <Tab
                label="扫描状态"
                isActive={activeTab === ActiveTab.Scan}
                hasBadge={hasUnread}
                onClick={() => setActiveTab(ActiveTab.Scan)}
            />
            <Tab
                label="历史记录"
                isActive={activeTab === ActiveTab.History}
                onClick={() => setActiveTab(ActiveTab.History)}
            />
            <Tab
                label="配置"
                isActive={activeTab === ActiveTab.Settings}
                onClick={() => setActiveTab(ActiveTab.Settings)}
            />
        </div>
    );
};

export default Tabs;
