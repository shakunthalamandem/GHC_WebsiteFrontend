import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, Zap } from 'lucide-react';

interface AIThinkingProps {
  query: string;
}

export const AIThinking: React.FC<AIThinkingProps> = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      {/* AI Thinking Animation */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Central Brain Icon */}
        <motion.div
          className="relative z-10 p-6 glass-strong rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Brain className="w-12 h-12 text-ai-primary" />
        </motion.div>

        {/* Orbiting Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3
            }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-ai rounded-full"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) translateY(-${60 + i * 20}px)`
              }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2
              }}
            />
          </motion.div>
        ))}

        {/* Ripple Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-ai-primary/30 rounded-full"
          animate={{
            scale: [1, 2, 3],
            opacity: [0.5, 0.2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>

      {/* Thinking Text with Shimmer */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-2 text-lg font-medium">
          <Sparkles className="w-5 h-5 text-ai-primary animate-pulse" />
          <span className="bg-gradient-ai bg-clip-text text-transparent">
            AI is analyzing your request
          </span>
          <Zap className="w-5 h-5 text-ai-secondary animate-pulse" />
        </div>
        
        <motion.div
          className="text-sm text-muted-foreground max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="mb-2">Processing: <span className="text-foreground font-medium">"{query}"</span></p>
          <div className="flex items-center justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-ai-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Status Messages */}
      <motion.div
        className="mt-8 text-center space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-xs text-muted-foreground space-y-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Generating the Response
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
Formating the Response          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};