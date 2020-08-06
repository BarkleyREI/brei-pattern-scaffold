'use strict';

const icons = require('../../../assets/scss/icons/selection.json');

var siteIcons = [];

if (typeof icons.icons !== 'undefined') {
	icons.icons.forEach(icon => {
		siteIcons.push(icon.properties.name);
	});
}

module.exports = {
	"title": "Icons",
	"status": "ready",
	"context": {
		"icons": siteIcons
	}
}
