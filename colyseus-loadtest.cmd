@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\@colyseus\loadtest\bin\colyseus-loadtest" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\@colyseus\loadtest\bin\colyseus-loadtest" %*
)