@ECHO OFF
set packageName=%1

if exist %packageName% (
	rd %packageName% /s /q
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

REM if exist "app_info.xml" (
REM 	copy "app_info.xml" %packageName%
REM ) else echo "warning: 根目录中不存在app_info.xml!"

echo "deploy complete !"