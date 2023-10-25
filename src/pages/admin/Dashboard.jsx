import { Navigate, Outlet } from "react-router-dom";
import { isAdminUser } from "../../auth/HelperAuth";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import SideMenu from "../../components/admin/SideMenu";


const AdminDashboard = () => {

    // const userContext=
    useContext(UserContext)

    //private dashboard view
    const adminDashboardView = () => {
        return (
            <div>
                <Container className="p-3">
                    <Row>
                        <Col md={{
                            span:3,
                            // offset:1
                        }}
                        >
                            <SideMenu />
                        </Col>
                        <Col md={9} className="pt-2">
                        {/** nested 
                        It will call the nested component
                        */}
                        <Outlet />
                        </Col>
                    </Row>
                </Container>
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
    //                             <h3>You are normal user !!</h3>
    //                             <Button as={NavLink} to="/users/home" variant="primary" >Go to home page</Button>
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
        // (userContext.isAdminUser) ? adminDashboardView() : notLoggedInView()

        //private route using Navigation and Redirect
        (isAdminUser()) ? adminDashboardView() : <Navigate to="/users/home" />
    );
}

export default AdminDashboard;