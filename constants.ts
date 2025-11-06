
import { Risk, RiskLevel, TimelineStep } from './types';

export const RISKS_DATA: Risk[] = [
    {
        level: RiskLevel.High,
        title: '支付接口缺少异常处理',
        location: 'PaymentService.java:45',
        description: '方法 processPayment() 调用外部支付接口时未捕获异常,在支付网关故障时可能导致服务崩溃',
        codeSnippet: {
            lines: [
                { number: 43, content: 'public PaymentResult processPayment(Order order) {', highlight: false },
                { number: 44, content: '    // 调用第三方支付接口', highlight: false },
                { number: 45, content: '    PaymentResult result = paymentGateway.pay(order);', highlight: true },
                { number: 46, content: '    return result;', highlight: false },
                { number: 47, content: '}', highlight: false },
            ],
        },
        impact: [
            '支付网关超时或故障时导致整个服务不可用',
            '未捕获异常可能触发级联故障',
            '用户支付失败但无明确错误提示',
            '影响业务可用性和用户体验',
        ],
        recommendation: {
            text: '添加 try-catch 处理支付异常,并返回友好的错误信息:',
            code: `try {
    PaymentResult result = paymentGateway.pay(order);
    return result;
} catch (PaymentException e) {
    log.error("支付失败", e);
    return PaymentResult.failure("支付服务暂时不可用");
}`
        },
    },
    {
        level: RiskLevel.Medium,
        title: '数据库连接未正确关闭',
        location: 'DatabaseHelper.java:128',
        description: '查询方法中的数据库连接在异常情况下未正确关闭,可能导致连接池资源泄漏',
        impact: [
            '高并发场景下连接池可能耗尽',
            '导致后续请求无法获取数据库连接',
            '需要重启服务才能恢复'
        ],
        recommendation: {
            text: '使用 try-with-resources 语句确保连接自动关闭,或在 finally 块中显式关闭连接'
        },
    },
    {
        level: RiskLevel.Medium,
        title: 'HTTP请求缺少超时设置',
        location: 'HttpClient.java:92',
        description: '调用下游服务的 HTTP 请求未设置超时时间,可能导致线程长时间阻塞',
        impact: [
            '下游服务响应慢时线程池耗尽',
            '触发级联故障',
            '系统整体响应时间显著增加'
        ],
        recommendation: {
            text: '设置合理的连接超时和读超时,建议值: connectTimeout=3s, readTimeout=5s'
        },
    }
];

export const SCANNING_TIMELINE_STEPS: TimelineStep[] = [
    { title: '代码变更检测', status: 'completed', time: '已完成 · 2024-11-06 14:23:15' },
    { title: '依赖分析', status: 'completed', time: '已完成 · 2024-11-06 14:23:42' },
    { title: '可靠性风险识别', status: 'running', time: '进行中', details: '已分析 15/23 个文件' },
    { title: '生成扫描报告', status: 'pending', time: '等待中' }
];

export const COMPLETED_TIMELINE_STEPS: TimelineStep[] = [
    { title: '代码变更检测', status: 'completed', time: '已完成 · 2024-11-06 14:23:15' },
    { title: '依赖分析', status: 'completed', time: '已完成 · 2024-11-06 14:23:42' },
    { title: '可靠性风险识别', status: 'completed', time: '已完成 · 2024-11-06 14:26:08' },
    { title: '生成扫描报告', status: 'completed', time: '已完成 · 2024-11-06 14:26:33' }
];
