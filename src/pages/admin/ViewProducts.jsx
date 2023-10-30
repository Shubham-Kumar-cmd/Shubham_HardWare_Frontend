import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card, Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap'
import { getAllProducts } from '../../services/ProductService'
import { toast } from 'react-toastify'
import SingleProductView from '../../components/admin/SingleProductView'

const ViewProducts = () => {

  const [products, setProducts] = useState(undefined)

  useEffect(() => {
    allProducts(0,10,'addedDate','desc')
  }, [])


  const allProducts = (pageNumber, pageSize, sortBy, sortDir) => {
    //get all product api call  
    getAllProducts(pageNumber, pageSize, sortBy, sortDir)
      .then(data => {
        console.log(data);
        setProducts({
          ...data
        })
        // toast.success("product fetched successfully!!")
      })
      .catch(error => {
        console.log(error);
        toast.error(error.response.data.message)
      })
  }

  const productsView = () => {
    return (
      <Card className='border-0 shadow'>
        <Card.Body>
          <Row className='mb-3'>
            <Col md={5}><h3>View products</h3></Col>
            <Col md={1}>

            </Col>
            <Col md={6}>
              <Form.Control
                type="text"
                placeholder="search product here"
              // onChange={(event) => handleChange(event, 'email')}
              // value={data.email}
              // isInvalid={err.errorData?.response?.data?.email}
              />
            </Col>
          </Row>
          <Table responsive bordered hover size='sm' className='text-center'>
            <thead>
              <tr>
                <th className='small'>SNo.</th>
                <th className='small' colSpan={3}>Title</th>
                <th className='small'>Quantity</th>
                <th className='small'>Price</th>
                <th className='small'>Discounted</th>
                <th className='small'>Live</th>
                <th className='small'>Stock</th>
                <th className='small' colSpan={2}>Category</th>
                <th className='small'>Date</th>
                <th className='small'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                products.content.map((product, index) => (
                  <SingleProductView key={index} product={product} index={index}/>
                ))
              }
            </tbody>
          </Table>
          <Container className='d-flex justify-content-end mt-3'>
            <Pagination className='ms-auto'>
              <Pagination.Prev />
              <Pagination.Item>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          </Container>
        </Card.Body>
      </Card>
    )
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            {(products ? productsView() : '')}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ViewProducts
