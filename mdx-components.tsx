import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display font-black text-4xl md:text-5xl text-foreground leading-tight tracking-tighter mt-12 mb-6 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display font-black text-2xl md:text-3xl text-foreground uppercase tracking-tighter mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display font-black text-xl text-foreground uppercase tracking-tighter mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-secondary-text text-base font-medium leading-relaxed mb-5">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="space-y-2 mb-6 pl-0">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="space-y-2 mb-6 pl-0 list-decimal list-inside">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-3 text-secondary-text text-base font-medium">
        <span className="text-primary mt-1 shrink-0">—</span>
        <span>{children}</span>
      </li>
    ),
    strong: ({ children }) => (
      <strong className="font-black text-foreground">{children}</strong>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary font-bold underline underline-offset-4 hover:text-foreground transition-colors"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 bg-surface rounded-r-[8px] py-4 pr-4">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-border my-10" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-surface border border-border px-4 py-3 text-left font-black text-foreground text-[10px] uppercase tracking-widest">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-3 text-secondary-text font-medium">{children}</td>
    ),
    ...components,
  };
}
