import React, { useEffect, useRef, useState } from 'react';
import { Bot, MessageSquare, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CERTIFICATIONS, EXPERIENCE, SKILL_CATEGORIES } from '../constants';

const MotionButton = motion.button as any;
const MotionDiv = motion.div as any;

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

const initialMessage: Message = {
  id: 'init',
  role: 'model',
  text: 'Hello. I am Sergio\'s portfolio assistant. Ask me about his experience, security skills, certifications, or contact details.',
};

const getMessageId = () => crypto.randomUUID();

const getAssistantResponse = (question: string) => {
  const normalizedQuestion = question.toLowerCase();
  const matchingJob = EXPERIENCE.find((job) =>
    [job.company, job.role, job.title].some((value) =>
      normalizedQuestion.includes(value.toLowerCase()),
    ),
  );

  if (matchingJob) {
    return `**${matchingJob.role} at ${matchingJob.company}** (${matchingJob.period})\n${matchingJob.description}\n- ${matchingJob.details.slice(0, 3).join('\n- ')}\n**Core stack:** ${matchingJob.techStack.join(', ')}`;
  }

  if (/experience|career|work|job|background|trayectoria|experiencia/.test(normalizedQuestion)) {
    return `Sergio's security experience includes:\n${EXPERIENCE.map((job) => `- **${job.company}:** ${job.role} (${job.period})`).join('\n')}`;
  }

  if (/skill|stack|technology|technologies|security|herramienta|habilidad/.test(normalizedQuestion)) {
    return SKILL_CATEGORIES.map((category) =>
      `**${category.title}:** ${category.items.join(', ')}`,
    ).join('\n');
  }

  if (/certification|certificate|credential|certificaci/.test(normalizedQuestion)) {
    return `Sergio's listed credentials are:\n${CERTIFICATIONS.map((certification) => `- ${certification.name}`).join('\n')}`;
  }

  if (/contact|email|hire|reach|linkedin|github|contacto/.test(normalizedQuestion)) {
    return '**Contact Sergio**\n- Email: sergio_uncos@outlook.com\n- GitHub: github.com/sergiouncos\n- LinkedIn: linkedin.com/in/sergio-uncos';
  }

  if (/language|english|spanish|portuguese|idioma/.test(normalizedQuestion)) {
    return 'Sergio is fluent in **English, Portuguese, and Spanish**.';
  }

  return 'I can help with Sergio\'s **experience**, **security skills**, **certifications**, and **contact details**. Try asking about one of those topics.';
};

const FormattedMessage: React.FC<{ text: string }> = ({ text }) => (
  <div className="space-y-1">
    {text.split('\n').map((line, lineIndex) => {
      if (!line.trim()) return <div key={lineIndex} className="h-2" />;

      const isListItem = /^\s*(-|\*|\d+\.)\s/.test(line);
      const parts = line.split(/(\*\*.*?\*\*)/g);

      return (
        <div key={lineIndex} className={isListItem ? 'flex items-start pl-3' : ''}>
          {isListItem && (
            <span aria-hidden="true" className="mr-2 mt-1 shrink-0 text-[10px] text-brand-accent opacity-80">
              &bull;
            </span>
          )}
          <span className="block min-w-0 break-words">
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={partIndex} className="font-bold text-white">{part.slice(2, -2)}</strong>;
              }

              const cleanPart = isListItem && partIndex === 0
                ? part.replace(/^\s*(-|\*|\d+\.)\s/, '')
                : part;
              return <span key={partIndex}>{cleanPart}</span>;
            })}
          </span>
        </div>
      );
    })}
  </div>
);

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [isTyping, setIsTyping] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const responseTimerRef = useRef<number | null>(null);
  const hasOpenedRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      hasOpenedRef.current = true;
      window.setTimeout(() => inputRef.current?.focus(), 50);
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') setIsOpen(false);
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    if (hasOpenedRef.current) {
      window.requestAnimationFrame(() => launcherRef.current?.focus());
    }
  }, [isOpen]);

  useEffect(() => () => {
    if (responseTimerRef.current !== null) window.clearTimeout(responseTimerRef.current);
  }, []);

  const closeAssistant = () => setIsOpen(false);

  const handleSend = () => {
    const question = input.trim();
    if (!question || isTyping) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: getMessageId(), role: 'user', text: question },
    ]);
    setInput('');
    setIsTyping(true);

    responseTimerRef.current = window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        { id: getMessageId(), role: 'model', text: getAssistantResponse(question) },
      ]);
      setIsTyping(false);
      responseTimerRef.current = null;
      inputRef.current?.focus();
    }, 350);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <MotionButton
            ref={launcherRef}
            type="button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open portfolio assistant"
            aria-controls="portfolio-assistant"
            aria-expanded="false"
            className="fixed right-16 top-5 z-50 rounded-full border border-brand-accent/50 bg-slate-950/80 p-2.5 text-brand-accent shadow-[0_0_16px_rgba(6,182,212,0.25)] backdrop-blur-md transition-all hover:bg-brand-accent hover:text-white sm:bottom-8 sm:right-8 sm:top-auto sm:bg-brand-accent/20 sm:p-4 sm:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <MessageSquare className="h-6 w-6" />
          </MotionButton>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            id="portfolio-assistant"
            role="dialog"
            aria-labelledby="portfolio-assistant-title"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.95 }}
            className="glass-card fixed bottom-4 left-4 right-4 z-50 flex h-[min(550px,calc(100dvh-2rem))] flex-col overflow-hidden rounded-2xl sm:bottom-8 sm:left-auto sm:right-8 sm:w-[400px]"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-brand-accent/10 p-1.5">
                  <Bot className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <span id="portfolio-assistant-title" className="block text-sm font-bold text-white">Sergio's Assistant</span>
                  <span className="flex items-center text-[10px] text-green-400">
                    <span aria-hidden="true" className="mr-1 h-1.5 w-1.5 rounded-full bg-green-400" />
                    Available
                  </span>
                </div>
              </div>
              <button type="button" onClick={closeAssistant} aria-label="Close portfolio assistant" className="p-2 text-slate-400 transition-colors hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div aria-live="polite" aria-relevant="additions" className="flex-1 space-y-4 overflow-y-auto bg-transparent p-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] break-words rounded-2xl border p-3.5 text-sm leading-relaxed backdrop-blur-md ${
                    message.role === 'user'
                      ? 'rounded-br-none border-white/10 bg-brand-accent/80 text-white'
                      : 'rounded-bl-none border-white/10 bg-white/5 text-slate-200'
                  }`}>
                    {message.role === 'model' ? <FormattedMessage text={message.text} /> : message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start" aria-label="Assistant is responding">
                  <div className="rounded-2xl rounded-bl-none border border-white/5 bg-white/5 p-3 backdrop-blur-md">
                    <div className="flex space-x-1.5" aria-hidden="true">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleSend();
                  }}
                  aria-label="Question for Sergio's portfolio assistant"
                  placeholder="Ask about my experience..."
                  className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-4 pr-12 text-sm text-white transition-all placeholder:text-slate-500 focus:border-brand-accent/50 focus:bg-black/40 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  aria-label="Send question"
                  className="absolute right-2 rounded-lg bg-brand-accent p-2 text-white transition-colors hover:bg-brand-secondary disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;
