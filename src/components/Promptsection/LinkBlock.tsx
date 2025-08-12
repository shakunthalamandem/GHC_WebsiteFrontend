import React from 'react';

interface LinkBlockProps {
  text: string;
  url: string;
}

const LinkBlock: React.FC<LinkBlockProps> = ({ text, url }) => {
  return (
    <div className="p-4 text-lg leading-relaxed text-blue bg-black/10 rounded-xl hover:bg-black/20 transition-all duration-300">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 hover:text-sky-400"
      >
        {text}
      </a>
    </div>
  );
};

export default LinkBlock;
