import React from 'react';

const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-[#43454a] border border-[#555555] rounded-md p-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">{title}</h3>
        {children}
    </div>
);

const SettingItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center py-2 border-b border-[#555555] last:border-none">
        {children}
    </div>
);

const Checkbox: React.FC<{ id: string; label: string; defaultChecked?: boolean; disabled?: boolean }> = ({ id, label, defaultChecked, disabled }) => (
    <>
        <input type="checkbox" id={id} defaultChecked={defaultChecked} disabled={disabled} className="w-4 h-4 mr-2 cursor-pointer accent-green-600 bg-gray-700 border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" />
        <label htmlFor={id} className={`flex-1 text-xs text-gray-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>{label}</label>
    </>
);

const Radio: React.FC<{ id: string; name: string; label: string; defaultChecked?: boolean; disabled?: boolean }> = ({ id, name, label, defaultChecked, disabled }) => (
     <div className="flex items-center">
        <input type="radio" name={name} id={id} defaultChecked={defaultChecked} disabled={disabled} className="w-3.5 h-3.5 mr-2 cursor-pointer accent-green-600 bg-gray-700 border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" />
        <label htmlFor={id} className={`text-xs text-gray-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>{label}</label>
    </div>
);


const SettingsView: React.FC = () => {
    return (
        <div>
            <SettingsSection title="🔔 通知偏好">
                <SettingItem><Checkbox id="notify-start" label="扫描开始时提醒" /></SettingItem>
                <SettingItem><Checkbox id="notify-complete" label="扫描完成时提醒" defaultChecked /></SettingItem>
                <SettingItem><Checkbox id="notify-risk-only" label="仅在发现风险时通知" defaultChecked /></SettingItem>
                <SettingItem><Checkbox id="sound-enabled" label="启用声音提示" /></SettingItem>
            </SettingsSection>

            <SettingsSection title="🔍 扫描策略">
                <SettingItem><Checkbox id="scan-changed-only" label="仅扫描变更的文件" defaultChecked /></SettingItem>
                <SettingItem><Checkbox id="scan-full-project" label="扫描整个项目" disabled /></SettingItem>
                <div className="flex flex-col gap-2 mt-3">
                   <Radio id="auto-trigger" name="trigger" label="自动扫描（提交时触发）" defaultChecked />
                   <Radio id="manual-trigger" name="trigger" label="手动触发" disabled />
                </div>
            </SettingsSection>
            
            <SettingsSection title="⚠️ 风险阈值">
                <div className="flex flex-col gap-2">
                    <Radio id="all-risks" name="threshold" label="显示所有风险" defaultChecked />
                    <Radio id="medium-high" name="threshold" label="仅显示中高风险" />
                    <Radio id="high-only" name="threshold" label="仅显示高风险" />
                </div>
            </SettingsSection>

            <SettingsSection title="🔗 服务配置">
                <label className="text-xs text-gray-300 mb-2 block">HawkAI 服务地址</label>
                <input 
                    type="text" 
                    defaultValue="https://api.hawkai.com"
                    className="w-full p-1.5 px-2 bg-[#2b2b2b] border border-[#555555] rounded-sm text-gray-300 text-xs font-mono"
                />
            </SettingsSection>

            <div className="flex gap-2 mt-5">
                <button className="px-4 py-2 rounded-md text-xs font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors">💾 保存设置</button>
                <button className="px-4 py-2 rounded-md text-xs font-semibold bg-[#555555] text-gray-300 hover:bg-[#666666] hover:text-white transition-colors">↩️ 恢复默认</button>
            </div>
        </div>
    );
};

export default SettingsView;