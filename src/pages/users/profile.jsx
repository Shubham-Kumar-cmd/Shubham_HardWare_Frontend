import { Alert, Col, Container, Row } from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getUser } from "../../services/UserService";
import { toast } from "react-toastify";

// function Profile(){
const Profile = () => {

    const userContext = useContext(UserContext)

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (userContext.userData) {
            getUserDataFromServer()
        }
    }, [userContext.userData])

    const getUserDataFromServer = () => {
        //api call
        const userId = userContext.userData.user.userId
        getUser(userId)
            .then(data => {
                console.log(data);
                setUser(data);
            })
            .catch(error => {
                console.log(error);
                setUser(null)
                toast.error("error in loading user information");
            })
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md={
                        {
                            span: 8,
                            offset: 2
                        }
                    }>
                        {(user ?
                            (<UserProfileView user={
                                // {
                                //     name: "Shubham Kumar",
                                //     email: "kumar53shubham@gmail.com",
                                //     gender: "male",
                                //     about: "This is professional developer.",
                                //     roles: [{ roleId: 1, roleName: "Admin" }, { roleId: 2, roleName: "Normal" }]
                                // }
                                user
                            } />) : <Alert><h2 className="text-center m-2">User not loaded from server!!</h2></Alert>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile;