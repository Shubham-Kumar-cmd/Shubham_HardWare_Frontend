import { Alert, Button, Card, Col, Container, Form, InputGroup, Modal, Row, Spinner, Table } from "react-bootstrap";
import UserProfileView from "../../components/users/UserProfileView";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getUser, updateUser, updateUserProfilePicture } from "../../services/UserService";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import defaultImage from '../../assets/default.png'

// function Profile(){
const Profile = () => {

    const userContext = useContext(UserContext)
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [image, setImage] = useState({
        placeholder: defaultImage,
        file: null
    })

    //modals state
    const [show, setShow] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false)
    const handleClose = () => {
        setShow(false)
    };
    const handleShowModal = () => setShow(true);

    useEffect(() => {
        // console.log("data from url userId: "+userId);
        if (userContext.userData) {
            getUserDataFromServer()
        }
    }, [userContext.userData])

    const getUserDataFromServer = () => {
        //api call
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

    const updateFieldHandler = (event, property) => {
        setUser({
            ...user,
            [property]: event.target.value
        })
    }

    //clear the image
    const clearImage=(event)=>{
        setImage({
            placeholder: defaultImage,
            file: null
        })
    }

    //function for image change
    const handleProfileImageChange = (event) => {
        // const localFile=event.target.files[0]
        console.log(event.target.files[0]);
        if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
            //preview image
            const reader = new FileReader()
            reader.onload = (r) => {
                setImage({
                    placeholder: r.target.result,
                    file: event.target.files[0]
                })
                console.log(r.target.result);
            }
            reader.readAsDataURL(event.target.files[0])
        }
        else {
            toast.error("file type not supported!!")
            image.file = null
        }
    }

    //update user api call
    const updateUserData = () => {
        console.log("updating: " + user);
        if (user.name === undefined || user.name.trim() === '') {
            toast.error("name field can't be empty");
            return
        }
        setUpdateLoading(true)
        updateUser(user)
            .then(updatedUser => {
                console.log(updatedUser);

                //update image api call
                if (image.file === null) {
                    setUpdateLoading(false)
                    handleClose();
                    return
                }
                updateUserProfilePicture(image.file, user.userId)
                    .then(data => {
                        console.log(data);
                        toast.success(data.message)
                        handleClose();
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error("image not uploaded!!")
                    })
                    .finally(() => {
                        setUpdateLoading(false)
                    })
                toast.success("user details updated!!");
            })
            .catch(error => {
                console.log(error);
                if (error.response.status === 400) {
                    toast.error(error.response.data.name);
                }
                toast.error("not updated!! Error");
                setUpdateLoading(false)
            })

    }

    //update view
    const updateViewModal = () => {
        return (
            <div>
                <Modal centered show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className='' variant="light" style={{
                            borderRadius: "10px"
                        }}>
                            <Card.Body>
                                <Table responsive="sm" hover>
                                    <tbody>
                                        <tr>
                                            <td>change profile</td>
                                            <td>
                                                {/* image tag for preview */}
                                                <Container className="text-center mb-1">
                                                    <img style={{ objectFit: "cover" }} height={"125px"} width={"125px"} src={image.placeholder} alt="" />
                                                </Container>
                                                <InputGroup>
                                                    <Form.Control
                                                        type="file"
                                                        onChange={(event) => {
                                                            handleProfileImageChange(event)
                                                        }}
                                                    />
                                                    <Button variant="outline-secondary" onClick={clearImage}>Clear</Button>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={user.name}
                                                    onChange={(event) => {
                                                        updateFieldHandler(event, 'name')
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>New Password</td>
                                            <td>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    onChange={(event) => {
                                                        updateFieldHandler(event, 'password')
                                                    }}
                                                />
                                                <p className="text-danger">leave the field blank for same password</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Gender</td>
                                            <td>{user.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>About</td>
                                            <td>
                                                <Form.Control
                                                    as={'textarea'}
                                                    value={user.about}
                                                    onChange={(event) => {
                                                        updateFieldHandler(event, 'about')
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Roles</td>
                                            <td>{user.roles.map(role =>
                                                <div key={role.roleId}>
                                                    {role.roleName}
                                                </div>
                                            )}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" onClick={updateUserData} disabled={updateLoading}>
                            <Spinner
                                animation="grow"
                                variant="dark"
                                size="sm"
                                className="me-2"
                                hidden={!updateLoading}
                            />
                            <span hidden={!updateLoading}>updating</span>
                            <span hidden={updateLoading}>Continue</span>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
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
                            (
                                <>
                                    {updateViewModal()}
                                    <UserProfileView
                                        user={
                                            // {
                                            //     name: "Shubham Kumar",
                                            //     email: "kumar53shubham@gmail.com",
                                            //     gender: "male",
                                            //     about: "This is professional developer.",
                                            //     roles: [{ roleId: 1, roleName: "Admin" }, { roleId: 2, roleName: "Normal" }]
                                            // }
                                            user
                                        }
                                        handleShowModal={
                                            handleShowModal
                                        }
                                    />
                                </>
                            ) : <Alert><h2 className="text-center m-2">User not loaded from server!!</h2></Alert>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile;