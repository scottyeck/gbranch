'use strict';

var _ = require('underscore-node'),
	execSync = require('child_process').execSync;

var getMatches = function(cmdStr) {
	var stdout = execSync(cmdStr, {encoding: 'utf-8'});

	// Remove newline characters
	stdout = stdout.replace(/\n/gm, '');

	// Trim spaces from begining
	stdout = stdout.trim(' ');

	// Check if stdout contains letter or number
	if (!stdout.match(/\w/i)) {
		return [];
	}

	return stdout.split(' ');
};

var verifyMatches = function(cmdStr, grepStr) {

	var matches = getMatches(cmdStr);

	if (matches.length === 1) {
		return true;
	}

	if (matches.length > 1) {
		var msg = [
			'Grit detected non-unique branch name.',
			'Your query `' + grepStr + '` matched the following local branches:'
		];

		_.each(matches, function(match) {
			msg.push('\t' + match)
		});

		msg.push('Please provide a more specific query.\n');
		msg = msg.join('\n');
		process.stderr.write(msg);

	} else if (matches.length < 1) {
		var msg = [
			'Grit detected unmatched branch name.',
			'Your query `' + grepStr + '` matched no known local branches.',
			'Please provide a more accurate query.\n'
		];
		msg = msg.join('\n')
		process.stderr.write(msg);
	}

	return false;

};

module.exports = verifyMatches;