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

		nodeunit: {
			all: ['test/**/*.js', '!Gruntfile.js'],
			options: {
				reporter: 'verbose'
			}
		},

		notify_hooks: {
			options: {
				enabled: true,
				max_jshint_notifications: 5, // maximum number of notifications from jshint output
				title: "UI Toolkit", // defaults to the name in package.json, or will use project directory's name
				success: true, // whether successful grunt executions should be notified automatically
				duration: 3 // the duration of notification in seconds, for `notify-send only
			}
		},

		notify: {
			nodeunit: {
				options: {
					title: 'Nodeunit task complete...',
					message: 'All tests passed!'
				}
			}
		}
	});

	grunt.registerTask('test-run', [
		'nodeunit:all',
		'notify:nodeunit'
	]);

	grunt.registerTask('test-watch', [
		'test-run',
		'watch:tests'
	]);
};