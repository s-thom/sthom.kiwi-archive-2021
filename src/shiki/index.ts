import { CodeBlock } from 'notion-types';
import { getHighlighter, IShikiTheme } from 'shiki';
import { languageMap } from './languageMap';
import { syntaxTheme } from './theme';

const highlighterPromise = getHighlighter({ theme: syntaxTheme as unknown as IShikiTheme });

export async function highlightCode(block: CodeBlock): Promise<string | undefined> {
  const notionLanguage = block.properties?.language?.[0]?.[0];
  const blockContent = block.properties?.title?.[0]?.[0];

  if (notionLanguage && blockContent) {
    let codeLanguage = notionLanguage.toLowerCase();
    let codeString = blockContent;
    // Try match language from first line of text
    // Match get a "comment", followed by the keyword "lang"
    const match = blockContent.match(/^(?:[/#]+\s*lang:?\s*(\S*)\r?\n)([\s\S]*)$/);
    if (match) {
      // eslint-disable-next-line prefer-destructuring
      codeLanguage = match[1];
      // eslint-disable-next-line prefer-destructuring
      codeString = match[2];
    }

    const finalLanguage = (languageMap[codeLanguage] ?? codeLanguage) || 'tsx';
    const highlighter = await highlighterPromise;
    const code = highlighter.codeToHtml(codeString, { lang: finalLanguage });
    return code;
  }

  // eslint-disable-next-line no-console
  console.warn(`Unable to determine language and/or content of code block ${block.id}`);
  return undefined;
}
