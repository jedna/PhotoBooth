const _path = require('path')
const fs = require('fs')
const {dialog} = require('electron').remote
const nativeImage = require('electron').nativeImage

function trackTransforms (ctx) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let xform = svg.createSVGMatrix()
    ctx.getTransform = function () { return xform }

    let savedTransforms = []
    let save = ctx.save
    ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0))
        return save.call(ctx)
    }
    let restore = ctx.restore
    ctx.restore = function () {
        xform = savedTransforms.pop()
        return restore.call(ctx)
    }

    let scale = ctx.scale
    ctx.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy)
        return scale.call(ctx, sx, sy)
    }
    let rotate = ctx.rotate
    ctx.rotate = function (radians) {
        xform = xform.rotate(radians * 180 / Math.PI)
        return rotate.call(ctx, radians)
    }
    let translate = ctx.translate
    ctx.translate = function (dx, dy) {
        xform = xform.translate(dx, dy)
        return translate.call(ctx, dx, dy)
    }
    let transform = ctx.transform
    ctx.transform = function (a, b, c, d, e, f) {
        let m2 = svg.createSVGMatrix()
        m2.a = a
        m2.b = b
        m2.c = c
        m2.d = d
        m2.e = e
        m2.f = f
        xform = xform.multiply(m2)
        return transform.call(ctx, a, b, c, d, e, f)
    }
    let setTransform = ctx.setTransform
    ctx.setTransform = function (a, b, c, d, e, f) {
        xform.a = a
        xform.b = b
        xform.c = c
        xform.d = d
        xform.e = e
        xform.f = f
        return setTransform.call(ctx, a, b, c, d, e, f)
    }
    let pt = svg.createSVGPoint()
    ctx.transformedPoint = function (x, y) {
        pt.x = x
        pt.y = y
        return pt.matrixTransform(xform.inverse())
    }
}

// Caman filters

