/* eslint-disable @typescript-eslint/no-var-requires */
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  checkUpdate: (version) => ipcRenderer.invoke('check-update', version),
  update: () => ipcRenderer.invoke('update'),
  onGetDownloadProgress: (callback) => ipcRenderer.on('download-progress', (_event, value) => callback(value))
})