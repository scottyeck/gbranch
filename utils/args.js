'use strict';

var _ = require('underscore-node');

// Re-organizes flag values in yargs hash as desired.
// For example:
//  - INPUT:  { _: [ 'branch' ], D: 'hello', '$0': 'grit' }
//  - OUTPUT: { _: [ 'branch', 'hello' ], D: true, '$0': 'grit' }
var transformArgs = function(yargs) {

	// Strips keys to isolate flags
	var stripKeys = ['_', '$0'];
	var flags = _.reject(_.keys(yargs), function(key) {
		return _.indexOf(stripKeys, key) > -1;
	});

	// If flag val is truthy but not `true` as bool, move the val
	// to _ and set new val as true.
	_.each(flags, function(flag) {
		if (yargs[flag] && yargs[flag] !== true) {
			yargs._.push(yargs[flag]);
			yargs[flag] = true;
		}
	});

	return yargs;
};

var getArgs = function() {
	var yargv = require('yargs').argv,
		args = transformArgs(yargv);

	return args;
};

module.exports = {
	get: getArgs
};