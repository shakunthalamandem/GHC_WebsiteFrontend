import React from 'react';

interface TextBlockProps {
  content: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
  return (
    <div className="p-4 text-base leading-relaxed text-gray-800 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
      {content}
    </div>
  );
};

export default TextBlock;
