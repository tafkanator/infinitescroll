export default class InfiniteScroll {

	constructor(props) {
		console.log('init slider', props, typeof props.node);

		if (typeof props.node !== 'object' || !props.node instanceof HTMLElement) {
			throw new Error('You must pass valid html element as node');
		}
		this.wrapNode = props.node;

		if (!Array.isArray(props.slides)) {
			throw new Error('You must pass slides as an array');
		}
		this.slides = props.slides;

		this.insertSlidesToDom();
	}

	insertSlidesToDom() {
		this.slides.forEach(slide => {
			this.wrapNode.appendChild(slide);
		});
	}
}