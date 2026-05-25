import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h1: ({ children }) => (
    <h2 className="mt-10 mb-4 font-display text-2xl tracking-wide text-gold-bright">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 font-display text-2xl tracking-wide text-gold-bright">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-display text-xl tracking-wide text-parchment">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-relaxed text-parchment/90">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sim underline decoration-sim/40 underline-offset-2 transition-colors hover:decoration-sim"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-parchment/90 marker:text-gold">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-parchment/90 marker:text-gold">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-gold pl-5 text-parchment/80 italic">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-parchment">{children}</strong>
  ),
  em: ({ children }) => <em className="text-parchment">{children}</em>,
  hr: () => <hr className="my-8 border-line" />,
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-line bg-ink-soft p-4 text-sm">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="rounded bg-ink-soft px-1.5 py-0.5 font-mono text-sm text-sim">
      {children}
    </code>
  ),
};

export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-base">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
