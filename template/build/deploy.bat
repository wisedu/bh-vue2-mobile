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
echo nul>%packageName%"\EMAP_APP"
XCOPY ".\dist" %packageName%"\web\dist" /e
XCOPY ".\static" %packageName%"\web\static" /e
copy ".\index.html" %packageName%"\web"

if exist "app_info.xml" (
	copy "app_info.xml" %packageName%
) else echo "warning: 根目录中不存在app_info.xml!"

echo "deploy complete !"