@ECHO OFF
set packageName=%1

echo "---- deploy start ----"

if exist %packageName% (
	rd %packageName% /s /q
)

if exist "app_info.xml" (
	copy "app_info.xml" %packageName%
) else (
	echo "error：There is a missing app_info.xml in the root directory! Please put app_info.xml in the root directory and then execute the package"
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