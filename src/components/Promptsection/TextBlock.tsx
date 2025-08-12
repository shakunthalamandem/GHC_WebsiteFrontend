import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TextBlockProps {
  content: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
  return (
    <div className="p-4 text-base leading-relaxed text-gray-800 bg-gray-50 rounded-xl border border-gray-200 shadow-sm prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default TextBlock;
