#! /usr/bin/env node

var _ = require('underscore-node'),
	exec = require("child_process").exec,
	commander = require('commander');

var Command = require("./src/command");

var command = {};

command.getCurrentBranchName = new Command(
	"git branch -l",
	"grep '\\*'",
	"sed 's/\\*//'"
);

command.pushCurentBranch = command.getCurrentBranchName.concat(
	"xargs git push origin"
);

var execs = {
	getCurrentBranchName: function(callback) {
		var child = exec(command.getCurrentBranchName.output(), function(err, stdout, stderr) {
			process.stdout.write(stdout);
			if (_.isFunction(callback)) {
				callback();
			}
		});
	}
};

commander
	// .version
	.command('name')
	.action(execs.getCurrentBranchName);

commander.parse(process.argv);