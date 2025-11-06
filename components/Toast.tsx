
import React, { useEffect, useState } from 'react';
import { Toast as ToastType } from '../types';

interface ToastProps extends ToastType {
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, title, message, actions, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300);
    };

    const typeClasses = {
        success: 'border-l-4 border-green-500',
        warning: 'border-l-4 border-yellow-500',
        info: 'border-l-4 border-blue-500',
        error: 'border-l-4 border-red-500',
    };

    const icons = {
        success: '✅',
        warning: '⚠️',
        info: '💡',
        error: '❌',
    };

    return (
        <div
            className={`bg-[#43454a] border border-[#555555] rounded-md p-4 shadow-xl flex items-start gap-3 min-w-[320px] max-w-[400px] transition-all duration-300 ease-in-out ${typeClasses[type]} ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
        >
            <div className="text-2xl flex-shrink-0 mt-1">{icons[type]}</div>
            <div className="flex-1">
                <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
                <p className="text-xs text-gray-300 leading-snug" dangerouslySetInnerHTML={{ __html: message }}></p>
                {actions && (
                    <div className="flex gap-2 mt-3">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className={`px-2.5 py-1 rounded-sm text-xs font-semibold transition-colors ${action.primary ? 'bg-green-600 text-white hover:bg-green-500' : 'bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white'}`}
                            >
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <button
                onClick={handleClose}
                className="w-5 h-5 border-none bg-transparent cursor-pointer text-gray-500 text-lg flex items-center justify-center rounded-sm flex-shrink-0 hover:bg-[#555555] hover:text-white"
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;
