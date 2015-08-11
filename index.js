#! /usr/bin/env node

var _ = require('underscore-node'),
	exec = require('child_process').exec,
	execSync = require('child_process').execSync,
	program = require('commander'),
	pkg = require('./package.json');

var CliCmd = require('./src/cli-cmd.js');

var getBranchSearchCmd = function(_grepStr, parent) {
	var cmd = new CliCmd();
	cmd.set("git branch -l")
		.grep(grepStr);

	return cmd;
}

var getGrepStr = function(parent) {
	if (parent.current) {
		grepStr = '\*';
	} else {
		grepStr = parent.args[0];
	}

	return grepStr;
}

program
	.version(pkg.version)
	.option('-c --current', 'Current branch')
	.option('-f --force', 'force push');

program
	.command('branch')
	.action(function() {
		var grepStr = getGrepStr(this.parent);
		getBranchSearchCmd(grepStr).exec();
	});

program
	.command('push')
	.action(function() {
		var grepStr = getGrepStr(this.parent),
			cmd = getBranchSearchCmd(grepStr);

		var cmdStr = 'xargs git push origin';
		if (this.parent.force) {
			cmdStr += ' --force'
		}

		cmd.pipe(cmdStr);
		cmd.exec();
	});

program
	.command('checkout')
	.action(function() {
		var grepStr = getGrepStr(this.parent),
			cmd = getBranchSearchCmd(grepStr);

		cmd.pipe('xargs git checkout');
		cmd.exec();
	});

program
	.command('merge')
	.action(function() {
		var grepStr = getGrepStr(this.parent),
			cmd = getBranchSearchCmd(grepStr);

		cmd.pipe('xargs git merge');
		cmd.exec();
	});

program.parse(process.argv);
