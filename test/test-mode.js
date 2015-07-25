'use strict';

var _ = require('underscore-node');

var MODE = require('../src/mode.js');

exports['enables'] = function (test) {
	test.equal(MODE.is('verbose'), false);
	MODE.enable('verbose');
	test.equal(MODE.is('verbose'), true);
	test.done();
}

exports['disables'] = function (test) {
	MODE.enable('verbose');
	test.equal(MODE.is('verbose'), true);
	MODE.disable('verbose');
	test.equal(MODE.is('verbose'), false);
	test.done();
}

