import {
  app,
  BrowserWindow,
  Tray,
  systemPreferences
} from 'electron';
import path from 'path'

if (require('electron-squirrel-startup')) {
  app.quit();
}

const assetsDirectory = path.join(__dirname, '/assets')

app.dock.hide()

let mainWindow;
let tray;

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'iconTemplate.png'))
  tray.on('click', (event) => {
    toggleWindow()
  })
}

const getWindowPosition = () => {
  const windowBounds = mainWindow.getBounds()
  const trayBounds = tray.getBounds()

  const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

  const y = Math.round(trayBounds.y + trayBounds.height + 8)

  return {
    x: x,
    y: y
  }
}

systemPreferences.subscribeNotification(
  'AppleInterfaceThemeChangedNotification',
  function theThemeHasChanged () {
    if(systemPreferences.isDarkMode()){
      mainWindow.webContents.executeJavaScript(`
        document.body.classList.add('dark')
      `)
    }else{
      mainWindow.webContents.executeJavaScript(`
        document.body.classList.remove('dark')
      `)
    }
  }
)

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 350,
    height: 500,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    icon: __dirname + '/assets/logo.icns'
  });
  mainWindow.loadURL(`https://accounts.google.com/signin/v2/identifier?hl=ru&passive=true&continue=https%3A%2F%2Ftasks.google.com%2Fembed%2F%3Forigin%3Dhttps%3A%2F%2Fmail.google.com%26hai%3D3%26hc%3D4%2C1%2C5%26forcehl%3D1%26usegapi%3D1&flowName=GlifWebSignIn&flowEntry=ServiceLogin#identifier`);
  mainWindow.setTitle('Google Tasks')
  mainWindow.webContents.on('dom-ready', () => {
    let dark = systemPreferences.isDarkMode()
    mainWindow.webContents.executeJavaScript(`
      let a = document.querySelector('[jsname="plIjzf"]')

      ${dark ? "document.body.classList.add('dark')" : "document.body.classList.remove('dark')"}

      if(a){
        a.setAttribute('data-tooltip', 'Theme')
        a.querySelector('.DPvwYc').innerText = 'brightness_2'
        a.addEventListener('click', ()=>{
          document.body.classList.toggle('dark')
        })
      }
    `)
    mainWindow.webContents.insertCSS(`
      body{
        display: block!important
      }
      .G4zhSc, .CTxcDf, .oXBvod, .Sze5Fc{
        width: 100%!important;
      }
      .B9yICe:not(.FmmzFc) [jsname="plIjzf"]{
        display: none!important;
      }
      body.dark{
        background-color: #333;
        --back: #333;
        --primary: #fff;
        color: #fff;
    }
    
    .dark .oxAbDf.u3bW4e::before{
      border-color: #555;
    }

    ::-webkit-scrollbar-thumb{
        background-color: #555;
    }
    
    .dark .B9yICe {
        background-color: var(--back);
        color: var(--primary);
        border-color: #555555;
    }

    .dark .oxAbDf.OOHrV{
      background-color: #444;
    }
    
    .dark .DPvwYc, .dark .fKz7Od {
        color: rgba(255,255,255,.54);
        fill: rgba(255,255,255,.54);
    }
    
    .dark .oxAbDf {
        background-color: var(--back);
    }
    
    .dark .qpGJsd, .dark .rhGwLe, .dark .tL9Q4c, .dark .zHQkBf{
        color: var(--primary);
    }
    
    .dark .oxAbDf:hover::before{
      border-color: #525252;
    }
    
    .dark .oxAbDf::before{
        border-color: #555;
    }
    
    .dark .UhNUGe{
        background-color: transparent;
    }
    
    .dark .OyPDvb{
        color: var(--primary);
    }
    
    .dark .UhNUGe:hover, .dark .UhNUGe:focus{
        background-color: rgba(255,255,255,.1);
    }
    
    .dark .oXBvod.MdU9l .Sze5Fc{
        background-color: var(--back);
        color: var(--primary);
        border-color: #555;
    }
    
    .dark .Wde9Bc:not(.CWc3Zb) .BjZULd::after{
        background-color: #555;
    }
    
    
    .dark .oXBvod.MdU9l:not(.sMVRZe) {
        border-color: #555;
    }
    
    .dark .JbNP1e {
        color: #eee!important;
    }
    
    .dark .SltZ5e .NlWrkb {
        color: var(--primary);
    }
    
    .dark .JPdR6b.qjTEB{
        background-color: var(--back);
    }
    
    .dark .z80M1{
        color: var(--primary);
    }

    .dark .VSy5Dc{
      color: #4285f4!important;
    }
    
    .dark .FwR7Pc, .dark .z80M1.FwR7Pc{
        background-color: rgba(255,255,255,.2)
    }

    .dark .WBaDKd .uyYuVb{
      color: var(--primary);
    }
    
    .dark .z80M1.N2RpBe::before{
        border-color: #eee;
    }
    
    .dark .RKlVnf{
        color: var(--primary);
    }
    
    .dark .g3VIld{
        background-color: var(--back);
    }
    
    .dark .Ewd0Fc{
        border-color: #555;
    }
    
    .dark .bNIZpe{
        color: #eee;
    }
    
    .dark .U1lyme .oJeWuf{
        background-color: #444;
    }
    
    .dark .Nm5pwe{
        background-color: #444;
    }
    
    .dark .lzIjk .LMgvRb{
        color: #fff;
    }
    
    .dark .Nm5pwe .lzIjk .oJeWuf{
        background-color: transparent;
    }
    
    .dark .ncFHed .MocG8c.KKjvXb, .dark .ncFHed{
        background-color: var(--back);
    }
    
    .dark .U1lyme .SbpRX:not(:disabled){
        color: #fff;
    }
    
    .dark .rPTMxb{
        color: #a2a2a2;
    }
    .dark .nnsg6 {
      background-color: var(--back);
  }
  
  .dark .V9NiMc{
      color: var(--primary);
  }
  
  .dark .FmNPqf {
      background-color: var(--back);
      color: var(--primary);
  }
  
  .dark .c5Eg0.DuSr9b {
      border-color: #555;
  }
  
  .dark .FuZZcf {
      stroke: rgba(255,255,255,.54);
  }
  
  .dark .c5Eg0 .F262Ye:not(.eFxgkf) {
      background-color: #85a6dc;
  }
  
  .dark .lq5Efd {
      border-color: #3e3e3e;
      background-color: #3e3e3e;
      color: #fff;
  }
  
  .dark .cHxrOd {
      color: #eee;
  }
  
  .dark .g3VIld .rFrNMe .aXBtI {
      background-color: #333;
  }
    `)
  });
  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide()
    }
  })
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide()
  } else {
    showWindow()
  }
}

const showWindow = () => {
  const position = getWindowPosition()
  mainWindow.setPosition(position.x, position.y, false)
  mainWindow.show()
  mainWindow.focus()
}

app.on('ready', () => {
  createTray()
  createWindow()
  showWindow()
});

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