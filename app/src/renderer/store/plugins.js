import {STORAGE_KEY_PHOTOS, STORAGE_KEY_FRAMES, STORAGE_KEY_PRINTER} from './mutations'

const localStoragePlugin = store => {
    store.subscribe((mutation, {photos, frames, printer}) => {
        window.localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos))
        window.localStorage.setItem(STORAGE_KEY_FRAMES, JSON.stringify(frames))
        window.localStorage.setItem(STORAGE_KEY_PRINTER, JSON.stringify(printer))
    })
}

export default [localStoragePlugin]
