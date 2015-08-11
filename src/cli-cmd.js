'use strict';

var _ = require('underscore-node'),
	exec = require('child_process').exec;

function CliCmd(newStr) {
	this.execStr = newStr;
	return this;
}

CliCmd.prototype.get = function() {
	return this.execStr;
};

CliCmd.prototype.set = function(newStr) {
	this.execStr = newStr;
	return this;
};

CliCmd.prototype.pipe = function(pipeStr) {
	var newStr = [this.get(), pipeStr].join(' | ');
	this.set(newStr);
	return this;
};

CliCmd.prototype.clone = function() {
	var result = new CliCmd();
	result.set(this.get());
	return result;
};

CliCmd.prototype.exec = function() {
	var child = exec(this.get(), function(err, stdout, stderr) {
		if (stderr) {
			process.stdout.write(stderr);
		}
		process.stdout.write(stdout);
	});
};

module.exports = CliCmd;