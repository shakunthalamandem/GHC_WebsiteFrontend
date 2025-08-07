import { useState } from 'react';
import { Send, Sparkles, X } from 'lucide-react';
import DynamicRenderer from './Promptsection/DynamicRenderer';
import { DynamicBlock } from './Promptsection/types';

const AIPromptSection = () => {
  const [prompt, setPrompt] = useState('');
  const [responseBlocks, setResponseBlocks] = useState<DynamicBlock[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponseBlocks(null);

    try {
      const res = await fetch('http://192.168.1.40:8000/api/dummy_assistant/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: prompt }),
      });

      if (!res.ok) throw new Error('API error');

      const data = await res.json();
      setResponseBlocks(data.response);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Fetch error:', error);
      setResponseBlocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-foreground">Ask Our AI Assistant</h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover how our intelligent solutions can transform your business
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSubmit} className="relative">
          <div className={`relative transition-all duration-500 ${isFocused ? 'scale-105 shadow-glow' : 'shadow-elegant'}`}>
            <div className="relative">
              {!prompt && !isFocused && (
                <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg whitespace-nowrap border-r-2 border-muted-foreground animate-typing">
                  Search company policies, culture, benefits, careers...
                </span>
              )}

              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`w-full px-8 py-6 rounded-full bg-card border-2 transition-all duration-500 text-lg focus:outline-none focus:border-primary ${
                  isFocused ? 'border-primary pulse-glow' : 'border-border'
                }`}
              />
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

        {/* Loading indicator */}
        {isLoading && (
          <div className="mt-8 text-center text-muted-foreground animate-pulse">
            Processing your request...
          </div>
        )}

        {/* Modal */}
        {isModalOpen && responseBlocks && !isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-background rounded-lg shadow-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
              >
                <X className="w-6 h-6" />
              </button>
              <DynamicRenderer response={responseBlocks} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIPromptSection;
