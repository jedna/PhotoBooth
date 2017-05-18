const fs = require('fs')
const ipc = require('electron').ipcMain
const path = require('path')
const Chokidar = require('chokidar')
const sharp = require('sharp')
const async = require('async')
const maxworkers = require('os').cpus().length - 1

let watcher = null

function resize (item, cb) {
    sharp(item.path).resize(160).toFile(item.thumb, function (err) {
        if (err) {
            throw err
        }
        cb(item)
    })
}

let queue = async.queue(resize, maxworkers)

ipc.on('watch-folder', (event, folder) => {
    console.info('Watch-folder event received')
    console.info(folder)
    watch(folder, event)
})

function watch (folder, event) {
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
        item.thumb = folder + '/th/' + item.name

        if (!fs.existsSync(item.thumb)) {
            queue.push(item, function (item, err) {
                console.info('Thumbnail generated', item)
                event.sender.send('new-photos', [item])
            })
        } else {
            event.sender.send('new-photos', [item])
        }
    })

    watcher.on('ready', function () {
        console.info('Watcher ready')
        // init = false
        // photos = photos.sort(function (a, b) {
        //     return b.name.localeCompare(a.name)
        // })
        // // console.info(event)
        // event.sender.send('new-photos', photos)
        // photos = []
    })
}
