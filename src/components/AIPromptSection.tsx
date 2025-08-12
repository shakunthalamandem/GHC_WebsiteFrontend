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
  const [prompt, setPrompt] = useState('');
  const [responseBlocks, setResponseBlocks] = useState<DynamicBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const fetchAIResponse = async (question: string) => {
    setIsModalOpen(true);
    setIsLoading(true);
    setResponseBlocks(null);

    try {
      const res = await fetch('http://192.168.1.40:1000/api/assistant_query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setResponseBlocks(data.response);
    } catch (error) {
      console.error('Fetch error:', error);
      setResponseBlocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    fetchAIResponse(prompt);
  };

  const handleFAQClick = (question: string) => {
    setPrompt(question);
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
          <p className="text-xl text-muted-foreground">
            Learn About Golden Hills in Seconds with AI
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="relative mb-6">
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
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full px-8 py-6 rounded-full border-2 text-lg focus:outline-none transition-all duration-300 
                  ${
                    isFocused
                      ? 'border-primary bg-white shadow-[0_0_12px_rgba(59,130,246,0.6)] '
                      : 'border-border bg-card'
                  }`}
              />
              {!prompt && !isFocused && (
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
              disabled={!prompt.trim() || isLoading}
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

        {/* FAQ List */}
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

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-background rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Search bar in popup (same state as main) */}
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded-full"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-full"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>

              {/* Show AIThinking until response arrives */}
              {isLoading ? (
                <AIThinking query={prompt} />
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
