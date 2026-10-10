/*
 * Small helper that resolves playwright-core from the isolated .qatools
 * folder and picks a Chrome binary, so QA scripts do not need to repeat
 * that logic or add a dependency to either project.
 */
import fs from 'node:fs';
import path from 'node:path';

import pw from '../.qatools/node_modules/playwright-core/index.js';

const CANDIDATES = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
];

const found = CANDIDATES.find((p) => fs.existsSync(p));

if (found && !process.env.CHROME_PATH) {
  process.env.CHROME_PATH = found;
}

export default pw;
export const executablePath = process.env.CHROME_PATH || undefined;
export { path };
