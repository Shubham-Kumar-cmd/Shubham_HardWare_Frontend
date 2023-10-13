import { useEffect, useState } from "react"
import { doLoginLocalStorage, doLogoutFromLocalStorage, getDataFromLocalStorage, isAdminUser as adminUser, isLoggedIn } from "../auth/HelperAuth";
import { UserContext } from "./UserContext";

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
    const [isAdminUser, setIsAdminUser]=useState(false)

    useEffect(()=>{
        setIsLogin(isLoggedIn())
        setUserData(getDataFromLocalStorage())
        setIsAdminUser(adminUser())
    }, [])

    //login
    const doLogin=(data)=>{
        doLoginLocalStorage(data)
        setIsLogin(true)
        setUserData(getDataFromLocalStorage())
        setIsAdminUser(adminUser())
    }

    //logout
    const doLogout=()=>{
        doLogoutFromLocalStorage()
        setIsLogin(false)
        setUserData(null)
        setIsAdminUser(adminUser())
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
                logout: doLogout,
                isAdminUser : isAdminUser,
                setIsAdminUser : setIsAdminUser
            }}
            >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;