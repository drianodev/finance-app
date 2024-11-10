export const addItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
   const dataUser = sessionStorage.getItem(key);
   return JSON.parse(dataUser);
};

export const removeItem = (key) => {
    sessionStorage.removeItem(key);
};
