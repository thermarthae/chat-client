// Type definitions for twemoji
// Project: https://github.com/twitter/twemoji
// Definitions by: thermarthae <https://github.com/thermarthae>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.3.3333


declare module 'twemoji' {
	type ParseCallbackFn = (
		iconId: string,
		options: {
			base: string;
			ext: string;
			size: string;
		},
		variant: string
	) => void;

	interface ParseOptions {
		/** default the common replacer */
		callback?: ParseCallbackFn;
		/** default returns {} */
		attributes?: (icon, variant) => object;
		/** default MaxCDN */
		base?: string;
		/** default ".png" */
		ext?: string;
		/** default "emoji" */
		className?: string;
		/** default "36x36" */
		size?: string | number;
		/** in case it's specified it replaces .size info, if any */
		folder?: string;
	}

	export declare class twemoji {
		/////////////////////////
		//      properties     //
		/////////////////////////

		/**
		 * Default assets url, by default will be Twitter Inc. CDN
		 */
		base: string;

		/**
		 * Default assets file extensions, by default '.png'
		 */
		ext: string;

		/**
		 * Default assets/folder size, by default "72x72"
		 * available via Twitter CDN: 72
		 */
		size: string;

		/**
		 * Default class name, by default 'emoji'
		 */
		className: string;

		convert: { //TODO
			/**
			 * Given an HEX codepoint, returns UTF16 surrogate pairs.
			 *
			 * @param   string  generic codepoint, i.e. '1F4A9'
			 * @return  string  codepoint transformed into utf16 surrogates pair,
			 *          i.e. \uD83D\uDCA9
			 *
			 * @example
			 *  twemoji.convert.fromCodePoint('1f1e8');
			 *  // "\ud83c\udde8"
			 *
			 *  '1f1e8-1f1f3'.split('-').map(twemoji.convert.fromCodePoint).join('')
			 *  // "\ud83c\udde8\ud83c\uddf3"
			 */
			fromCodePoint(codepoint: string): string

			/**
			 * Given UTF16 surrogate pairs, returns the equivalent HEX codepoint.
			 *
			 * @param   string  generic utf16 surrogates pair, i.e. \uD83D\uDCA9
			 * @param   string  optional separator for double code points, default='-'
			 * @return  string  utf16 transformed into codepoint, i.e. '1F4A9'
			 *
			 * @example
			 *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3');
			 *  // "1f1e8-1f1f3"
			 *
			 *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3', '~');
			 *  // "1f1e8~1f1f3"
			 */
			toCodePoint(unicodeSurrogates: string, separator?: string): string
		}

		/////////////////////////
		//       methods       //
		/////////////////////////

		/**
		 * User first: used to remove missing images
		 * preserving the original text intent when
		 * a fallback for network problems is desired.
		 * Automatically added to Image nodes via DOM
		 * It could be recycled for string operations via:
		 *  $('img.emoji').on('error', twemoji.onerror)
		 */
		onerror(): void

		/**
		 * Main method/logic to generate either <img> tags or HTMLImage nodes.
		 *  "emojify" a generic text or DOM Element.
		 *
		 * @overloads
		 *
		 * String replacement for `innerHTML` or server side operations
		 *  twemoji.parse(string);
		 *  twemoji.parse(string, Function);
		 *  twemoji.parse(string, Object);
		 *
		 * HTMLElement tree parsing for safer operations over existing DOM
		 *  twemoji.parse(HTMLElement);
		 *  twemoji.parse(HTMLElement, Function);
		 *  twemoji.parse(HTMLElement, Object);
		 *
		 * @param   string|HTMLElement  the source to parse and enrich with emoji.
		 *
		 *          string              replace emoji matches with <img> tags.
		 *                              Mainly used to inject emoji via `innerHTML`
		 *                              It does **not** parse the string or validate it,
		 *                              it simply replaces found emoji with a tag.
		 *                              NOTE: be sure this won't affect security.
		 *
		 *          HTMLElement         walk through the DOM tree and find emoji
		 *                              that are inside **text node only** (nodeType === 3)
		 *                              Mainly used to put emoji in already generated DOM
		 *                              without compromising surrounding nodes and
		 *                              **avoiding** the usage of `innerHTML`.
		 *                              NOTE: Using DOM elements instead of strings should
		 *                              improve security without compromising too much
		 *                              performance compared with a less safe `innerHTML`.
		 *
		 * @param   Function|Object  [optional]
		 *                              either the callback that will be invoked or an object
		 *                              with all properties to use per each found emoji.
		 *
		 *          Function            if specified, this will be invoked per each emoji
		 *                              that has been found through the RegExp except
		 *                              those follwed by the invariant \uFE0E ("as text").
		 *                              Once invoked, parameters will be:
		 *
		 *                                iconId:string     the lower case HEX code point
		 *                                                  i.e. "1f4a9"
		 *
		 *                                options:Object    all info for this parsing operation
		 *
		 *                                variant:char      the optional \uFE0F ("as image")
		 *                                                  variant, in case this info
		 *                                                  is anyhow meaningful.
		 *                                                  By default this is ignored.
		 *
		 *                              If such callback will return a falsy value instead
		 *                              of a valid `src` to use for the image, nothing will
		 *                              actually change for that specific emoji.
		 *
		 *
		 *          Object              if specified, an object containing the following properties
		 *
		 *            callback   Function  the callback to invoke per each found emoji.
		 *            base       string    the base url, by default twemoji.base
		 *            ext        string    the image extension, by default twemoji.ext
		 *            size       string    the assets size, by default twemoji.size
		 *
		 * @example
		 *
		 *  twemoji.parse("I \u2764\uFE0F emoji!");
		 *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
		 *
		 *
		 *  twemoji.parse("I \u2764\uFE0F emoji!", function(iconId, options) {
		 *    return '/assets/' + iconId + '.gif';
		 *  });
		 *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
		 *
		 *
		 * twemoji.parse("I \u2764\uFE0F emoji!", {
		 *   size: 72,
		 *   callback: function(iconId, options) {
		 *     return '/assets/' + options.size + '/' + iconId + options.ext;
		 *   }
		 * });
		 *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/72x72/2764.png"/> emoji!
		 *
		 */
		parse(what: string | HTMLElement): string;
		parse(what: string | HTMLElement, how?: Partial<ParseCallbackFn> | ParseOptions): string;

		/**
		 * Given a string, invokes the callback argument
		 *  per each emoji found in such string.
		 * This is the most raw version used by
		 *  the .parse(string) method itself.
		 *
		 * @param   string    generic string to parse
		 * @param   Function  a generic callback that will be
		 *                    invoked to replace the content.
		 *                    This calback wil receive standard
		 *                    String.prototype.replace(str, callback)
		 *                    arguments such:
		 *  callback(
		 *    rawText,  // the emoji match
		 *  );
		 *
		 *                    and others commonly received via replace.
		 */
		replace(text: string, callback: Function): void;

		/**
		 * Simplify string tests against emoji.
		 *
		 * @param   string  some text that might contain emoji
		 * @return  boolean true if any emoji was found, false otherwise.
		 *
		 * @example
		 *
		 *  if (twemoji.test(someContent)) {
		 *    console.log("emoji All The Things!");
		 *  }
		 */
		test(text: string): boolean
	}

	declare const Instance: twemoji;
	export default Instance;
}
