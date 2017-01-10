'use strict';

require('shelljs/global');

let packageName = require('../package.json').packageName;

mkdir(packageName);
cp('-R', './dist', packageName);
cp('-R', './static', packageName);
cp('index.html', packageName);
exec(`zip -r ${packageName}.zip ${packageName}`);
rm('-rf', `${packageName}`)
