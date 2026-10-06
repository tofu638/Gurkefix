// Baut das Linux-AppImage:  npm run build:appimage
// AppImages können NUR unter Linux gebaut werden (die Werkzeuge sind Linux-Programme).
const { spawnSync } = require("child_process");
const path = require("path");

if (process.platform === "win32" || process.platform === "darwin") {
  console.error(`
🥒 Das AppImage kann auf ${process.platform === "win32" ? "Windows" : "macOS"} nicht gebaut werden.
   (Fehler wie "EPERM ... symlink" kommen genau daher.)

   Drei einfache Wege:
   1) Linux-PC oder Steam Deck:   npm install && npm run build:appimage
   2) Windows mit WSL2 (Ubuntu):  Projekt NACH ~ in WSL kopieren (nicht /mnt/c), dann wie bei 1)
   3) GitHub Actions:             Projekt auf GitHub pushen -> Actions -> "Build Gurke Client" -> Run workflow
                                  (baut .exe UND .AppImage automatisch, siehe README)
`);
  process.exit(1);
}

const r = spawnSync("npx", ["electron-builder", "--linux", "AppImage", "--x64"], {
  cwd: path.resolve(__dirname, ".."), stdio: "inherit", shell: true,
});
if (r.status === 0) console.log("\n✅ Fertig: dist/Gurke-Client-*-linux-x86_64.AppImage");
process.exit(r.status ?? 1);
