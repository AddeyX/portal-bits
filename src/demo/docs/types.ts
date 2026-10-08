export type SourceFile = {
  name: string;
  language: 'svelte' | 'typescript' | 'css' | 'bash';
  code: string;
};

export type PreviewSettings = Record<string, string | number | boolean>;

export type PreviewControl =
  | { key: string; label: string; kind: 'boolean' }
  | {
      key: string;
      label: string;
      kind: 'choice';
      options: { label: string; value: string | number }[];
    };

/** One headed part of a docs page. `id` is the element id a search result links to. */
export type DocSection = { id: string; title: string; paragraphs: string[] };

/**
 * The searchable shape of a docs page. `path` is base-free. `related` lists paths of pages
 * worth reading next.
 */
export type DocPage = {
  path: string;
  title: string;
  description: string;
  sections: DocSection[];
  related: string[];
};
