const { app, BrowserWindow, Menu, ipcMain, shell, Notification } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

// Optional: check if we are in dev mode
const isDev = process.env.NODE_ENV !== 'production';

let mainWindow;
const PORT = 5001;
const APP_URL = `http://localhost:${PORT}`;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1024,
    minHeight: 700,
    title: 'LungAI - Medical AI Portal',
    backgroundColor: '#ffffff',
    show: false, // Wait until ready-to-show
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Modern transparent custom title bar (Optional for mac)
  if (process.platform === 'darwin') {
    mainWindow.setTitleBarStyle('hiddenInset');
  }

  // Handle loading local web app or offline fallback
  loadApplication();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Check for updates once window is ready
    if (!isDev) {
      autoUpdater.checkForUpdatesAndNotify();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Intercept new window events to open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http') && !url.includes(`localhost:${PORT}`)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
}

function loadApplication() {
  // Try to load the local server
  mainWindow.loadURL(APP_URL).catch((err) => {
    console.log('Failed to connect to local server, loading offline fallback.');
    mainWindow.loadFile(path.join(__dirname, 'offline.html'));
  });

  // Re-check logic on navigation failure (server died)
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
    if (validatedURL.startsWith(APP_URL)) {
      mainWindow.loadFile(path.join(__dirname, 'offline.html'));
    }
  });
}

// IPC Events from Preload
ipcMain.on('app-reload', () => {
  loadApplication();
});

ipcMain.on('show-notification', (event, { title, body }) => {
  new Notification({ title, body }).show();
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// App Lifecycle
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// Auto-Updater Events
autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update-status', 'Update available. Downloading...');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update-status', 'Update ready to install. Restarting soon...');
  setTimeout(() => {
    autoUpdater.quitAndInstall();
  }, 3000);
});
