import React from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
interface TextBlockProps {
  content: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ content }) => {
  return (
    <>
    <div className="p-4 text-lg leading-relaxed text-gray-100 bg-black/10 rounded-xl">{content}
      
     {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown> */}
    </div>
    </>
  );
};

export default TextBlock;
