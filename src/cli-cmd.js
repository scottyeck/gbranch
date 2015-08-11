'use strict';

var _ = require('underscore-node'),
	execSync = require('child_process').execSync;

var verifyMatches = require('./verify-matches.js');

function PrivateCliCmd(newStr) {
	this.execStr = newStr;
	return this;
}

PrivateCliCmd.prototype.get = function() {
	return this.execStr;
};

PrivateCliCmd.prototype.set = function(newStr) {
	this.execStr = newStr;
	return this;
};

PrivateCliCmd.prototype.pipe = function(pipeStr) {
	var newStr = [this.get(), pipeStr].join(' | ');
	this.set(newStr);
	return this;
};

PrivateCliCmd.prototype.grep = function(grepStr) {
	var pipeStr = 'grep \'' + grepStr + '\'';
	this.pipe(pipeStr)
		.pipe("sed 's/\\*//'");

	this.isValid = verifyMatches(this.get(), grepStr);

	return this;
}

PrivateCliCmd.prototype.exec = function() {
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

function CliCmd(newStr) {

	var instance = new PrivateCliCmd(newStr);

	this.get = instance.get.bind(instance);
	this.set = instance.set.bind(instance);
	this.pipe = instance.pipe.bind(instance);
	this.grep = instance.grep.bind(instance);
	this.exec = instance.exec.bind(instance);
}

CliCmd.prototype.clone = function() {
	var result = new CliCmd();
	result.set(this.get());
	return result;
};

module.exports = CliCmd;