import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../auth/HelperAuth";

const Dashboard = () => {

    // const userContext = useContext(UserContext)

    //private dashboard view
    const dashboardView = () => {
        return (
            <div>
                {/* <h1>This is user Dashboard</h1>; */}

                {/** nested 
                It will call the nested component
                */}
                <Outlet />
            </div>
        )
    }

    //not logged in view
    // const notLoggedInView = () => {
    //     return (
    //         <Container className="mt-2">
    //             <Row>
    //                 <Col md={{
    //                     span: 8,
    //                     offset: 2
    //                 }}>
    //                     <Card className="border-0 shadow mt-3">
    //                         <Card.Body className="text-center">
    //                             <h3>You are not logged In !!</h3>
    //                             <p>Please do login to view the page</p>
    //                             <Button as={NavLink} to="/login" variant="primary" >Login now</Button>
    //                         </Card.Body>
    //                     </Card>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     );
    // }

    return (
        //private route using Conditional rendering
        // ternary operator
        // (userContext.isLogin) ? dashboardView() : notLoggedInView()

        //private route using Navigation and Redirect
        (isLoggedIn()) ? dashboardView() : <Navigate to="/login" />
    );
}

export default Dashboard;