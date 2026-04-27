const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // App Controls
  reloadApp: () => ipcRenderer.send('app-reload'),
  
  // OS Integrations
  showNotification: (title, body) => ipcRenderer.send('show-notification', { title, body }),
  
  // App Data
  getVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Event Listeners
  onUpdateStatus: (callback) => ipcRenderer.on('update-status', (_event, value) => callback(value)),
});
