import React from 'react'
import { Button, Card, Container, Table } from 'react-bootstrap'
import profileImage from './../../assets/default.png'
import { BASE_URL } from '../../services/HelperService'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser } from '@fortawesome/free-solid-svg-icons'

const UserProfileView = ({ user = null }) => {

    const profileStyle={
        maxHeight:"150px",
        maxWidth:"150px",
        borderRadius:"50%",
        objectFit: "cover"
    }

    return (
        <>
            {
                (user && (
                    <Card className='m-3 border-0 shadow'>
                        <Card.Body>
                        <Container className='text-center mb-2'>
                        {/* <img className='border border-dark' src={profileImage} alt='UserProfile'  style={profileStyle}/> */}
                        <img className='border border-dark' src={user.imageName ? BASE_URL + '/users/image/' + user.userId + '?' + new Date().getTime() : profileImage} alt='UserProfile'  style={profileStyle}/>
                        
                        {/* <FontAwesomeIcon size="6x" icon={faUser}></FontAwesomeIcon> */}

                        </Container>
                            <h3 className='text-center text-primary fw-bold text-uppercase'>{(user.name)}</h3>
                            <div className='mt-3'>
                                <Card className='' variant="light" style={{
                                    borderRadius:"10px"
                                }}>
                                    <Card.Body>
                                        <Table responsive="sm" hover>
                                            <tbody>
                                                <tr>
                                                    <td>Name</td>
                                                    <td>{user.name}</td>
                                                </tr>
                                                <tr>
                                                    <td>Email</td>
                                                    <td>{user.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Gender</td>
                                                    <td>{user.gender}</td>
                                                </tr>
                                                <tr>
                                                    <td>About</td>
                                                    <td>{user.about}</td>
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
                            </div>

                            <Container className='text-center mt-3'>
                                <Button className='me-1' variant='success'>Update</Button>
                                <Button className='ms-1' variant='warning'>Order</Button>
                            </Container>

                        </Card.Body>
                    </Card>
                ))
            }
        </>
    )
}

export default UserProfileView