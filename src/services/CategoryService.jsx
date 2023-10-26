import { privateAxios } from "./AxiosService"

// category related api calls
export const addCategory = (category) => {
    return privateAxios
        .post(`/categories`, category)
        .then(response => response.data)
}

export const getCategories = () => {
    return privateAxios
        .get(`/categories`)
        .then(response => response.data)
}