const { app, BrowserWindow, globalShortcut } = require("electron");

const createWindow = () => {
  const config = {
    width: 1366,
    height: 768,
    title: "风声",
    useContentSize: true,
  };

  const win = new BrowserWindow(config);

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
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
