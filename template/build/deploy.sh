#!/bin/bash 

echo '---- deploy start ----'
packageName=$1
mkdir $packageName
# touch ${packageName}/app_info.xml
mkdir ${packageName}/classes
mkdir ${packageName}/lib
mkdir ${packageName}/web
cp -R ./dist ${packageName}/web
cp -R ./static ${packageName}/web
cp ./index.html ${packageName}/web

#判断根目录下的app_info.xml是否存在，若存在就放入打包中
# if [ -f './app_info.xml' ]
# then 
# cp ./app_info.xml ${packageName}
# fi

zip -r ${packageName}.zip ${packageName}
rm -rf ${packageName}

# if [ ! -f './app_info.xml' ]
# then
# echo -e "\033[33m warning: 根目录中不存在app_info.xml！ \033[0m"
# fi
echo '---- deploy complete ----'