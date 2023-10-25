import React, { useContext } from 'react'
import { Badge, ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsProgress, faCartArrowDown, faCheck, faClapperboard, faHome, faPlus, faReorder, faUser } from '@fortawesome/free-solid-svg-icons'
import { faDashcube } from '@fortawesome/free-brands-svg-icons'

const SideMenu = () => {

    const userContext = useContext(UserContext)

    const doLogout = () => {
        userContext.logout()
    }

    return (
        <>
            <ListGroup
                variant="flush"
            >
                <ListGroup.Item action as={NavLink} to="/admin/home">
                    <FontAwesomeIcon size="x" icon={faHome} />
                    <span className='ms-2'>Home</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/add-category">
                    <FontAwesomeIcon size="x" icon={faPlus} />
                    <span className="ms-2">Add Category</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/categories">
                    <FontAwesomeIcon size="x" icon={faCheck} />
                    <span className="ms-2">View Categories</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/add-product">
                    <FontAwesomeIcon size="x" icon={faCartArrowDown} />
                    <span className='ms-2'>Add Product</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/products">
                    <FontAwesomeIcon size="x" icon={faClapperboard} />
                    <span className="ms-2">View Products</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/orders">
                    <FontAwesomeIcon size="x" icon={faReorder} />
                    <span className="ms-2">Orders</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/admin/users" className="d-flex justify-content-between align-items-start">
                    <div>
                        <FontAwesomeIcon size="x" icon={faUser} />
                        <span className="ms-2">Users</span>
                    </div>
                    <Badge bg="danger" pill>
                        1(new)
                    </Badge>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/users/home">
                    <FontAwesomeIcon size="x" icon={faDashcube} />
                    <span className="ms-2">Dashboard</span>
                </ListGroup.Item>
                <ListGroup.Item onClick={doLogout}>
                    <FontAwesomeIcon size="x" icon={faBarsProgress} />
                    <span className="ms-2">Logout</span>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}

export default SideMenu