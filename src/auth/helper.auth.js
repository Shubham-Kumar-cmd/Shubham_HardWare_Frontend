//data: save localstorage
export const doLoginLocalStorage=(data)=>{
    localStorage.setItem("userData",JSON.stringify(data))
}

//data: fetch
export const getUserFromLocalStorage=()=>{
    // if getDataFromLocalStorage() is null then it will return null
    // getDataFromLocalStorage()?.name;
    const data=getDataFromLocalStorage();
    if (data!=null) {
        return data.name;
    }
    return null;
}

export const getTokenFromLocalStorage=()=>{
    // if getDataFromLocalStorage() is null then it will return null
    // getDataFromLocalStorage()?.jwtToken;
    const data=getDataFromLocalStorage();
    if (data!=null) {
        return data.jwtToken;
    } 
    return null;
}

export const getDataFromLocalStorage=()=>{
    const data=localStorage.getItem("userData")
    if (data!=null) {
        return JSON.parse(data);
    }
    return null;
}

//isLoggedIn
export const isLoggedIn=()=>{
    // ternary operator 
    // (getTokenFromLocalStorage())?(true):(false)
    if (getTokenFromLocalStorage()) {
        return true;
    }
    return false;
}

//data: remove: logout
export const doLogoutFromLocalStorage=()=>{
    localStorage.removeItem("userData")
}