export type SourceFile = {
  name: string;
  language: 'svelte' | 'typescript' | 'css' | 'bash';
  code: string;
  highlightedHtml?: string;
};
