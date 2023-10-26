import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import image from '../assets/default1.png'

const CategoryView = ({ category, viewCat ,deleteCat, updateCat }) => {

    const deleteCategory=(categoryId)=>{
        // alert("test"+categoryId);
        deleteCat(categoryId)
    }

    return (
        <div>
            <Card className='mb-3 border-0 shadow-sm'>
                <Card.Body>
                    <Row className='align-items-center'>
                        <Col md={2} lg={2} className='text-center'>
                            <img src={(category.coverImage ? (category.coverImage.startsWith("http") ? category.coverImage : image) : image)} alt="" style={{
                                maxWidth: "150px",
                                maxHeight: "150px",
                                width: "100px",
                                height: "100px",
                                objectFit: "cover"
                            }} className='rounded-circle' />
                        </Col>
                        <Col md={8} lg={8}>
                            <h5>{category.title}</h5>
                            <p>{category.description}</p>

                        </Col>
                        <Col md={2} lg={2}>
                            <Container className='text-center d-grid gap-3'>
                                <Button variant='info' size='sm' onClick={event=>viewCat(category)}>View</Button>
                                <Button variant='warning' size='sm' onClick={event=>updateCat(category)}>Update</Button>
                                <Button variant='danger' size='sm' onClick={event=>deleteCategory(category.categoryId)}>Delete</Button>
                            </Container>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CategoryView