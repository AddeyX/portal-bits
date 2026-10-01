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
