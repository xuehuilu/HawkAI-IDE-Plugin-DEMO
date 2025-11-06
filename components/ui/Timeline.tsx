
import React from 'react';
import { TimelineStep } from '../../types';

interface TimelineItemProps {
    step: TimelineStep;
    isLast: boolean;
}

const iconMap = {
    completed: '✓',
    running: '⟳',
    pending: '⏳',
};

const TimelineItem: React.FC<TimelineItemProps> = ({ step, isLast }) => {
    const isCompleted = step.status === 'completed';
    const isRunning = step.status === 'running';

    const iconBg = isCompleted ? 'bg-green-500' : isRunning ? 'bg-blue-500' : 'bg-[#555555]';
    const iconColor = (isCompleted || isRunning) ? 'text-white' : 'text-gray-400';
    const lineBg = isCompleted ? 'bg-green-500' : 'bg-[#555555]';

    return (
        <div className="relative flex items-start gap-3">
            {!isLast && (
                <div className={`absolute left-3 top-7 w-0.5 h-full ${lineBg}`}></div>
            )}
            <div
                className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${iconBg} ${iconColor} ${isRunning ? 'animate-pulse-custom' : ''}`}
            >
                {iconMap[step.status]}
            </div>
            <div className="flex-1">
                <p className="text-xs font-semibold text-gray-300 mb-1">{step.title}</p>
                <p className="text-[11px] text-gray-500">
                    {step.time}
                    {step.details && ` · ${step.details}`}
                </p>
            </div>
        </div>
    );
};

interface TimelineProps {
    steps: TimelineStep[];
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
    return (
        <div className="mt-4 flex flex-col gap-4">
            {steps.map((step, index) => (
                <TimelineItem key={index} step={step} isLast={index === steps.length - 1} />
            ))}
        </div>
    );
};

export default Timeline;
