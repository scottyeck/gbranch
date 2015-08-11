'use strict';

var _ = require('underscore-node'),
	execSync = require('child_process').execSync;

var verifyMatches = require('./verify-matches.js');

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

CliCmd.prototype.grep = function(grepStr) {
	var pipeStr = 'grep \'' + grepStr + '\'';
	this.pipe(pipeStr)
		.pipe("sed 's/\\*//'");

	this.isValid = verifyMatches(this.get(), grepStr);

	return this;
}

CliCmd.prototype.clone = function() {
	var result = new CliCmd();
	result.set(this.get());
	return result;
};

CliCmd.prototype.exec = function() {
	if (!this.isValid) {
		return;
	}

	var result = execSync(this.get(), {encoding: 'utf-8'});
	if (_.isString(result)) {
		process.stdout.write(result);
	} else if (_.isObject) {
		if (result.stderr) {
			process.stderr.write(result.stderr);
		}
		if (result.stdout) {
			process.stdout.write(result.stdout);
		}
	}
};

module.exports = CliCmd;