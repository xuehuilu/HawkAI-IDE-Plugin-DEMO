import React from 'react';
import { Toast } from '../../types';

interface CodeBlockProps {
    code: string;
    showToast: (toast: Omit<Toast, 'id'>) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, showToast }) => {
    const handleApplyFix = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        // In a real IDE, this would apply the code. Here we simulate it.
        navigator.clipboard.writeText(code);
        showToast({
            type: 'success',
            title: '✅ 代码已应用',
            message: '修复建议已应用到您的工作区',
            autoClose: true,
        });
    };

    return (
        <div className="relative bg-[#2b2b2b] border border-[#555555] rounded-sm p-2 text-xs font-mono overflow-x-auto mt-2">
            <button
                className="absolute top-1.5 right-1.5 bg-green-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm hover:bg-green-500 transition-colors flex items-center gap-1 z-10"
                title="将修复建议应用到工作区"
                onClick={handleApplyFix}
            >
                ✨ 一键修复
            </button>
            <span className="block whitespace-pre pt-6">{code}</span>
        </div>
    );
};

export default CodeBlock;
