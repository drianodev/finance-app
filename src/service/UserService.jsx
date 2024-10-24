import { get, post } from "../config/Api"

const URL = '/api/users'

export const authenticate = (credentials) => {
    return post(`${URL}/authenticate`, credentials)
}

export const getBalance = (id) =>{
    return get(`${URL}/${id}/balance`)
}

export const saveUser = (data) =>{
    return post(URL, data)
}