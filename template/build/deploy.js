'use strict';
require('shelljs/global');
let fs = require('fs')
let os = require('os')
let platform = os.platform()
let child_process = require('child_process')

let packageName = require('../package.json').packageName;
if (platform === 'win32') {
	child_process.execFile(`.\\build\\deploy.bat`, [`${packageName}`], undefined, function (error, stdout, stderr) {
		console.log(error)
		console.log(stdout)
		console.log(stderr)
	})
} else {
	exec('chmod u+x ./build/deploy.sh')
	exec(`./build/deploy.sh ${packageName}`)
}

/* 旧版本
mkdir(packageName);
cp('-R', './dist', packageName);
cp('-R', './static', packageName);
cp('index.html', packageName);
exec(`zip -r ${packageName}.zip ${packageName}`);
rm('-rf', `${packageName}`)
*/