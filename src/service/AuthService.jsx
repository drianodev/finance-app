import { addItem, getItem, removeItem } from "./LocalstorageService"

export const USER_LOGGED = '_USER_LOGGED'

export const isUsuarioAutenticado = () => {
    const user = getItem(USER_LOGGED)
    return user && user.id;
}

export const removeAuthenticatedUser = () => {
    removeItem(USER_LOGGED)
}

export const loginAuth = (user) =>{
    addItem(USER_LOGGED, user)
}

export const getLoggedInUser = () =>{
    return getItem(USER_LOGGED)
}