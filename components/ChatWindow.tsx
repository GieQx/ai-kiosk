
import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import VirtualKeyboard from './VirtualKeyboard';
import Icon from './Icon';

interface ChatWindowProps {
  messages: Message[];
  inputText: string;
  isBotTyping: boolean;
  onInput: (char: string) => void;
  onBackspace: () => void;
  onEnter: () => void;
}

const ChatBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === 'user';
    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3xl px-6 py-4 rounded-3xl animate-fade-in-up ${isUser ? 'bg-cyan-600 rounded-br-lg' : 'bg-slate-700 rounded-bl-lg'}`}>
                <p className="text-2xl whitespace-pre-wrap">{message.text}</p>
            </div>
        </div>
    );
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, inputText, isBotTyping, onInput, onBackspace, onEnter }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isBotTyping]);

    return (
        <main className="flex-1 h-full flex flex-col p-8 lg:p-12">
            <div className="flex-1 overflow-y-auto pr-4 space-y-8">
                {messages.map((msg) => (
                    <ChatBubble key={msg.id} message={msg} />
                ))}
                {isBotTyping && (
                    <div className="flex justify-start">
                        <div className="bg-slate-700 rounded-3xl rounded-bl-lg px-6 py-4 flex items-center space-x-2">
                            <span className="w-3 h-3 bg-slate-400 rounded-full animate-pulse"></span>
                            <span className="w-3 h-3 bg-slate-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                            <span className="w-3 h-3 bg-slate-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-auto pt-6">
                <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-4 flex items-center text-3xl">
                    <p className="flex-grow text-slate-300 min-h-[3rem]">{inputText || 'Type your question...'}</p>
                    {inputText && <span className="w-1 h-10 bg-cyan-400 animate-pulse rounded-full" />}
                    <button 
                        onClick={onEnter} 
                        className="ml-4 p-4 bg-cyan-600 rounded-full hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
                        disabled={!inputText || isBotTyping}
                    >
                        <Icon name="send" className="h-8 w-8 text-white" />
                    </button>
                </div>
                
                <VirtualKeyboard 
                    onInput={onInput}
                    onBackspace={onBackspace}
                    onEnter={onEnter}
                />
            </div>
        </main>
    );
};

export default ChatWindow;
