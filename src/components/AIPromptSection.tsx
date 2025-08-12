import { useState, useRef } from 'react';
import { Send, Sparkles, X, History as HistoryIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import DynamicRenderer from './Promptsection/DynamicRenderer';
import { DynamicBlock } from './Promptsection/types';
import { AIThinking } from './Promptsection/AIThinking';

const faqs = [
  'What does Golden Hills India do?',
  'What industries does Golden Hills India serve?',
  'Which analytics services are offered?',
  'Does Golden Hills India provide mobile app development?',
  'What technologies does Golden Hills India use?'
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

  // Fetch history and return it
  const fetchHistory = async (): Promise<HistoryItem[]> => {
    try {
      const res = await fetch('http://192.168.1.40:1000/api/assistant_query/', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();

      const parsedHistory: HistoryItem[] = data.history.map((item) => ({
        question: item.question,
        answer: item.response,
      }));

      setHistory(parsedHistory);

      return parsedHistory;
    } catch (error) {
      console.error('Failed to fetch history:', error);
      setHistory([]);
      return [];
    }
  };

  // Handle clicking the "View History" button
  const handleViewHistoryClick = async () => {
    let fetchedHistory = history;

    if (history.length === 0) {
      fetchedHistory = await fetchHistory();
    }

    setIsModalOpen(true);
    setShowHistory(true);

    if (fetchedHistory.length > 0) {
      const lastItem = fetchedHistory[0];
      setPopupPrompt(lastItem.question);
      setResponseBlocks(lastItem.answer);
    } else {
      setPopupPrompt('');
      setResponseBlocks(null);
    }
  };

  const fetchAIResponse = async (question: string) => {
    setIsModalOpen(true);
    setPopupPrompt(question);
    setIsLoading(true);
    setResponseBlocks(null);

    try {
      const res = await fetch('http://192.168.1.40:1000/api/assistant_query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text);

      const data = JSON.parse(text);
      setResponseBlocks(data.response);

      setHistory((prev) => [{ question, answer: data.response }, ...prev]);
    } catch (error) {
      console.error('Fetch error:', error);

      const errorBlock: DynamicBlock[] = [
        {
          type: 'text',
          row: 0,
          column: 1,
          total_columns: 1,
          content: error.message.includes('Rate limit exceeded')
            ? error.message
            : 'Something went wrong. Please try again later.',
        },
      ];
      setResponseBlocks(errorBlock);

      if (error.message.includes('Rate limit exceeded')) {
        setIsModalOpen(false);
        alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = mainPrompt.trim();
    if (!question) return;
    setMainPrompt('');
    fetchAIResponse(question);
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = popupPrompt.trim();
    if (!question) return;
    fetchAIResponse(question);
  };

  const handleFAQClick = (question: string) => {
    setMainPrompt('');
    fetchAIResponse(question);
  };

  const handleHistoryClick = (item: HistoryItem) => {
    setPopupPrompt(item.question);
    setResponseBlocks(item.answer);
    setShowHistory(false);
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
          <p className="text-xl text-muted-foreground">
            Learn About Golden Hills in Seconds with AI
          </p>
        </div>

        {/* Main Prompt Bar */}
        <form onSubmit={handleMainSubmit} className="relative mb-6">
          <div
            className={`relative transition-all duration-500 ${
              isFocused ? 'scale-105 shadow-glow' : 'shadow-elegant'
            }`}
            onClick={() => inputRef.current?.focus()}
          >
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={mainPrompt}
                onChange={(e) => setMainPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full px-8 py-6 rounded-full border-2 text-lg focus:outline-none transition-all duration-300 ${
                  isFocused
                    ? 'border-primary bg-white shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                    : 'border-border bg-card'
                }`}
              />
              {!mainPrompt && !isFocused && (
                <span
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg whitespace-nowrap border-r-2 border-muted-foreground animate-typing max-w-[calc(100%-48px)] truncate cursor-text"
                  onClick={() => inputRef.current?.focus()}
                >
                  Search company policies, culture, benefits, careers...
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!mainPrompt.trim() || isLoading}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-glow text-primary-foreground p-3 rounded-full transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>
          </div>
        </form>

        {/* FAQs */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {faqs.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleFAQClick(q)}
              className="px-4 py-2 bg-muted hover:bg-primary hover:text-white rounded-full transition text-sm"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Small View History Button below FAQs */}
        <div className="flex justify-center">
          <button
            onClick={handleViewHistoryClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 transition duration-300 text-sm"
          >
            View History
          </button>
        </div>

        {/* Popup Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-background rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              {/* Top bar: search, history, close */}
              <div className="flex items-center gap-4 mb-4">
                {/* Popup Prompt Bar */}
                <form onSubmit={handlePopupSubmit} className="flex-grow">
                  <div
                    className={`relative transition-all duration-500 w-full ${
                      isPopupFocused ? 'scale-105 shadow-glow' : 'shadow-elegant'
                    }`}
                  >
                    <div className="relative w-full">
                      <input
                        type="text"
                        value={popupPrompt}
                        onChange={(e) => setPopupPrompt(e.target.value)}
                        onFocus={() => setIsPopupFocused(true)}
                        onBlur={() => setIsPopupFocused(false)}
                        className={`w-full px-5 py-3 rounded-full border-2 text-base focus:outline-none transition-all duration-300 ${
                          isPopupFocused
                            ? 'border-primary bg-white shadow-[0_0_12px_rgba(59,130,246,0.6)]'
                            : 'border-border bg-card'
                        }`}
                      />
                      {!popupPrompt && !isPopupFocused && (
                        <span
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground text-base whitespace-nowrap border-r-2 border-muted-foreground animate-typing max-w-[calc(100%-48px)] truncate cursor-text"
                          onClick={() => setIsPopupFocused(true)}
                        >
                          Search company policies, culture, benefits, careers...
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-glow text-primary-foreground p-2 rounded-full transition-all duration-300 disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>

                {/* History button */}
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="bg-[#dfffff] text-black px-3 py-1 rounded flex items-center gap-2  transition whitespace-nowrap"
                  aria-label="Toggle history sidebar"
                >
                  <HistoryIcon className="w-4 h-4" /> History
                </button>

                {/* Close button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition p-2 rounded-full"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* AI Response */}
              {isLoading ? (
                <AIThinking query={popupPrompt} />
              ) : (
                responseBlocks && <DynamicRenderer response={responseBlocks} />
              )}

              {/* History Sidebar */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: showHistory ? 0 : '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 w-80 h-full bg-[#dfffff] shadow-xl border-l border-indigo-800 p-6 z-50 overflow-y-auto text-black"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold tracking-wide">History</h2>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="text-black hover:text-black-300 transition"
                    aria-label="Close History"
                  >
                    <X className="w-6 h-6 " />
                  </button>
                </div>
                {history.length === 0 ? (
                  <p className="text-indigo-200 italic">No history yet</p>
                ) : (
                  <ul className="space-y-4">
                    {history.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleHistoryClick(item)}
                        className="cursor-pointer rounded-lg bg-indigo-500 bg-opacity-30 p-3 shadow hover:bg-indigo-400 hover:bg-opacity-50 transition-colors duration-300"
                        title={item.question}
                      >
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
