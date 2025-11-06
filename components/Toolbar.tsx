
import React from 'react';

interface IconButtonProps {
    title: string;
    children: React.ReactNode;
    onClick?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ title, children, onClick }) => (
    <button
        title={title}
        onClick={onClick}
        className="w-6 h-6 border-none bg-transparent cursor-pointer rounded-sm flex items-center justify-center text-base hover:bg-[#555555]"
    >
        {children}
    </button>
);

interface ToolbarProps {
    onSettingsClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSettingsClick }) => {
    return (
        <div className="flex justify-between items-center p-2 px-3 border-b border-[#555555] bg-[#43454a]">
            <div className="flex flex-col gap-0.5">
                <h1 className="font-semibold text-sm text-gray-300">🦅 HawkAI 可靠性扫描</h1>
                <p className="text-xs text-gray-500 font-mono">feature/payment-refactor</p>
            </div>
            <div className="flex gap-1">
                <IconButton title="刷新">🔄</IconButton>
                <IconButton title="设置" onClick={onSettingsClick}>⚙️</IconButton>
            </div>
        </div>
    );
};

export default Toolbar;
