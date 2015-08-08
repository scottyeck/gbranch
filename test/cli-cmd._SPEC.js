'use strict';

var _ = require('underscore-node');

var Command = require('../src/cli-cmd.js');

describe('cli-cmd.js', function() {

	it('should be a function', function() {
		expect(_.isFunction(Command)).toBeTruthy();
	});

	it('should return an object.', function() {
		var cmd = new Command();
		expect(_.isObject(cmd)).toBeTruthy();
	});

	it('should get correctly.', function() {
		var testStr = 'hello world';
		var cmd = new Command(testStr);
		expect(_.isEqual(cmd.get(), testStr)).toBeTruthy();
	});

	it('should set correctly.', function() {
		var testStr = 'hello world',
			testStr2 = 'hello again';
		var cmd = new Command(testStr);
		cmd.set(testStr2);
		expect(_.isEqual(cmd.get(), testStr2)).toBeTruthy();
	});

	it('should pipe correctly.', function() {
		var testStr = 'hello world',
			testStr2 = 'hello again';
		var cmd = new Command(testStr);
		cmd.pipe(testStr2);
		expect(_.isEqual(cmd.get(), testStr + ' | ' + testStr2)).toBeTruthy();
	});

	it('supports method chaining.', function() {
		var cmd = new Command('hello').pipe('goodbye');
		expect(_.isEqual(cmd.get(), 'hello | goodbye')).toBeTruthy();
	});

	it('clones as desired.', function() {
		var cmd = new Command('hello');
		var clone = cmd.clone().pipe('goodbye');
		expect(_.isEqual(cmd.get(), 'hello')).toBeTruthy();
		expect(_.isEqual(clone.get(), 'hello | goodbye')).toBeTruthy();
	});
});