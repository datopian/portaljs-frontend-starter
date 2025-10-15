import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  content: string;
}

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div >
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-3xl font-bold mt-4 mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-3 mb-1" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="leading-relaxed mb-4" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              {...props}
              className="underline text-[#000] hover:text-accent"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
          code: ({ node, inline, ...props }) =>
            inline ? (
              <code className="bg-gray-200 px-1 rounded text-sm" {...props} />
            ) : (
              <pre className="bg-gray-900 text-white p-3 rounded overflow-x-auto">
                <code {...props} />
              </pre>
            ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc pl-6 mb-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal pl-6 mb-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-gray-300 pl-4 italic text-gray-600"
              {...props}
            />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-gray-300" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
