import React, { useState, useEffect, useRef } from 'react';
import { Risk, Toast } from '../../types';
import CodeBlock from '../ui/CodeBlock';

interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
    code?: string;
    isTyping?: boolean;
}

interface ChatViewProps {
    risk: Risk;
    showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ChatView: React.FC<ChatViewProps> = ({ risk, showToast }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        setMessages([
            {
                sender: 'ai',
                text: `你好！我们来一起看看 “${risk.title}” 这个风险。你想详细了解它、分析其影响，还是直接寻找最佳修复方案？请随时提问。`,
            }
        ]);
    }, [risk]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { sender: 'user', text: input };
        const updatedMessages: ChatMessage[] = [...messages, userMessage, { sender: 'ai', text: '', isTyping: true }];
        setMessages(updatedMessages);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            let aiResponse: ChatMessage;
            if (input.includes('解释') || input.includes('为什么')) {
                aiResponse = { sender: 'ai', text: `当然。这个风险的核心在于 “${risk.description}” 这段描述中提到的问题。具体来说，当外部依赖（比如支付网关）出现问题时，如果没有恰当的错误处理机制，异常会沿着调用栈向上传播，最终可能导致处理请求的线程崩溃。在高并发场景下，这会迅速耗尽线程池资源，造成整个服务不可用。这就是所谓的“级联故障”。` };
            } else if (input.includes('其他') || input.includes('别的方案')) {
                aiResponse = { sender: 'ai', text: '这是一个很好的问题。除了推荐的 `try-catch` 方案，你还可以考虑使用断路器模式（Circuit Breaker Pattern），例如使用 Resilience4j 库。这种模式可以在检测到连续失败后，在一段时间内“断开”对下游服务的调用，防止雪崩效应。这是一个更健壮的方案，代码示例如下：', code: `// 使用 Resilience4j 的 @CircuitBreaker 注解
@CircuitBreaker(name = "paymentGateway", fallbackMethod = "paymentFallback")
public PaymentResult processPayment(Order order) {
    return paymentGateway.pay(order);
}

public PaymentResult paymentFallback(Order order, Throwable t) {
    log.warn("支付服务断路器已开启", t);
    return PaymentResult.failure("支付服务暂时不可用，请稍后再试");
}` };
            } else {
                aiResponse = { sender: 'ai', text: `关于你提到的：“${input}”，我理解你的想法。在当前上下文中，我们最关注的是服务的稳定性。原始建议中的 \`try-catch\` 是最直接、最简单的修复方式，能有效阻止异常扩散。如果你希望实现更复杂的逻辑，比如重试或服务降级，我们可以进一步探讨。` };
            }
             setMessages([...messages, userMessage, aiResponse]);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Context Header */}
            <div className="p-3 border-b border-[#555555] bg-[#43454a] flex-shrink-0">
                 <h3 className="text-sm font-semibold text-gray-300 mb-1.5">
                    <span className="text-gray-500">讨论上下文: </span>
                    <span>{risk.title}</span>
                </h3>
                <p className="text-xs text-gray-500 font-mono mb-2">{risk.location}</p>
                <p className="text-xs text-gray-400 bg-[#2b2b2b] p-2 rounded-sm leading-relaxed">{risk.description}</p>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-3 items-start ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender === 'ai' && <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-1">🦅</div>}
                        <div className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${msg.sender === 'ai' ? 'bg-[#43454a]' : 'bg-blue-600 text-white'}`}>
                            {msg.isTyping ? (
                                <div className="flex items-center gap-1.5 py-1">
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                                </div>
                            ) : (
                                <p className={msg.sender === 'ai' ? 'text-gray-300' : 'text-white'}>{msg.text}</p>
                            )}
                            {msg.code && <CodeBlock code={msg.code} showToast={showToast} />}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#555555] bg-[#43454a] flex-shrink-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="请详细描述您的问题..."
                        className="flex-1 px-3 py-2 rounded-md text-sm bg-[#2b2b2b] border border-[#555555] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-green-600"
                    />
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 rounded-md text-sm font-semibold bg-green-600 text-white hover:bg-green-500 transition-colors disabled:bg-gray-600"
                        disabled={!input.trim()}
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatView;