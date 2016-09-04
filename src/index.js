/* eslint-disable no-console */

import './gfx/main.scss';
import InfiniteScroll from './InfiniteScroll';

let counter = 0;

function createRandomSlide() {
	const slideDom = document.createElement('div');
	slideDom.classList.add('slide');
	slideDom.innerHTML = `Slide #${counter++}`;

	return slideDom;
}

const slider1 = new InfiniteScroll({
	node: document.querySelector('#slider-1'),
	slides: Array.from(Array(20)).map(createRandomSlide),
	visible: 4,
	active: 5,
});

console.log('slider 1', slider1);