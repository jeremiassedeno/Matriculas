Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
Set WMI = GetObject("winmgmts:\\.\root\cimv2")

scriptDir = FSO.GetParentFolderName(WScript.ScriptFullName)
rootPath = FindProjectRoot(scriptDir)

jarPath = FSO.BuildPath(rootPath, "target\matriculas-0.0.1-SNAPSHOT.jar")
javaHome = WshShell.ExpandEnvironmentStrings("%JAVA_HOME%")
javaPath = FSO.BuildPath(javaHome, "bin\javaw.exe")
appUrl = "http://localhost:8080"
profilePath = FSO.BuildPath(rootPath, "target\app-browser-profile")

If Not FSO.FileExists(javaPath) Then
    javaPath = "C:\Program Files\Java\jdk-21\bin\javaw.exe"
End If

If Not FSO.FileExists(javaPath) Then
    javaPath = "javaw.exe"
End If

If FSO.FileExists(jarPath) Then
    StopBackend

    WshShell.CurrentDirectory = rootPath
    WshShell.Run """" & javaPath & """ -jar """ & jarPath & """", 0, False

    For i = 1 To 30
        WScript.Sleep 1000
        If IsAppRunning(appUrl) Then Exit For
    Next

    If IsAppRunning(appUrl) Then
        OpenAppAndWait appUrl, profilePath
    Else
        MsgBox "No se pudo iniciar el sistema. Revisa que MySQL este abierto y que el JAR este compilado."
    End If

    StopBackend
Else
    MsgBox "No encuentro el archivo JAR. Ejecuta primero compilar-matriculas.bat." & vbCrLf & vbCrLf & jarPath
End If

Function FindProjectRoot(startPath)
    currentPath = startPath

    Do While currentPath <> ""
        If FSO.FileExists(FSO.BuildPath(currentPath, "pom.xml")) Then
            FindProjectRoot = currentPath
            Exit Function
        End If

        parentPath = FSO.GetParentFolderName(currentPath)
        If parentPath = currentPath Then Exit Do
        currentPath = parentPath
    Loop

    FindProjectRoot = startPath
End Function

Function IsAppRunning(url)
    On Error Resume Next
    Set http = CreateObject("MSXML2.ServerXMLHTTP")
    http.Open "GET", url, False
    http.SetTimeouts 1000, 1000, 1000, 1000
    http.Send
    IsAppRunning = (Err.Number = 0 And http.Status >= 200 And http.Status < 500)
    Err.Clear
    On Error GoTo 0
End Function

Sub OpenAppAndWait(url, profile)
    edgePath = WshShell.ExpandEnvironmentStrings("%ProgramFiles(x86)%") & "\Microsoft\Edge\Application\msedge.exe"
    edgePath64 = WshShell.ExpandEnvironmentStrings("%ProgramFiles%") & "\Microsoft\Edge\Application\msedge.exe"
    chromePath = WshShell.ExpandEnvironmentStrings("%ProgramFiles%") & "\Google\Chrome\Application\chrome.exe"

    If FSO.FileExists(edgePath) Then
        WshShell.Run """" & edgePath & """ --user-data-dir=""" & profile & """ --app=""" & url & """", 1, True
    ElseIf FSO.FileExists(edgePath64) Then
        WshShell.Run """" & edgePath64 & """ --user-data-dir=""" & profile & """ --app=""" & url & """", 1, True
    ElseIf FSO.FileExists(chromePath) Then
        WshShell.Run """" & chromePath & """ --user-data-dir=""" & profile & """ --app=""" & url & """", 1, True
    Else
        WshShell.Run url, 1, True
    End If
End Sub

Sub StopBackend
    Set processes = WMI.ExecQuery("SELECT * FROM Win32_Process WHERE Name = 'java.exe' OR Name = 'javaw.exe'")

    For Each process In processes
        If InStr(1, process.CommandLine, "matriculas-0.0.1-SNAPSHOT.jar", vbTextCompare) > 0 Then
            process.Terminate
        End If
    Next
End Sub
