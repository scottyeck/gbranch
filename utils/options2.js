'use strict';

var _ = require('underscore-node');

var Option = function(flagChar, ops) {

	if (!_.isString(flagChar) || flagChar.length !== 1) {
		throw Error('Method `Options.register` requires arg `flagChar` to be String of length 1.');
	}

	this.ops = ops || {};

	if (!_.isObject(this.ops)) {
		throw Error('Method `Options.register` requires arg `ops` to be Object (if passed).')
	}

	this.flag = flagChar;

	return this;
};

Option.prototype.alias = function(aliasStr) {

	if (!_.isString(aliasStr)) {
		throw Error('Method `Option.alias` requires arg `aliasStr` to be a String.');
	}

	this.alias = aliasStr;

	return this;
};

Option.prototype.passAlong = function() {
	this.passAlong = true;
	return this;
}

Option.prototype.describe = function(description) {

	if (!_.isString(description)) {
		throw Error('Method `Option.alias` requires arg `aliasStr` to be a String.');
	}

	this.description = description;

	return this;
};

var Options = function() {
	this.hash = {};
};

Options.prototype.get = function(flagChar) {
	return this.hash[flagChar];
};

Options.prototype.length = function() {
	return _.keys(this.hash).length;
}

Options.prototype.set = function(key, val) {
	this.hash[key] = val;
};

Options.prototype.register = function(flagChar, ops) {
	var self = this;

	var option = new Option(flagChar, ops);
	this.set(flagChar, option);
	
	return option;
};

Options.prototype.unregister = function(flagChar) {
	delete this.hash[flagChar];
}

Options.prototype.isValid = function(opStr) {

	var isValid = _.has(this.hash, opStr);

	if (!isValid) {
		_.each(this.hash, function(val, key) {
			if (val.alias && val.alias === opStr) {
				isValid = true;
			}
		});
	}

	return isValid;
};

Options.prototype.getPassAlongs = function() {
	return _.where(this.hash, { passAlong: true} );
};

Options.prototype.clone = function() {
	var result = new Options();
	_.each(this.hash, function(val, key) {
		result.set(key, val);
	});
	return result;
};

Options.prototype.filter = function(keyArray) {

	var self = this;

	_.each(this.hash, function(val, key) {

		if (_.indexOf(keyArray, key) > -1 || ((val.alias) && _.indexOf(keyArray, val.alias) > -1)) {
			return;
		} else {
			self.unregister(key);
		}
	});

	return this;
};

module.exports = Options;