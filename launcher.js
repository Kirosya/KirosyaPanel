const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

const InstallDir = 'C:\\KirosyaPanel';
const LauncherExePath = path.join(InstallDir, 'KirosyaPanel.exe');
const ServerExePath = path.join(InstallDir, 'KirosyaServer.exe');
const LocalVersionFile = path.join(InstallDir, 'version.txt');
const RemoteVersionUrl = "https://raw.githubusercontent.com/Runteryaa/sb-aspava/main/version.txt?t=";
const RemoteServerUrl = "https://raw.githubusercontent.com/Runteryaa/sb-aspava/main/print-server/KirosyaServer.exe";

function createShortcuts() {
    try {
        const vbsPath = path.join(process.env.TEMP, 'CreateShortcut.vbs');
        const script = `
Set oWS = WScript.CreateObject("WScript.Shell")
sLinkFile1 = oWS.SpecialFolders("Startup") & "\\KirosyaPanel.lnk"
Set oLink1 = oWS.CreateShortcut(sLinkFile1)
oLink1.TargetPath = "${LauncherExePath}"
oLink1.WorkingDirectory = "${InstallDir}"
oLink1.Description = "KirosyaPanel Yazdirma Sunucusu"
oLink1.Save

sLinkFile2 = oWS.SpecialFolders("Programs") & "\\KirosyaPanel.lnk"
Set oLink2 = oWS.CreateShortcut(sLinkFile2)
oLink2.TargetPath = "${LauncherExePath}"
oLink2.WorkingDirectory = "${InstallDir}"
oLink2.Description = "KirosyaPanel Yazdirma Sunucusu"
oLink2.Save
        `;
        fs.writeFileSync(vbsPath, script);
        execSync(`cscript //nologo "${vbsPath}"`);
        fs.unlinkSync(vbsPath);
    } catch (err) {
        console.log("Kisayol olusturulamadi: " + err.message);
    }
}

function killServer() {
    try {
        execSync('taskkill /f /im KirosyaServer.exe', { stdio: 'ignore' });
    } catch (e) {
        // Ignored
    }
}

function startServer() {
    if (fs.existsSync(ServerExePath)) {
        console.log("[BASLAT] KirosyaPanel (Sunucu) baslatiliyor...");
        spawn(ServerExePath, [], { detached: true, stdio: 'ignore' });
    } else {
        console.log("[HATA] Sunucu dosyasi bulunamadi. Lutfen internet baglantinizi kontrol edip tekrar deneyin.");
    }
}

function checkAndUpdate() {
    let localVersion = "0.0.0";
    if (fs.existsSync(LocalVersionFile)) {
        localVersion = fs.readFileSync(LocalVersionFile, 'utf8').trim();
    }

    console.log(`[KONTROL] Yerel Surum: ${localVersion}`);
    console.log("[KONTROL] Guncellemeler denetleniyor...");

    https.get(RemoteVersionUrl + Date.now(), (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            let remoteVersion = data.trim();
            if (remoteVersion === "404: Not Found" || !remoteVersion) {
                remoteVersion = localVersion;
            }

            if (remoteVersion !== localVersion || !fs.existsSync(ServerExePath)) {
                console.log(`[GUNCELLEME] Yeni surum bulundu: ${remoteVersion}`);
                console.log("[GUNCELLEME] Dosyalar indiriliyor, lutfen bekleyin...");
                
                killServer();
                
                const file = fs.createWriteStream(ServerExePath);
                https.get(RemoteServerUrl, (res2) => {
                    if (res2.statusCode !== 200) {
                        console.log("[HATA] Sunucu dosyasi indirilemedi.");
                        startServer();
                        return;
                    }
                    res2.pipe(file);
                    file.on('finish', () => {
                        file.close();
                        fs.writeFileSync(LocalVersionFile, remoteVersion);
                        console.log("[GUNCELLEME] Basariyla tamamlandi.");
                        startServer();
                    });
                }).on('error', () => {
                    console.log("[HATA] Sunucu dosyasi indirilemedi.");
                    startServer();
                });
            } else {
                console.log("[OK] Sistem guncel.");
                startServer();
            }
        });
    }).on('error', () => {
        console.log("[KONTROL] Sunucuya baglanilamadi. Mevcut surumle devam ediliyor.");
        startServer();
    });
}

function main() {
    if (!fs.existsSync(InstallDir)) {
        fs.mkdirSync(InstallDir, { recursive: true });
    }

    const currentProcess = process.execPath;
    if (currentProcess.toLowerCase() !== LauncherExePath.toLowerCase() && currentProcess.endsWith('.exe')) {
        console.log("[KURULUM] Sistem dosyalari hazirlaniyor...");
        try {
            if (fs.existsSync(LauncherExePath)) {
                fs.unlinkSync(LauncherExePath);
            }
            fs.copyFileSync(currentProcess, LauncherExePath);
            createShortcuts();
            console.log("[KURULUM] Tamamlandi. Uygulama baslatiliyor...");
            spawn(LauncherExePath, [], { detached: true, stdio: 'ignore' });
            process.exit(0);
        } catch (e) {
            console.log("Hata: " + e.message);
        }
    } else {
        checkAndUpdate();
    }
}

main();
