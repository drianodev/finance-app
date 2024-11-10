import { del, get, post, put } from "../config/Api"

const URL = '/api/launches'

export const getLaunch = (launchFilter) =>{
    let params = `?user=${launchFilter.user}`

    if(launchFilter.year){
        params = `${params}&year=${launchFilter.year}`
    }

    if(launchFilter.month){
        params = `${params}&month=${launchFilter.month}`
    }

    if(launchFilter.type){
        params = `${params}&type=${launchFilter.type}`
    }

    if(launchFilter.status){
        params = `${params}&status=${launchFilter.status}`
    }
    if(launchFilter.description){
        params = `${params}&description=${launchFilter.description}`
    }

    return get(`${URL}${params}`)
}

export const deleteLaunch = (id) =>{
    return del(`${URL}/${id}`)
}

export const save = (launch) =>{
    return post(`${URL}`,launch)
}

export const getById = (id) =>{
    return get(`${URL}/${id}`)
}

export const update = (launch) =>{
    return put(`${URL}/${launch.id}`, launch)
}

export const updateStatus = (id, status) =>{
    return put(`${URL}/${id}/update-status`, {status})
}