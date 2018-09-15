/// <resources type='react' />
/// <resources type='draft-js' />

declare module 'find-with-regex' {
	export type StrategyCallback = (start: number, end: number) => void;
	function findWithRegex(regex: RegExp, contentBlock: Draft.ContentBlock, callback: StrategyCallback): void;
	export default findWithRegex;
}

declare module 'decorate-component-with-props' {
	function decorateComponentWithProps<R>(EmbeddedComponent: any, props: R): React.ComponentType<R>;
	export default decorateComponentWithProps;
}
