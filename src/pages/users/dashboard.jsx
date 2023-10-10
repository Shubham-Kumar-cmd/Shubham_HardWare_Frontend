import { Outlet } from "react-router-dom";

const Dashboard=()=>{
    return <div>
        <h1>This is user Dashboard</h1>;

        {/** nested 
        It will call the nested component
        */}
        <Outlet />
    </div>
}

export default Dashboard;