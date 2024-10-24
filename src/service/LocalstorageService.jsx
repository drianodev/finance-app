export const addItem = (key, value) =>{
    localStorage.setItem(key,JSON.stringify(value))
}

export const getItem = (key) =>{
   const dataUser = localStorage.getItem(key)

    return JSON.parse(dataUser)
}

export const removeItem = (key) =>{
    localStorage.removeItem(key)
}