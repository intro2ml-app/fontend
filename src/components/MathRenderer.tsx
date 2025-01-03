// import { MathJax } from 'better-react-mathjax';
import Markdown from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function MathRenderer({ text }: { text: string }) {
  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag='div'
                children={String(children)?.replace(/\n$/, '')}
                language={match[1]}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {text
          ?.replace(/\\\(/g, '$')
          ?.replace(/\\\)/g, '$')
          ?.replace(/\\\[/g, '$$')
          ?.replace(/\\]/g, '$$')}
      </ReactMarkdown>
    </div>
  );
}
