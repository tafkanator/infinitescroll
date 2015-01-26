var htmlParser = require('./htmlParser');

module.exports = {
	dom: {
		container: null,
		wrapper: null,
		items: []
	},

	init: function(config) {
		//create and render DOM
		this.dom.container = document.querySelector('#' + config.containerId);

		this.createWrapperDom(document.querySelector('#wrap-template').innerHTML);
		//this.createWrapperDom(config.template.wrapper);

		this.dom.container.innerHTML = this.dom.wrapper;


	},

	createWrapperDom: function(template) {
		this.dom.wrapper = htmlParser.parse(template, [
			{items: 'tere'}
		]);
	}
};