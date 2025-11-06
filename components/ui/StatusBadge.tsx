
import React from 'react';

type StatusType = 'scanning' | 'success' | 'warning' | 'error' | 'timeout';

interface StatusBadgeProps {
    status: StatusType;
    text: string;
}

const statusConfig = {
    scanning: {
        bgColor: 'bg-blue-500/20',
        textColor: 'text-blue-400',
        borderColor: 'border-blue-500/40',
        icon: '⏳',
    },
    success: {
        bgColor: 'bg-green-500/20',
        textColor: 'text-green-400',
        borderColor: 'border-green-500/40',
        icon: '✓',
    },
    warning: {
        bgColor: 'bg-yellow-500/20',
        textColor: 'text-yellow-400',
        borderColor: 'border-yellow-500/40',
        icon: '⚠️',
    },
    error: {
        bgColor: 'bg-red-500/20',
        textColor: 'text-red-400',
        borderColor: 'border-red-500/40',
        icon: '❌',
    },
    timeout: {
        bgColor: 'bg-yellow-500/20',
        textColor: 'text-yellow-400',
        borderColor: 'border-yellow-500/40',
        icon: '⏱️',
    },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text }) => {
    const config = statusConfig[status];

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bgColor} ${config.textColor} ${config.borderColor}`}
        >
            <span>{config.icon}</span>
            <span>{text}</span>
        </span>
    );
};

export default StatusBadge;
