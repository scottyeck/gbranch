#! /usr/bin/env node

var _ = require("underscore-node"),
	exec = require("child_process").exec;

var userArgs = process.argv.slice(2);

var MODE = require("./src/mode"),
	Command = require("./src/command");

// Check if user passes along --verbose
if (_.indexOf(userArgs, "--verbose") > -1) {
	MODE.enable("verbose");
}

var command = {};

command.getCurrentBranchName = new Command(
	"git branch -l",
	"grep '\\*'",
	"sed 's/\\*//'"
);

command.pushCurentBranch = command.getCurrentBranchName.concat(
	"xargs git push origin"
);

var getCurrentBranchName = function(callback) {
	var child = exec("git branch -l | grep '\*' | sed 's/\*//'", function(err, stdout, stderr) {
		process.stdout.write(stdout);
		if (_.isFunction(callback)) {
			callback();
		}
	});
}

if (userArgs[0] === 'branch') {

	if (userArgs[1] === 'current') {

		var childCmd;

		if (userArgs[2] === 'push') {
			childCmd = command.pushCurentBranch.output();
		} else {
			childCmd = command.getCurrentBranchName.output()
		}

		var child = exec(childCmd, function(err, stdout, stderr) {
			process.stdout.write(stdout);
		});

		if (MODE.is('verbose')) {
			process.stdout.write(childCmd);
		}

	}
}