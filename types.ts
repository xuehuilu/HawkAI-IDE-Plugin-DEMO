
export enum ActiveTab {
    Scan = 'scan',
    History = 'history',
    Settings = 'settings',
}

export enum ScanState {
    Ready = 'ready',
    Start = 'start',
    Scanning = 'scanning-queue',
    Success = 'success',
    Risks = 'risks',
    Error = 'error',
    Timeout = 'timeout',
    Unread = 'unread',
}

export enum RiskLevel {
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
}

export interface Risk {
    level: RiskLevel;
    title: string;
    location: string;
    description: string;
    codeSnippet?: {
        lines: { number: number; content: string; highlight: boolean }[];
    };
    impact: string[];
    recommendation: {
        text: string;
        code?: string;
    };
}

export interface ToastAction {
    label: string;
    onClick: () => void;
    primary?: boolean;
}

export interface Toast {
    id: number;
    type: 'success' | 'warning' | 'info' | 'error';
    title: string;
    message: string;
    actions?: ToastAction[];
    autoClose?: boolean;
}

export interface TimelineStep {
    title: string;
    status: 'completed' | 'running' | 'pending';
    time: string;
    details?: string;
}
