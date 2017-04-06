// todo: switch to sharp library
const asyncQueue = require('async/queue')
const maxworkers = require('os').cpus().length
const Jimp = require('jimp')

export function resizeFile (path, cb) {
    Jimp.read(path.path).then(function (image) {
        console.log('Writing thumb: ' + path.thumb)
        image.resize(200, Jimp.AUTO).write(path.thumb, function () {
            console.log('Thumb resized: ')
            console.log(path)
            cb(path)
        })
    })
}

export function batchResize (paths, cb) {
    let queue = asyncQueue(resizeFile, maxworkers)

    console.log(paths.length)
    for (let i = 0; i < paths.length; i++) {
        queue.push(paths[i], function (path, err) {
            console.log('Finished thumb')
            cb(path)
        })
    }
}
