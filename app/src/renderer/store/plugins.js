import {STORAGE_KEY} from './mutations'

const localStoragePlugin = store => {
    store.subscribe((mutation, {photos}) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
    })
}

export default [localStoragePlugin]
