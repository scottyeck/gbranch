'use strict';

var path = require('path');

global.rootRequire = function(name) {
    return require(path.join(__dirname, name));
}