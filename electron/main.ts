import { app, BrowserWindow, shell, ipcMain  } from 'electron'
import * as path from 'path'
import * as url from 'url'

let win: BrowserWindow

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 1040,
    height: 620,
    backgroundColor: '#000000',
    webPreferences: {
      nodeIntegration: true
    },
    //icon: path.join(__dirname, '/../../dist/angular-electron/assets/icons/png/256x256.png')
  })

  //win.loadURL(`file://${__dirname}/dist/index.html`)

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  )

  //win.setMaximumSize(1300, 760);

  win.setMinimumSize(900, 480);
  win.setMenu(null);

  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null
  })

}
