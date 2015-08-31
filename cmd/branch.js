'use strict';

var _ = require('underscore-node');

var optionsUtil = rootRequire('utils/options'),
	Options = rootRequire('utils/options2'),
	CliCmd = rootRequire('utils/cli-cmd');

var CMD_OPS = new Options();

CMD_OPS
	.register('c')
	.describe('Gets name of current branch.')
	.alias('current');

CMD_OPS
	.register('d')
	.describe('Deletes specified branch (unless unmerged).')
	.passAlong();

CMD_OPS
	.register('D')
	.describe('Force-deletes specified branch (even if unmerged).')
	.passAlong();

module.exports = function(args) {

	var options = optionsUtil.get(args);

	var userOps = CMD_OPS.clone().filter(_.keys(options));

	var grepStr;
	if (args._.length > 1) {
		grepStr = args._[1];
	}

	if (options.c) {
		grepStr = '\*'
	}

	var cmd = new CliCmd('git branch -l');
	
	cmd
		.grep(grepStr)
		.pipe('xargs git branch')
		.passAlong(userOps)
		.exec();

	console.log(cmd.get());

};