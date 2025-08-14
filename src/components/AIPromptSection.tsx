import { useState, useRef } from 'react';
import { Send, Sparkles, X, History as HistoryIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import DynamicRenderer from './Promptsection/DynamicRenderer';
import { DynamicBlock } from './Promptsection/types';
import { AIThinking } from './Promptsection/AIThinking';

const faqs = [
  "What are your expertise areas?",
  "Tell me about the founders?",
  "How can I contact you?",
  "What services do you offer?",
  "Where are you located?"
];

interface HistoryItem {
  question: string;
  answer: DynamicBlock[];
}

const AIPromptSection = () => {
  const [mainPrompt, setMainPrompt] = useState('');
  const [popupPrompt, setPopupPrompt] = useState('');
  const [responseBlocks, setResponseBlocks] = useState<DynamicBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupFocused, setIsPopupFocused] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch full questions + answers from backend
  const fetchHistory = async (): Promise<HistoryItem[]> => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error("API URL not set");

      const res = await fetch(`${apiUrl}/api/assistant_query/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      // Store both question & answer directly
      const items: HistoryItem[] = data.history.map((item) => ({
        question: item.question,
        answer: item.response // Assuming backend sends same structure as POST
      }));

      setHistory(items);
      return items;
    } catch (error) {
      console.error('Failed to fetch history:', error);
      setHistory([]);
      return [];
    }
  };

  // Main page View History click
  const handleViewHistoryClick = async () => {
    const items = await fetchHistory();
    setIsModalOpen(true);
    setShowHistory(true);

    if (items.length > 0) {
      const latest = items[0];
      setPopupPrompt(latest.question);
      setResponseBlocks(latest.answer); // Directly set answer from GET
    } else {
      setPopupPrompt('');
      setResponseBlocks(null);
    }
  };
  // Modal History button click → only open sidebar
  const handleModalHistoryClick = async () => {
    // Just open the sidebar with latest fetched data
    if (history.length === 0) {
      await fetchHistory();
    }
    setShowHistory(true);
  };
  const handleHistoryClick = (item: HistoryItem) => {
    setPopupPrompt(item.question);
    setResponseBlocks(item.answer);
    setShowHistory(false);
  };

  const handleMainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = mainPrompt.trim();
    if (!question) return;

    setMainPrompt('');
    setIsModalOpen(true);
    setShowHistory(false);

    await fetchAIResponse(question);
  };

  const fetchAIResponse = async (question: string) => {
    setPopupPrompt(question);
    setIsLoading(true);
    setResponseBlocks(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (!apiUrl) throw new Error("API URL not set");

      const res = await fetch(`${apiUrl}/api/assistant_query/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      const data = JSON.parse(text);
      setResponseBlocks(data.response);
    } catch (error) {
      setResponseBlocks([{
        type: 'text',
        row: 0,
        column: 1,
        total_columns: 1,
        content: error.message || 'Something went wrong. Please try again later.',
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = popupPrompt.trim();
    if (!question) return;
    fetchAIResponse(question);
  };

  const handleFAQClick = (question: string) => {
    setMainPrompt('');
    setIsModalOpen(true);
    setShowHistory(false);
    fetchAIResponse(question);
  };


  return (
    <section id="ask-ai" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-foreground">Ask Our AI Assistant</h2>
          </div>
          <p className="text-xl text-muted-foreground">Learn About Golden Hills in Seconds with AI</p>
        </div>

        {/* Main Prompt Bar */}
        <form onSubmit={handleMainSubmit} className="relative mb-6">
          <div
            className={`relative transition-all duration-500 ${isFocused ? 'scale-105 shadow-glow' : 'shadow-elegant'}`}
            onClick={() => inputRef.current?.focus()}
          >
            <input
              ref={inputRef}
              type="text"
              value={mainPrompt}
              onChange={(e) => setMainPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search company policies, culture, benefits, careers..."
              className={`w-full px-8 py-6 rounded-full border-2 
              text-base sm:text-lg focus:outline-none 
              transition-all duration-300 
              placeholder:text-sm sm:placeholder:text-base 
              ${isFocused
                  ? 'border-primary bg-white shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                  : 'border-border bg-card'
                }`}
            />
{/* 
            {!mainPrompt && !isFocused && (
              <span className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg whitespace-nowrap cursor-text">
                Search company policies, culture, benefits, careers...
              </span>
            )} */}
            <button
              type="submit"
              disabled={!mainPrompt.trim() || isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-glow text-primary-foreground p-3 rounded-full disabled:opacity-50"
            >
              {isLoading ? <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Send className="w-6 h-6" />}
            </button>
          </div>
        </form>

        {/* FAQs */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {faqs.map((q, idx) => (
            <button key={idx} onClick={() => handleFAQClick(q)} className="px-4 py-2 bg-muted hover:bg-primary hover:text-white rounded-full text-sm">
              {q}
            </button>
          ))}
        </div>

        {/* View History button */}
        <div className="flex justify-center">
          <button onClick={handleViewHistoryClick} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 text-sm">
            View History
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-background rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <div className="flex items-center gap-4 mb-4">
                {/* Popup prompt */}
                <form onSubmit={handlePopupSubmit} className="flex-grow">
                  <div className={`relative transition-all duration-500 w-full ${isPopupFocused ? 'scale-105 shadow-glow' : 'shadow-elegant'}`}>
                    <input
                      type="text"
                      value={popupPrompt}
                      onChange={(e) => setPopupPrompt(e.target.value)}
                      onFocus={() => setIsPopupFocused(true)}
                      onBlur={() => setIsPopupFocused(false)}
                      className={`w-full px-5 py-3 rounded-full border-2 text-base focus:outline-none transition-all duration-300 ${isPopupFocused
                        ? 'border-primary bg-white shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                        : 'border-border bg-card'
                        }`}
                    />
                    <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>

                {/* History button */}
                <button
                  onClick={handleModalHistoryClick}
                  className="bg-[#dfffff] hover:bg-[#bffefe] transition-colors duration-200 text-black px-3 py-1 rounded flex items-center gap-2"
                >
                  <HistoryIcon className="w-4 h-4" /> History
                </button>


                {/* Close */}
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* AI Response */}
              {isLoading ? <AIThinking query={popupPrompt} /> : (responseBlocks && <DynamicRenderer
                response={responseBlocks}
                onSuggestedQuestionClick={(question) => {
                  setPopupPrompt(question);
                  fetchAIResponse(question);
                }}
              />
              )}

              {/* History Sidebar */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: showHistory ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 w-80 h-full bg-[#dfffff] shadow-xl p-6 overflow-y-auto text-black"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">History</h2>
                  <button onClick={() => setShowHistory(false)} className="p-1">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                {history.length === 0 ? (
                  <p>No history yet</p>
                ) : (
                  <ul className="space-y-4">
                    {history.map((item, idx) => (
                      <li key={idx} onClick={() => handleHistoryClick(item)} className="cursor-pointer rounded-lg bg-indigo-500 bg-opacity-30 p-3 hover:bg-indigo-400 hover:bg-opacity-50">
                        <p className="truncate font-semibold">{item.question}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIPromptSection;
