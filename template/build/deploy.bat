@ECHO OFF
set name=%1
echo "---- deploy start ----"
echo "---- delete file start ----"
if exist "%name%" (
    rd "%name%" /s /q
)
echo "---- delete file complete ----"
echo "---- add file start ----"
md "%name%"
md "%name%\classes"
md "%name%\config"
md "%name%\lib"
md "%name%\web"
md "%name%\web\dist"
md "%name%\web\static"
XCOPY ".\dist" "%name%\web\dist" /e
XCOPY ".\static" "%name%\web\static" /e
copy ".\index.html" "%name%\web"
echo "---- add file complete ----"
if exist "app_info.xml" (
    echo "---- app_info has ----"
    copy "app_info.xml" "%name%"
    echo "---- app_info copyed ----"
) else (
    echo "error:there is a missing app_info.xml in the root directory! please put app_info.xml in the root directory and then execute the package"
    rd "%name%" /s /q
    exit
)
echo "---- deploy complete ----"
