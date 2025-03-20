/* eslint-disable @typescript-eslint/no-var-requires */
const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const request = require("request")
const fs = require("fs")
const path = require("path")
const admZip = require('adm-zip');
const config = require("./config.json");
const baseUrl = path.resolve("./") + "/resources/";

let win

const createWindow = () => {
  const config = {
    width: 1366,
    height: 768,
    title: "风声",
    useContentSize: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  };

  win = new BrowserWindow(config);

  win.removeMenu();
  win.setAspectRatio(16 / 9);
  win.loadFile("build/web-mobile/index.html").then(() => [
    win.setTitle("风声")
  ])
  globalShortcut.register('Ctrl+Shift+C', () => {
    // 打开控制台
    if (win.webContents.isDevToolsOpened()) {
      win.webContents.closeDevTools()
    } else {
      win.webContents.openDevTools()
    }

  })
};

app.whenReady().then(() => {
  ipcMain.handle('check-update', async (event, version) => {
    return new Promise((resolve, reject) => {
      request({
        url: `http://${config.serverIP}:${config.fileServerPort}/pc/version.manifest`,
        headers: {
          'Content-Type': 'application/json'
        }
      }, (err, res, body) => {
        if (err || !res || !body) {
          if (!res) {
            resolve({
              canUpdate: false,
              message: "未能连接到服务器"
            })
            return
          }
          switch (res.statusCode) {
            case 404:
              resolve({
                canUpdate: false,
                message: "未找到服务器资源"
              })
              return
          }
        } else {
          const data = JSON.parse(body)
          if (parseInt(data.version) > version) {
            resolve({
              canUpdate: true,
              data: data
            })
            return
          } else {
            resolve({
              canUpdate: false,
              message: "已是最新版本，无需更新"
            })
            return
          }
        }
      })
    })
  })
  ipcMain.handle('update', async () => {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(`${baseUrl}app.zip`);
      const url = `http://${config.serverIP}:${config.fileServerPort}/pc/app.zip`;
      const req = request(url)
      let total = 0;
      let current = 0;
      req.on('response', function (data) {
        total = parseInt(data.headers['content-length'])
      })
      req.on('data', (chunk) => {
        current += chunk.length
        win.webContents.send("download-progress", current / total)
      });
      req.on('close', () => {
        if (total > 0) {
          try {
            const unzip = new admZip(`${baseUrl}app.zip`); //下载压缩更新包
            unzip.extractAllTo(`${baseUrl}`, /*overwrite*/ true); //解压替换本地文件
          } catch (e) { }
          fs.unlink(`${baseUrl}app.zip`, () => { });
          app.relaunch({
            args: process.argv.slice(1)
          });
          app.exit(0);
        }
        resolve()
      });
      req.pipe(stream)
    })
  })
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
