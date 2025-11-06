import React from 'react';

interface LoginViewProps {
    onLoginSuccess: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const handleConnect = () => {
        // In a real app, authentication would happen here.
        onLoginSuccess();
    };

    return (
        <div className="text-center py-20 px-5 flex flex-col items-center h-full justify-center">
            <div className="text-6xl mb-4">🦅</div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">欢迎使用 HawkAI</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs mb-6">
                连接到 HawkAI 服务以开始使用智能可靠性扫描。您的身份信息将用于同步配置和优化扫描模型。
            </p>
            <div className="w-full max-w-xs">
                <button
                    onClick={handleConnect}
                    className="w-full px-4 py-2.5 rounded-md text-sm font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors shadow-lg"
                >
                    🔗 连接到 HawkAI 服务
                </button>
            </div>
            <p className="mt-4 text-[11px] text-gray-600">我们尊重您的隐私，不会上传任何源代码。</p>
        </div>
    );
};

export default LoginView;