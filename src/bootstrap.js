var htmlParser = require('./htmlParser');

module.exports = {
	data: null,
	dom: {
		wrapperTemplate: undefined,
		itemTemplate: undefined,
		container: undefined,
		wrapper: undefined,
		items: []
	},

	init: function(config) {
		// fill in basic information
		this.data = config.data;
		this.dom.container = document.querySelector('#' + config.containerId);
		this.dom.wrapperTemplate = document.querySelector('#wrap-template').innerHTML;
		this.dom.itemTemplate = document.querySelector('#item-template').innerHTML;

		this.dom.wrapperTemplate = this.dom.wrapperTemplate.trim();
		this.dom.itemTemplate = this.dom.itemTemplate.trim();

		// generate HTML
		this.createAllItemsHTML();
		this.createWrapperHTML();

		// add all generated HTML to browser DOM
		this.dom.container.innerHTML = this.dom.wrapper;
	},

	createWrapperHTML: function() {
		this.dom.wrapper = htmlParser.parse(this.dom.wrapperTemplate, {items: this.dom.items.join('')});
	},

	createAllItemsHTML: function() {
		this.data.forEach(function(item) {
			this.dom.items.push(
				htmlParser.parse(this.dom.itemTemplate, item)
			)
		}.bind(this));
	}
};