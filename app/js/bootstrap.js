var htmlParser = require('./htmlParser');

module.exports = {
	data: null,
	dom: {
		wrapperTemplate: undefined,
		itemTemplate: undefined,
		wrapper: undefined,
		container: undefined,
		track: undefined,
		items: [],
		backwardsButton: undefined,
		forwardsButton: undefined
	},
	dimensions: {
		itemsPerPage: 0,
		itemCount: 0,
		windowWidth: 0,
		containerWidth: 0,
		trackWidthPercent: 0,
		itemWithPercent: 0
	},
	scrollPosition: 0,

	init: function(config) {
		// fill in basic information
		this.data = config.data;
		this.dimensions.itemCount = this.data.length;
		this.dimensions.itemsPerPage = config.itemsPerPage;

		// fill in DOM info
		this.dom.wrapperTemplate = document.querySelector('#wrap-template').innerHTML;
		this.dom.itemTemplate = document.querySelector('#item-template').innerHTML;
		this.dom.itemTemplate = this.dom.itemTemplate.trim();
		this.dom.container = document.querySelector('#' + config.containerId);

		// buttons
		this.dom.forwardsButton = document.querySelector('#' + config.buttons.forwardsId);
		this.dom.backwardsButton = document.querySelector('#' + config.buttons.backwardsId);

		//listen buttons
		this.dom.backwardsButton.addEventListener('click', this.moveBackward.bind(this));
		this.dom.forwardsButton.addEventListener('click', this.moveForward.bind(this));

		// calculate dimensions
		this.dimensions.windowWidth = window.innerWidth;
		this.dimensions.containerWidth = this.dom.container.offsetWidth;

		this.dimensions.trackWidthPercent = this.calculateTrackWithPercent(
			this.dimensions.containerWidth,
			this.dimensions.itemCount,
			this.dimensions.itemsPerPage
		);

		this.dimensions.itemWithPercent = this.calculateSingleItemWidthPercent(this.dimensions.itemCount);

		// generate HTML
		this.createAllItemsHTML();
		this.createWrapperHTML();

		// add all generated HTML to browser DOM
		this.dom.container.innerHTML = this.dom.wrapper;
		this.dom.track = this.dom.container.querySelector('.infinite-scroll-track');

	},

	createWrapperHTML: function() {
		this.dom.wrapper = htmlParser.parse(this.dom.wrapperTemplate, {
			items: this.dom.items.join(''),
			trackStyles: 'width:' + this.dimensions.trackWidthPercent + '%;'
		});
	},

	createAllItemsHTML: function() {
		this.data.forEach(function(item) {
			item.wrapStyles = 'width:' + this.dimensions.itemWithPercent + '%;';

			this.dom.items.push(
				htmlParser.parse(this.dom.itemTemplate, item)
			)
		}.bind(this));
	},

	calculateTrackWithPercent: function(containerWidth, itemCount, itemsPerPage) {
		var singleItemWidth = this.calculateSingleItemWidthPx(containerWidth, itemsPerPage),
			trackWidthPx = singleItemWidth * itemCount,
			trackWidthPercent = trackWidthPx * 100 /  this.dimensions.containerWidth;

		return Math.round(trackWidthPercent * 1000) / 1000;

	},

	calculateSingleItemWidthPx: function(containerWidth, itemsPerPage) {
		return containerWidth / itemsPerPage;
	},

	calculateSingleItemWidthPercent: function(itemCount) {
		return Math.round(100 / itemCount * 1000) / 1000;
	},

	moveBackward: function() {
		var newPosition = Math.max(0, this.scrollPosition - this.dimensions.itemWithPercent);

		if (newPosition !== this.scrollPosition) {
			this.scrollToPosition(newPosition, 0);
		}

		this.scrollPosition = newPosition;
	},

	moveForward: function() {
		var maxPosition = 100 - (this.dimensions.itemWithPercent * this.dimensions.itemsPerPage),
			newPosition = Math.min(maxPosition, this.scrollPosition + this.dimensions.itemWithPercent);

		if (newPosition !== this.scrollPosition) {
			this.scrollToPosition(newPosition, 0);
		}

		this.scrollPosition = newPosition;
	},

	scrollToPosition: function(x, y) {
		this.cssTransformToPosition(x, y);
	},

	cssTransformToPosition: function(x, y) {
		this.dom.track.style.transform = 'translate3d(-' + x + '%, -' + y + '%, 0)';
	}
};