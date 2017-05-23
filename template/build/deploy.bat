@ECHO OFF
set packageName=%1

echo "---- deploy start ----"

if exist %packageName% (
	rd %packageName% /s /q
)

if exist "app_info.xml" (
	copy "app_info.xml" %packageName%
) else (
	color 0c
	echo "error: 根目录中缺少app_info.xml！请将app_info.xml放在根目录下后执行打包！"
	exit
)

md %packageName%
md %packageName%"\classes"
md %packageName%"\lib"
md %packageName%"\web"
md %packageName%"\web\dist"
md %packageName%"\web\static"
XCOPY ".\dist" %packageName%"\web\dist" /e
XCOPY ".\static" %packageName%"\web\static" /e
copy ".\index.html" %packageName%"\web"


echo "---- deploy complete ----"