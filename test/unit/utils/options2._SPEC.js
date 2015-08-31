'use strict';

var _ = require('underscore-node');

var Options = rootRequire('utils/options2');

var ops;

describe('Options', function() {

	describe('.constructor()', function() {

		it('It operates as intended.', function() {
			ops = new Options();
			expect(_.isObject(ops.hash)).toBeTruthy();
		});
	});

	describe('.register()', function() {

		it('It operates as intended.', function() {

			ops
				.register('c');

			expect(_.isObject(ops.hash['c'])).toBeTruthy();
		});
	});

	describe('.unregister()', function() {
		it('It operates as intended.', function() {

			ops.register('d');

			expect(_.isObject(ops.hash['d'])).toBeTruthy();

			ops.unregister('d');
			expect(_.isObject(ops.hash['d'])).toBeFalsy();
		});
	});

	describe('.get()', function() {

		it('It operates as intended.', function() {
			expect(_.isObject(ops.get('c'))).toBeTruthy();
		});

	});

	describe('.length()', function() {
		it('It operates as intended.', function() {
			ops.register('x');
			expect(ops.length()).toEqual(2);
		});
	});

	describe('.alias()', function() {

		it('It operates as intended.', function() {
			ops.get('c').alias('current');
			expect(_.isEqual(ops.get('c').alias, 'current')).toBeTruthy();
		});

	});

	describe('.isValid()', function() {
		it('It operates as intended.', function() {
			expect(ops.isValid('c')).toBeTruthy();
			expect(ops.isValid('current')).toBeTruthy();
			expect(ops.isValid('d')).toBeFalsy();
		});
	});

	describe('.getPassAlongs()', function() {
		it('It operates as intended.', function() {
			expect(ops.getPassAlongs().length).toEqual(0);

			ops.get('c').passAlong();
			expect(ops.getPassAlongs().length).toEqual(1);
			expect(ops.getPassAlongs()).toEqual([ops.get('c')]);

			ops.register('d').passAlong();
			expect(ops.getPassAlongs().length).toEqual(2);

			ops.register('e');
			expect(ops.getPassAlongs().length).toEqual(2);
		});
	});

	describe('.clone()', function() {
		it('It operates as intended.', function() {
			var orig = new Options();
			orig.register('c');

			var cloned = orig.clone();
			cloned.register('d');

			expect(orig.get('c')).toEqual(cloned.get('c'));
			expect(orig.get('d')).not.toEqual(cloned.get('d'));
		});
	});

	describe('.filter()', function() {
		it('It operates as intended.', function() {

			var ops = new Options();

			ops.register('c');
			ops.register('d');
			ops.register('e');

			ops.filter(['c', 'd']);

			expect(ops.length()).toEqual(2);

		});
	});
});