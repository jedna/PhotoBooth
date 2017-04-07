export const STORAGE_KEY_PHOTOS = 'photos-vuejs'
export const STORAGE_KEY_FRAMES = 'frames-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
    window.localStorage.clear()
}

export const state = {
    photos: JSON.parse(window.localStorage.getItem(STORAGE_KEY_PHOTOS) || '[]'),
    frames: JSON.parse(window.localStorage.getItem(STORAGE_KEY_FRAMES) || '[]')
}

export const mutations = {
    addPhoto (state, path) {
        state.photos.push({
            path: path,
            done: false
        })
    },

    addPhotos (state, photos) {
        console.log('comitting addPhotos')
        state.photos.push(...photos)
    },

    deletePhoto (state, {photo}) {
        state.photos.splice(state.photos.indexOf(photo), 1)
    },

    editPhoto (state, {photo, value}) {
        photo.path = value
    },

    addFrame (state, {path}) {
        state.frames.push({path: path})
    }
}
