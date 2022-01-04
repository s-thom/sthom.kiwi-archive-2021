import { CodeBlock } from 'notion-types';
import { getHighlighter, IShikiTheme } from 'shiki';
import { syntaxTheme } from './theme';
import { languageMap } from './languageMap';

const highlighterPromise = getHighlighter({ theme: syntaxTheme as unknown as IShikiTheme });

export async function highlightCode(block: CodeBlock): Promise<string | undefined> {
  const notionLanguage = block.properties?.language?.[0]?.[0];
  const content = block.properties?.title?.[0]?.[0];

  if (notionLanguage && content) {
    const fallback = notionLanguage.toLowerCase();
    const language = (languageMap[fallback] ?? fallback) || 'tsx';
    const highlighter = await highlighterPromise;
    const code = highlighter.codeToHtml(content, { lang: language });
    return code;
  }

  // eslint-disable-next-line no-console
  console.warn(`Unable to determine language and/or content of code block ${block.id}`);
  return undefined;
}
