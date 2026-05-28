Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")

scriptDir = FSO.GetParentFolderName(WScript.ScriptFullName)
desktopPath = WshShell.SpecialFolders("Desktop")
shortcutPath = FSO.BuildPath(desktopPath, "Sistema de Matriculas.lnk")
targetPath = FSO.BuildPath(scriptDir, "iniciar_sistema.vbs")

Set shortcut = WshShell.CreateShortcut(shortcutPath)
shortcut.TargetPath = targetPath
shortcut.WorkingDirectory = scriptDir
shortcut.Description = "Abrir Sistema de Matriculas"
shortcut.Save

MsgBox "Acceso directo creado en el escritorio:" & vbCrLf & shortcutPath
