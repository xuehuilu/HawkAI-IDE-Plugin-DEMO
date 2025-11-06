
import React from 'react';

interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
    return (
        <div className={className}>
            <h2 className="text-sm font-semibold text-gray-300 mb-3">{title}</h2>
            {children}
        </div>
    );
};

export const StatusCard: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div className="bg-[#43454a] border border-[#555555] rounded-md p-4">
            {children}
        </div>
    )
}

export default Section;
