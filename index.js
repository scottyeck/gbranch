#! /usr/bin/env node

require('./root-require.js');

var _ = require('underscore-node')
	argsUtil = rootRequire('utils/args');

var args = argsUtil.get();
var cmd = args._[0];

switch (cmd) {
	case 'branch':
		rootRequire('cmd/branch')(args);
		break;
	default:
		console.log('Invalid command given');
		break;
}