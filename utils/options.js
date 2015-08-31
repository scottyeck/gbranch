'use strict';

var _ = require('underscore-node');

var getOptions = function(args) {

	// Keys to remove
	var cmdKeys = ['_', '$0'];

	// Clone args
	var options = _.extend({}, args);

	// Remove keys
	_.each(cmdKeys, function(key) {
		delete options[key];
	});

	return options;
};

module.exports = {
	get: getOptions
};