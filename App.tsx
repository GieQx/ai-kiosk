
import React, { useState, useEffect, useCallback } from 'react';
import ChatWindow from './components/ChatWindow';
import AdSidebar from './components/AdSidebar';
import { getChatbotResponse } from './services/geminiService';
import { SAMPLE_CSV_KNOWLEDGE_BASE } from './constants';
import type { Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [knowledgeBase] = useState<string>(SAMPLE_CSV_KNOWLEDGE_BASE);

  useEffect(() => {
    // Add a welcome message on initial load
    setMessages([
      {
        id: 'initial-welcome',
        sender: 'bot',
        text: 'Welcome! I am your AI assistant. How can I help you find the perfect product today?'
      }
    ]);
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim() || isBotTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: inputText,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsBotTyping(true);

    const botResponseText = await getChatbotResponse(inputText, knowledgeBase);

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: botResponseText,
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsBotTyping(false);
  }, [inputText, isBotTyping, knowledgeBase]);


  const handleInput = (char: string) => {
    setInputText(prev => prev + char);
  };

  const handleBackspace = () => {
    setInputText(prev => prev.slice(0, -1));
  };
  
  const handleEnter = () => {
    handleSendMessage();
  };

  return (
    <div className="h-screen w-screen bg-slate-900 flex overflow-hidden">
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.4s ease-out forwards;
        }
      `}</style>
      <ChatWindow 
        messages={messages}
        inputText={inputText}
        isBotTyping={isBotTyping}
        onInput={handleInput}
        onBackspace={handleBackspace}
        onEnter={handleEnter}
      />
      <AdSidebar />
    </div>
  );
};

export default App;
