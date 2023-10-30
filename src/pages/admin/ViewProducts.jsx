import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Card, Col, Container, Form, Pagination, Row, Table } from 'react-bootstrap'
import { getAllProducts } from '../../services/ProductService'
import { toast } from 'react-toastify'
import SingleProductView from '../../components/admin/SingleProductView'
import { PRODUCT_PAGE_SIZE } from '../../services/HelperService'

const ViewProducts = () => {

  const [products, setProducts] = useState(undefined)

  useEffect(() => {
    getProducts(0, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
  }, [])


  const getProducts = (pageNumber, pageSize, sortBy, sortDir) => {
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
                  <SingleProductView key={index} product={product} index={index} />
                ))
              }
            </tbody>
          </Table>
          <Container className='d-flex justify-content-end mt-3'>
            <Pagination className='ms-auto'>
              {/* 0 to totalPages-1 */}

              {/* first page */}
              <Pagination.First onClick={event => {
                getProducts(0, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
              }} />

              {/* prev page */}
              <Pagination.Prev onClick={event => {
                if ((products.pageNumber - 1) < 0) {
                  return;
                }
                getProducts(products.pageNumber - 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
              }} />

              {
                [...Array(products.totalPages)].map((ob, i) => i).map(item => (
                  (products.pageNumber === item ? <Pagination.Item key={item} active>{item + 1}</Pagination.Item> : <Pagination.Item onClick={event => {
                    getProducts(item, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
                  }} key={item}>{item + 1}</Pagination.Item>)
                ))
              }
              
              <Pagination.Ellipsis/>

              {/* next page */}
              <Pagination.Next onClick={event => {
                if (products.lastPage) {
                  return;
                }
                getProducts(products.pageNumber + 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
              }} />

              {/* last page */}
              <Pagination.Last onClick={event => {
                getProducts(products.totalPages - 1, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
              }} />
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
