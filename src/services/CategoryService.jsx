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

export const deleteCategoriesById = (categoryId) => {
    return privateAxios
        .delete(`/categories/${categoryId}`)
        .then(response => response.data)
}

export const updateCategoriesById = (category) => {
    return privateAxios
        .put(`/categories/${category.categoryId}`,category)
        .then(response => response.data)
}