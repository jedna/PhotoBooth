'use strict'

import {app, BrowserWindow} from 'electron'

import path from 'path'

require('./ImageWatcher')

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${require('../../../config').port}`
    // ? `file://${__dirname}/../../dist/index.html`
    : `file://${__dirname}/index.html`

function createWindow () {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 600,
        width : 800,
        // icon  : path.join(__dirname, '../renderer/assets/img/logo.png'),
        icon  : path.join(__dirname, '../renderer/assets/img/logo.png'),
        webPreferences: {
            webSecurity: false
        }
    })

    mainWindow.loadURL(winURL)

    // mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // eslint-disable-next-line no-console
    console.log('mainWindow opened')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
