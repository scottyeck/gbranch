'use strict';

var _ = require('underscore-node');

var validateSteps = function (stepsArr) {

	// validate arguments
	_.each(stepsArr, function(step) {
		if (!_.isString(step)) {
			throw Error('Expected String but received ' + step + '.');
		}
	});
};

function Command() {

	var _steps;

	if (_.isArray(arguments[0])) {
		_steps = arguments[0];
	} else {
		_steps = _.values(arguments);
	}

	validateSteps(_steps);
	this.steps = _steps;
}

Command.prototype.output = function () {

	var result = "",
		self = this;

	_.each(this.steps, function(step, i) {
		
		// result += step;
		result += step;
		if (i < self.steps.length - 1) {
			result += " | "
		}
	});

	return result + '\n';
};

Command.prototype.concat = function () {
	// console.log(arguments);
	var currentSteps = this.steps.slice(0);
	var argSteps = _.values(arguments);
	var newSteps = [].concat(currentSteps, argSteps);
	return new Command(newSteps);
};

module.exports = Command;