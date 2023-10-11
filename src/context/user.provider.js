import { useEffect, useState } from "react"
import { UserContext } from "./user.context";
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isLoggedIn } from "../auth/helper.auth";

const UserProvider=({children})=>{
    const [isLogin,setIsLogin]= useState(false)
    const [userData,setUserData]= useState(null)
    /*
        userData:{
            user:{

            },
            jwtToken:""
        }
     */

    useEffect(()=>{
        setIsLogin(isLoggedIn())
        setUserData(getDataFromLocalStorage())
    }, [])

    //login
    const doLogin=(data)=>{
        doLoginLocalStorage(data)
        setIsLogin(true)
        setUserData(getDataFromLocalStorage())
    }

    //logout
    const doLogout=()=>{
        doLogoutFromLocalStorage()
        setIsLogin(false)
        setUserData(null)
    }


    return (
        <UserContext.Provider value={
            {
                userData: userData,
                //we can remove setUserData method bcz of doLogin method 
                setUserData: setUserData,
                isLogin: isLogin,
                //we can remove setIsLogin method bcz of doLogin method 
                setIsLogin: setIsLogin,
                login: doLogin,
                logout: doLogout
            }}
            >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;