import {STORAGE_KEY_PHOTOS, STORAGE_KEY_FRAMES, STORAGE_KEY_PRINTER, STORAGE_KEY_FOLDER} from './mutations'

const localStoragePlugin = store => {
    store.subscribe((mutation, {photos, frames, printer, folder}) => {
        window.localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos))
        window.localStorage.setItem(STORAGE_KEY_FRAMES, JSON.stringify(frames))
        window.localStorage.setItem(STORAGE_KEY_PRINTER, JSON.stringify(printer))
        window.localStorage.setItem(STORAGE_KEY_FOLDER, JSON.stringify(folder))
    })
}

export default [localStoragePlugin]
