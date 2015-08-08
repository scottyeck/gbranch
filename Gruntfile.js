'use strict';

module.exports = function (grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			tests: {
				files: '**/*.js',
				tasks: ['test-run']
			}
		},

		jasmine_node: {
			options: {
				forceExit: true
			},
			all: ['test/']
		},

		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "grit", // defaults to the name in package.json, or will use project directory's name
				success: true, // whether successful grunt executions should be notified automatically
				duration: 3 // the duration of notification in seconds, for `notify-send only
			}
		},

		notify: {
			jasmine_node: {
				options: {
					title: 'jasmine-node',
					message: 'All tests passed!'
				}
			}
		}
	});

	grunt.registerTask('test-run', [
		'jasmine_node',
		'notify:jasmine_node'
	]);

	grunt.registerTask('test-watch', [
		'test-run',
		'watch:tests'
	]);
};