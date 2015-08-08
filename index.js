#! /usr/bin/env node

var _ = require('underscore-node'),
	exec = require('child_process').exec,
	program = require('commander');

var CliCmd = require('./src/cli-cmd.js')

var getBranchSearchCmd = function(grepStr) {

	var cmd = new CliCmd();

	cmd.set("git branch -l")
		.pipe("grep '" + grepStr + "'")
		.pipe("sed 's/\\*//'");

	return cmd;
}

program
	// .version
	.option('-c --current', 'Current branch')
	.option('-f --force', 'force push');

program
	.command('branch')
	.action(function() {
		var cmd, grepStr;
		if (this.parent.current) {
			cmd = getBranchSearchCmd('\*')
		} else {
			grepStr = this.parent.args[0];
			cmd = getBranchSearchCmd(grepStr);
		}

		cmd.exec();
	});

program.parse(process.argv);
