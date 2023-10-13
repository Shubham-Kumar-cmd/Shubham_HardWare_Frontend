import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Home=()=>{

    const userContext=useContext(UserContext)

    return (
       <div>
         <h2>This is home page of verified user</h2>
         <h1>{userContext.userData?.user?.name}</h1>
         <h1>Logged in {userContext.isLogin+''}</h1>
         {JSON.stringify(userContext)}
       </div>
    );
}
export default Home;