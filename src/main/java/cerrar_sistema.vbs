Set WMI = GetObject("winmgmts:\\.\root\cimv2")
Set processes = WMI.ExecQuery("SELECT * FROM Win32_Process WHERE Name = 'java.exe' OR Name = 'javaw.exe'")

closedCount = 0

For Each process In processes
    If InStr(1, process.CommandLine, "matriculas-0.0.1-SNAPSHOT.jar", vbTextCompare) > 0 Then
        process.Terminate
        closedCount = closedCount + 1
    End If
Next

If closedCount = 0 Then
    MsgBox "El sistema de matriculas no estaba abierto."
Else
    MsgBox "Sistema de matriculas cerrado correctamente."
End If
