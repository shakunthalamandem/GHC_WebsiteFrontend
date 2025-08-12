import { useState, useRef } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
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

const AIPromptSection = () => {
  const [mainPrompt, setMainPrompt] = useState('');
  const [popupPrompt, setPopupPrompt] = useState('');
  const [responseBlocks, setResponseBlocks] = useState<DynamicBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
const [isPopupFocused, setIsPopupFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const fetchAIResponse = async (question: string) => {
    setIsModalOpen(true);
    setPopupPrompt(question); // fill popup bar with the question
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
    } catch (error) {
      console.error('Fetch error:', error);

      if (error.message.includes('Rate limit exceeded')) {
        setIsModalOpen(false);
        alert(error.message);
      } else {
        setResponseBlocks([
          {
            type: 'text',
            row: 0,
            column: 1,
            total_columns: 1,
            content: 'Something went wrong. Please try again later.',
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleMainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = mainPrompt.trim();
    if (!question) return;
    setMainPrompt(''); // clear main bar
    fetchAIResponse(question); // popup will be pre-filled
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const question = popupPrompt.trim();
    if (!question) return;
    fetchAIResponse(question); // stays in popup
  };

  const handleFAQClick = (question: string) => {
    setMainPrompt(''); // clear main prompt
    fetchAIResponse(question); // popup pre-filled
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
        <div className="flex flex-wrap justify-center gap-3">
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

        {/* Popup Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-background rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Popup Prompt Bar */}
<form onSubmit={handlePopupSubmit} className="mb-4 flex justify-center">
<div
  className={`relative transition-all duration-500 w-[700px] ${
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

              {/* AI Response */}
              {isLoading ? (
                <AIThinking query={popupPrompt} />
              ) : (
                responseBlocks && <DynamicRenderer response={responseBlocks} />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIPromptSection;
