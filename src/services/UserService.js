// user related api calls

import { privateAxios, publicAxios } from "./AxiosService"

// register new user
export const registerUser=(userData)=>{
    return publicAxios
    .post(`/users`, userData)
    .then(response => response.data);
}

// login user
export const loginUser=(userData)=>{
    return publicAxios
    .post(`/auth/login`,userData)
    .then(response=>response.data);
}

//get userById
export const getUser=(userId)=>{
    return publicAxios
    .get(`/users/${userId}`)
    .then(response=>response.data);
}

//update userById
export const updateUser=(user)=>{
    return privateAxios
    .put(`/users/${user.userId}`,user)
    .then(response=>response.data);
}

//update user profie picture
export const updateUserProfilePicture=(file,userId)=>{
    if (file===null) {
        return;
    }
    const data = new FormData()
    data.append("userImage", file)
    return privateAxios
    .post(`/users/image/${userId}`,data)
    .then(response=>response.data);
}