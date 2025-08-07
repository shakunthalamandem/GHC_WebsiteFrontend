import React from 'react';
import { motion } from 'framer-motion';

interface SuggestedQuestionsBlockProps {
  questions: string[];
}

const SuggestedQuestionsBlock: React.FC<SuggestedQuestionsBlockProps> = ({ questions }) => {
  return (
    <div className="p-5 rounded-xl border border-white/10 shadow bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white">
      <h3 className="text-lg font-semibold mb-4 text-sky-300">Suggested Questions</h3>
      <ul className="space-y-3">
        {questions.map((q, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer px-3 py-2 rounded-lg bg-sky-900/30 hover:bg-sky-700/40 text-sky-200 hover:text-white transition-colors duration-200"
          >
            {q}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestedQuestionsBlock;