export default {

    // methods
    getImageData: function (canvas) {
        return canvas.toDataURL('image/jpeg')
    },
    saveImage   : function (canvas, path, fast, cb) {
        let dir = _path.dirname(path) + '/output/'
        let filename = path.split('\\').pop().split('/').pop()
        let photoPath = dir + filename.replace(/(\.[^.]*)?$/, '.printed$1')
        photoPath = _path.normalize(photoPath)

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }

        if (canvas.width < canvas.height) {
            let self = this
            this.rotateCanvas(canvas, 90, function () {
                self.saveData(canvas, photoPath, fast, cb)
            })
        } else {
            this.saveData(canvas, photoPath, fast, cb)
        }
    },
    saveData    : function (canvas, photoPath, fast, cb) {
        console.info('Getting data')
        let buff = this.canvasBuffer(canvas, 'image/jpeg')

        // console.info(photoData)
        // let fileName = 'Framed ' + canvas.attributes['data-name'].value
        console.info('Saving data')
        console.info(photoPath)
        if (!fast) {
            dialog.showSaveDialog({
                defaultPath: photoPath
            }, function (saveTo) {
                if (saveTo !== 'undefined') {
                    fs.writeFile(photoPath, buff, 'base64', function (err) {
                        if (err) {
                            alert('There was an error saving the photo:' + err.message)
                        }
                        buff = null
                        cb(saveTo)
                    })
                } else {
                    cb(new Error(false))
                }
            })
        } else {
            fs.writeFile(photoPath, buff, 'base64', function (err) {
                if (err) {
                    alert('There was an error saving the photo:' + err.message)
                }
                console.log('Wrote to ' + photoPath)
                buff = null
                cb(photoPath)
            })
        }
    },
    drawImage   : function (path, framePath, imageCanvas) {
        // lets
        const outputWidth = 1800
        const outputHeight = 1200

        let photoPath = 'file://' + _path.resolve(path)
        let canvas = imageCanvas
        let ctx = canvas.getContext('2d')

        let origPhoto = new Image()
        let frameImage = new Image()

        // let scale = origPhoto.naturalWidth / outputWidth

        // let self = this

        trackTransforms(ctx)

        origPhoto.src = photoPath
        frameImage.src = 'file://' + _path.resolve(framePath)

        let ratio = 1

        function draw () {
            // From: http://goo.gl/jypct
            // Store the current transformation matrix
            ctx.save()

            // Use the identity matrix while clearing the canvas
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Restore the transform
            ctx.restore()

            // Draw on transformed context
            // console.log(origPhoto.width)
            // console.log(origPhoto.height)
            // console.log(canvas.width / 2 - origPhoto.width / 2)
            // console.log((canvas.height / 2) - (origPhoto.height / 2))
            ctx.drawImage(
                origPhoto,
                0,
                0,
                canvas.height * ratio,
                canvas.height)

            ctx.save()

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height)

            ctx.restore()
        }

        frameImage.onload = function () {
            // canvas.width = frameImage.width
            // canvas.height = frameImage.height

            ratio = origPhoto.width / origPhoto.height

            if (frameImage.width / frameImage.height > 1) {
                canvas.width = outputWidth
                origPhoto.width = outputWidth
                canvas.height = outputHeight
            } else {
                canvas.width = outputHeight
                origPhoto.width = outputHeight
                canvas.height = outputWidth
            }

            // console.log(photoPath)
            // console.log(origPhoto)
            // console.log(framePath)
            // console.log(frameImage)

            console.log(canvas.width)
            console.log(canvas.height)
            console.log(ratio)
            draw()
        }

        // setInterval(draw, 100)

        let lastX = canvas.width / 2
        let lastY = canvas.height / 2
        let dragStart
        let dragged
        canvas.addEventListener('mousedown', function (evt) {
            document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none'
            lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft)
            lastY = evt.offsetY || (evt.pageY - canvas.offsetTop)
            dragStart = ctx.transformedPoint(lastX, lastY)
            dragged = false
        }, false)
        canvas.addEventListener('mousemove', function (evt) {
            lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft)
            lastY = evt.offsetY || (evt.pageY - canvas.offsetTop)
            dragged = true
            if (dragStart) {
                let pt = ctx.transformedPoint(lastX, lastY)
                ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y)
                draw()
            }
        }, false)
        canvas.addEventListener('mouseup', function (evt) {
            dragStart = null
            if (!dragged) zoom(evt.shiftKey ? -1 : 1)
        }, false)

        let scaleFactor = 1.005
        let zoom = function (clicks) {
            let pt = ctx.transformedPoint(lastX, lastY)
            ctx.translate(pt.x, pt.y)
            let factor = Math.pow(scaleFactor, clicks)
            ctx.scale(factor, factor)
            ctx.translate(-pt.x, -pt.y)
            draw()
        }

        let handleScroll = function (evt) {
            let delta = evt.wheelDelta ? evt.wheelDelta / 100 : evt.detail ? -evt.detail : 0
            if (delta) zoom(delta)
            return evt.preventDefault() && false
        }

        canvas.addEventListener('DOMMouseScroll', handleScroll, false)
        canvas.addEventListener('mousewheel', handleScroll, false)
    },
    enhancePhoto: function () {
        // Caman('#imageCanvas', function () {
        //     this.crossProcess()
        //     this.render()
        // })
    },
    rotateCanvas: function (canvas, degrees, cb) {
        // Create an second in-memory canvas:
        let mCanvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        mCanvas.width = canvas.width
        mCanvas.height = canvas.height
        let mctx = mCanvas.getContext('2d')

        // Draw your canvas onto the second canvas
        mctx.drawImage(canvas, 0, 0)

        // Clear your main canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        canvas.width = mCanvas.height
        canvas.height = mCanvas.width

        ctx.save()

        // Rotate the main canvas

        // set the rotation point as center of the canvas
        // (but you can set any rotation point you desire)
        ctx.translate(canvas.width, canvas.height / canvas.width)

        // rotate by 90 degrees (==PI/2)
        let radians = degrees / 180 * Math.PI
        ctx.rotate(radians)

        // Draw the second canvas back to the (now rotated) main canvas:
        ctx.drawImage(mCanvas, 0, 0)

        ctx.restore()

        cb()
    },
    keyup (e) {
        if (e.keyCode === '38') { // up arrow
        } else if (e.keyCode === '39') { // right arrow
        } else if (e.keyCode === '40') { // down arrow
        } else if (e.keyCode === '41') { // left arrow
        } else if (e.keyCode === '13') { // enter
        }
    },
    canvasBuffer (canvas, type, quality) {
        type = type || 'image/png'
        quality = typeof quality === 'number' ? quality : 0.9

        let data = canvas.toDataURL(type, quality)
        let img = typeof nativeImage.createFromDataURL === 'function'
            ? nativeImage.createFromDataURL(data) // electron v0.36+
            : nativeImage.createFromDataUrl(data) // electron v0.30
        if (/^image\/jpe?g$/.test(type)) {
            return img.toJpeg(Math.floor(quality * 100))
        } else {
            return img.toPng()
        }
    }
}
