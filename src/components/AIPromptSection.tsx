import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const AIPromptSection = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setResponse(
        `At Golden Hills India, we harness the power of advanced analytics and AI to transform your "${prompt}" challenges into strategic opportunities. Our custom solutions integrate seamlessly with your existing infrastructure, providing real-time insights and predictive capabilities that drive measurable growth.`
      );
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-4xl font-bold text-foreground">
              Ask Our AI Assistant
            </h2>
          </div>
          <p className="text-xl text-muted-foreground">
            Discover how our intelligent solutions can transform your business
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <div
            className={`relative transition-all duration-500 ${
              isFocused ? 'scale-105 shadow-glow' : 'shadow-elegant'
            }`}
          >
            <div className="relative">
              {/* Typing Placeholder Animation */}
              {!prompt && !isFocused && (
                <span className="absolute left-8 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg whitespace-nowrap overflow-hidden border-r-2 border-muted-foreground animate-typing">
                  Search company policies, culture, benefits, careers...
                </span>
              )}

              {/* Input Field */}
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

            {/* Submit Button */}
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

        {/* AI Response */}
        {response && (
          <div className="mt-8 p-8 glass-morphism rounded-2xl animate-fade-in">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-sky-gold rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">AI Assistant</h3>
                <p className="text-muted-foreground leading-relaxed">{response}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIPromptSection;
