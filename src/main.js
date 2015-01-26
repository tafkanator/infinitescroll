'use strict';

//var config = require('./config');
var infiniteScroll = require('./bootstrap');

infiniteScroll.init({
	data: generateDummyData(),
	template: {
		wrapper: getWrapperTemplate(),
		item: getItemTemplate()
	},
	containerId: 'demo-scroll'
});

function generateDummyData() {
	var data = [], i = 0;

	for (i; i > 100; i++) {
		data.push({
			title: 'test ' + i
		})
	}

	return data;
}

function getWrapperTemplate() {
	return [
		'<div class="infinite-scroll">',
			'<div class="infinite-scroll-track">',
				'{{items}}',
			'</div>',
		'</div>'
	].join('');
}

function getItemTemplate() {
	return [
		'<div class="infinite-scroll-item-wrap">',
			'<div class="infinite-scroll-item">',
				'<h4>{{title}}</h4>',
			'</div>',
		'</div>'
	].join('');
}
