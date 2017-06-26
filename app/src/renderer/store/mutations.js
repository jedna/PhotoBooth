import Vue from 'vue'

export const STORAGE_KEY_PHOTOS = 'photos-vuejs'
export const STORAGE_KEY_FRAMES = 'frames-vuejs'
export const STORAGE_KEY_PRINTER = 'printer-vuejs'
export const STORAGE_KEY_FOLDER = 'folder-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
    window.localStorage.clear()
}

export const state = {
    photos: JSON.parse(window.localStorage.getItem(STORAGE_KEY_PHOTOS) || '[]'),
    frames: JSON.parse(window.localStorage.getItem(STORAGE_KEY_FRAMES) || '[]'),
    printer: JSON.parse(window.localStorage.getItem(STORAGE_KEY_PRINTER) || 'null'),
    folder: JSON.parse(window.localStorage.getItem(STORAGE_KEY_FOLDER) || 'null')
}

export const mutations = {
    addPhoto (state, photo) {
        state.photos.unshift(photo)
    },

    setPhotos (state, photos) {
        state.photos.splice(0, state.photos.length)
        state.photos.push(...photos)
    },

    deletePhoto (state, {photo}) {
        state.photos.splice(state.photos.indexOf(photo), 1)
    },

    editPhoto (state, {photo, value}) {
        photo.path = value
    },

    addFrame (state, {id, path}) {
        Vue.set(state.frames, id, {path: path})
    },

    removeFrame (state, id) {
        state.frames.splice(id, 1)
    },

    setPrinter (state, name) {
        state.printer = name
    },

    setFolder (state, name) {
        state.folder = name
    }
}
