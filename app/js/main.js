'use strict';

//var config = require('./config');
var infiniteScroll = require('./bootstrap');
document.addEventListener("DOMContentLoaded", function() {
	infiniteScroll.init({
		data: generateDummyData(),
		containerId: 'demo-scroll',
		itemsPerPage: 4
	});
});

function generateDummyData() {
	var data = [], i = 0;

	for ( ; i < 100; i++) {
		data.push({
			title: 'test ' + (i + 1)
		})
	}

	return data;
}
