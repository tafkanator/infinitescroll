var htmlParser = require('./htmlParser');

module.exports = {
	data: null,
	dom: {
		wrapperTemplate: undefined,
		itemTemplate: undefined,
		wrapper: undefined,
		container: undefined,
		track: undefined,
		items: []
	},
	dimensions: {
		itemsPerPage: 0,
		itemCount: 0,
		windowWidth: 0,
		containerWidth: 0,
		trackWidth: 0,
		itemWithPercent: 0
	},

	init: function(config) {
		// fill in basic information
		this.data = config.data;
		this.dimensions.itemCount = this.data.length;
		this.dimensions.itemsPerPage = config.itemsPerPage;

		// fill in DOM info
		this.dom.wrapperTemplate = document.querySelector('#wrap-template').innerHTML,
		this.dom.itemTemplate = document.querySelector('#item-template').innerHTML;
		this.dom.itemTemplate = this.dom.itemTemplate.trim();
		this.dom.container = document.querySelector('#' + config.containerId);

		// calculate dimensions
		this.dimensions.windowWidth = window.innerWidth;
		this.dimensions.containerWidth = this.dom.container.offsetWidth;

		this.dimensions.trackWidth = this.calculateTrackWith(
			this.dimensions.containerWidth,
			this.dimensions.itemCount,
			this.dimensions.itemsPerPage
		);

		this.dimensions.itemWithPercent = this.calculateSingleItemWidthPercent(
			this.dimensions.trackWidth,
			this.dimensions.itemCount
		);

		// generate HTML
		this.createAllItemsHTML();
		this.createWrapperHTML();

		// add all generated HTML to browser DOM
		this.dom.container.innerHTML = this.dom.wrapper;
	},

	createWrapperHTML: function() {
		this.dom.wrapper = htmlParser.parse(this.dom.wrapperTemplate, {
			items: this.dom.items.join(''),
			trackStyles: 'width:' + this.dimensions.trackWidth + 'px;'
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

	calculateTrackWith: function(containerWidth, itemCount, itemsPerPage) {
		var singleItemWidth = this.calculateSingleItemWidthPx(containerWidth, itemsPerPage);

		return Math.round(singleItemWidth * itemCount);
	},

	calculateSingleItemWidthPx: function(containerWidth, itemsPerPage) {
		return containerWidth / itemsPerPage;
	},

	calculateSingleItemWidthPercent: function(trackWith, itemCount) {
		//debugger
		return Math.round(100 / itemCount * 1000) / 1000;
	}
};