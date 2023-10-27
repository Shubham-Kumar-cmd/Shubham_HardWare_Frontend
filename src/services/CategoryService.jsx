import { privateAxios } from "./AxiosService"

// category related api calls
export const addCategory = (category) => {
    return privateAxios
        .post(`/categories`, category)
        .then(response => response.data)
}

export const getCategories = (currentPage = 0, pageSize = 7) => {
    return privateAxios
        .get(`/categories?pageNumber=${currentPage}&&pageSize=${pageSize}`)
        .then(response => response.data)
}

export const deleteCategoriesById = (categoryId) => {
    return privateAxios
        .delete(`/categories/${categoryId}`)
        .then(response => response.data)
}

export const updateCategoriesById = (category) => {
    return privateAxios
        .put(`/categories/${category.categoryId}`, category)
        .then(response => response.data)
}