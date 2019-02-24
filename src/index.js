import {
  app,
  BrowserWindow,
  Menu
} from 'electron';

if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const template = [
  {
    label: 'Edit',
    submenu: [
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { role: 'selectall' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  }
]

if (process.platform === 'darwin') {
  template.unshift({
    label: 'Google Tasks',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  })
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 600,
    minWidth: 300,
    minHeight: 300,
    icon: __dirname + '/assets/logo.icns',
    titleBarStyle: 'hiddenInset',
  });

  mainWindow.loadURL(`https://tasks.google.com/embed/?origin=https%3A%2F%2Fmail.google.com&hai=3&hc=4%2C1%2C5&forcehl=1&usegapi=1`);
  mainWindow.setTitle('Google Tasks')
  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.executeJavaScript(`document.title = "Google Tasks"`)
    mainWindow.webContents.insertCSS(`
      body{
        display: block!important
      }
      body::after {
        content: "";
        display: block;
        z-index: 10000;
        height: 36px;
        width: 100%;
        top: 0;
        left: 0;
        position: fixed;
        -webkit-app-region: drag;
      }
      .wrapper{
        padding-top: 36px!important;
        box-sizing: border-box!important;
      }
      .B9yICe{
        height: 84px!important;
        padding: 20px 6px 0 6px!important;
      }
      .kFwPee{
        padding: 0!important;
        margin-top: 84px!important;
        height: calc(100% - 84px)!important;
      }
      .ydMMEb{
        height: 0px!important;
      }
      ::-webkit-scrollbar-thumb{
        -webkit-border-radius: 0!important;
        border-radius: 0!important;
      }
      .G4zhSc, .CTxcDf, .oXBvod, .Sze5Fc{
        width: 100%!important;
      }
      [jsname="plIjzf"]{
        display: none!important;
      }
      .G69P1e{
        position: fixed!important;
        width: 100%!important;
      }
      .k2Vdje{
        padding: 96px 24px 8px 24px!important;
      }
    `)
  });
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
