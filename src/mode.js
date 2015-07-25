'use strict';

var _ = require('underscore-node');

var DEFAULTS = {
	'verbose': false
};

var ATTRIBUTES = _.extend({}, DEFAULTS);

function Mode() {}

var validateName = function (modeName) {
	if ( ! _.isString(modeName) ) {
		throw Error('Expected type String.');
	}

	var isValid = _.indexOf(DEFAULTS, modeName);

	if ( ! isValid ) {
		throw Error('Mode name invalid');
	}

	return isValid;
};

var set = function(modeName, val) {
	validateName(modeName);
	ATTRIBUTES[modeName] = val;
	return val;
};

var get = function(modeName) {
	validateName(modeName);
	return ATTRIBUTES[modeName];
}

Mode.prototype.enable = function (modeName) {
	return set(modeName, true);
};

Mode.prototype.disable = function (modeName) {
	return set(modeName, false);
};

Mode.prototype.is = function (modeName) {
	return get(modeName);
};

module.exports = new Mode();