import './gfx/main.scss';
import InfiniteScroll from './InfiniteScroll';

const slideDom = document.createElement('div');
slideDom.classList.add('slide');
slideDom.innerHtml = 'slide';

const slider1 = new InfiniteScroll({
	node: document.querySelector('#slider-1'),
	slides: [slideDom, slideDom, slideDom, slideDom, slideDom, slideDom, slideDom],
});

console.log(slider1);
console.log('tere');
