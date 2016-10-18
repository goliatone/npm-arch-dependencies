#! /usr/bin/env node

var path = require('path');
var arch = require('os').arch();
var pkg = require(path.join(process.cwd(), 'package.json'));

// Build arguments for npm
var dependencies = arch + 'Dependencies';
var dependenciesObj = pkg[dependencies];

if (dependenciesObj) {
    console.log('Installing dependencies for the "%s" architecture.', arch);
    var npmArgs = ['install'];
    for (var dep in dependenciesObj) {
        if (dependenciesObj.hasOwnProperty(dep)) {
            npmArgs.push(dep.concat('@').concat(dependenciesObj[dep]));
        }
    }
    var options = {
        stdio: 'inherit' // feed all child process logging into parent process
    };

    var spawn = require('child_process').spawn;
    spawn('npm', npmArgs, options);
} else {
  console.log('No specific dependencies for the "%s" architecture.', arch);
}
