import { ContentBlock } from 'draft-js';
import findWithRegex, { StrategyCallback } from 'find-with-regex';

import { re as unicodeRegex } from './utils/emojiRegex';

export default (contentBlock: ContentBlock, callback: StrategyCallback) => {
	findWithRegex(unicodeRegex, contentBlock, callback);
};
