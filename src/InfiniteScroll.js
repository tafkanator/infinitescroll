/* eslint-disable no-console */

export default class InfiniteScroll {

	constructor(props) {
		// validate
		if (typeof props.node !== 'object' || !(props.node instanceof HTMLElement)) {
			throw new Error('You must pass valid html element as node');
		}

		if (!Array.isArray(props.slides)) {
			throw new Error('You must pass slides as an array');
		}

		// store vars
		this.wrapNode = props.node;
		this.slides = props.slides;
		this.activeSlide = typeof props.active === 'number' ? props.active : 0;
		this.visibleSlides = typeof props.visible === 'number' ? props.visible : 3;

		// calculated vars
		this.trackNode = this.createTrackNode();
		this.slideWidth = Math.round(100 / this.visibleSlides * 100) / 100; // pct

		this.setupDom();

		// return public interface
		return {
			one: () => console.log('not implemented'),
			on: () => console.log('not implemented'),
			off: () => console.log('not implemented'),
			insert: () => console.log('not implemented'),
			remove: () => console.log('not implemented'),
			select: () => console.log('not implemented'),
			destroy: () => console.log('not implemented'),
		};
	}

	createTrackNode() {
		const trackNode = document.createElement('div');

		trackNode.classList.add('infiniteScrollTrack');

		return trackNode;
	}

	setupDom() {
		this.getRenderedSlideNodes().forEach((node) => {
			this.trackNode.appendChild(node);
		});

		this.wrapNode.appendChild(this.trackNode);
	}

	getRenderedSlideNodes() {
		return this.slides.map((slide, index) => this.createSlide(slide, index));
	}

	createSlide(content, index) {
		const slideNode = document.createElement('div');

		slideNode.classList.add('infiniteScrollSlide');
		slideNode.style.left = `${index * this.slideWidth}%`;
		slideNode.style.width = `${this.slideWidth}%`;
		slideNode.appendChild(content);

		return slideNode;
	}
}