import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:8080'
})

export const get = (url) => {
    return httpClient.get(url)
}

export const post = (url, object) => {
    return httpClient.post(url, object)
}

export const put = (url, object) => {
    return httpClient.put(url, object)
}

export const del = (url) => {
    return httpClient.delete(url)
}