const fs = require('fs')
const ipc = require('electron').ipcMain
const path = require('path')
const Chokidar = require('chokidar')

let watcher = null
let photos = []

ipc.on('watch-folder', (event, folder) => {
    console.info('Watch-folder event received')
    console.info(folder)
    watch(folder, event)
})

function watch (folder, event) {
    let init = true
    console.log('Loading photos in ' + folder)
    if (!fs.existsSync(folder + '/th')) {
        console.log('Creating thumb dir' + folder + '/th')
        fs.mkdirSync(folder + '/th')
    }

    // watcher && watcher.close()
    console.log('Watching photos in ' + folder)
    watcher = Chokidar.watch(folder + '/*.(jpg|JPG)', {
        ignored   : /[/\\]\./,
        depth     : 0,
        persistent: true
    })

    watcher.on('add', function (photoPath) {
        console.info('File', photoPath, 'has been added')
        let item = {name: path.basename(photoPath), path: photoPath}
        // item.thumb = folder + '/th/' + item.name
        if (init) {
            photos.push(item)
        } else {
            event.sender.send('new-photos', [item])
        }
    })

    watcher.on('ready', function () {
        console.info('Watcher ready')
        init = false
        photos = photos.sort(function (a, b) {
            return b.name.localeCompare(a.name)
        })
        // console.info(event)
        event.sender.send('new-photos', photos)
        photos = []
    })
}
