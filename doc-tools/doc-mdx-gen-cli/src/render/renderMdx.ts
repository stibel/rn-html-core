import fs from 'fs/promises';
import type { ReactElement } from 'react';
import path from 'path';
import MDXDocument, { MDXDocMetadata } from './components/MDXDocument';
import { createElement } from './createElement';
import MDXRenderer from './MDXRenderer';

// renders the component
async function renderMdx(
  element: ReactElement<any>,
  metadata: MDXDocMetadata,
  filePath: string
) {
  const container = createElement(
    'ROOT',
    metadata,
    undefined as any
  ) as MDXDocument;

  // @ts-expect-error - React internal APIs not fully typed
  const node = MDXRenderer.createContainer(container, undefined, false);

  MDXRenderer.updateContainer(element, node, null);

  try {
    await fs.writeFile(filePath, container.toMdx());
  } catch (e) {
    console.error(
      `An error occurred while generating the document at ${path.resolve(
        filePath
      )}.`
    );
    throw e;
  }
  console.log(`✨ MDX document generated at ${path.resolve(filePath)}.`);
}

export default renderMdx;
