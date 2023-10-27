import { privateAxios } from "./AxiosService"

// product related api calls
export const createProductWithoutCategory = (product) => {
    return privateAxios
        .post(`/products`, product)
        .then(response => response.data)
}

export const addProductImage = (file,productId) => {
    if (file===null) {
        return;
    }
    const data =new FormData();
    data.append('productImage',file)
    return privateAxios
        .post(`/products/image/${productId}`,data)
        .then(response => response.data)
}

export const createProductInCategory = (product, categoryId) => {
    return privateAxios
        .post(`/categories/${categoryId}/products`, product)
        .then(response => response.data)
}

