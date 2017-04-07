import {STORAGE_KEY_PHOTOS, STORAGE_KEY_FRAMES} from './mutations'

const localStoragePlugin = store => {
    store.subscribe((mutation, {photos, frames}) => {
        window.localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos))
        window.localStorage.setItem(STORAGE_KEY_FRAMES, JSON.stringify(frames))
    })
}

export default [localStoragePlugin]
