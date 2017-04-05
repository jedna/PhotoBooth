export const STORAGE_KEY = 'photos-vuejs'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
    window.localStorage.clear()
}

export const state = {
    photos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
}

export const mutations = {
    addPhoto (state, path) {
        state.photos.push({
            path,
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
    }
}
