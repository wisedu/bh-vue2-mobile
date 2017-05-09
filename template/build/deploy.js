'use strict';
require('shelljs/global');

let packageName = require('../package.json').packageName;
exec('chmod u+x ./build/deploy.sh')
exec(`./build/deploy.sh ${packageName}`)


/* 旧版本
mkdir(packageName);
cp('-R', './dist', packageName);
cp('-R', './static', packageName);
cp('index.html', packageName);
exec(`zip -r ${packageName}.zip ${packageName}`);
rm('-rf', `${packageName}`)
*/