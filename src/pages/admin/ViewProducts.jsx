import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Pagination, Row, Table } from 'react-bootstrap'
import { getAllProducts } from '../../services/ProductService'
import { toast } from 'react-toastify'
import SingleProductView from '../../components/admin/SingleProductView'
import { PRODUCT_PAGE_SIZE, getProductImageUrl } from '../../services/HelperService'
import defaultImage from '../../assets/logo192.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupee } from '@fortawesome/free-solid-svg-icons'

const ViewProducts = () => {

  const [products, setProducts] = useState({
    content: []
  })

  const [currentProduct, setCurrentProduct] = useState(undefined)

  //view
  const [show, setShow] = useState(false);
  const closeProductViewModal = () => setShow(false);
  const showProductViewModal = (product) => {
    console.log(product);
    setCurrentProduct(product)
    setShow(true);
  }

  useEffect(() => {
    getProducts(0, PRODUCT_PAGE_SIZE, 'addedDate', 'desc')
  }, [])

  //parsing date
  const formatDate = (time) => {
    return new Date(time).toLocaleString()
}

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

  const updateProductList = (productId) => {
    //refresh the page to remove the deleted product
    const newArray = products.content.filter(p => {
      return p.productId !== productId
    })

    setProducts({
      ...products,
      content: newArray
    })
  }

  //view product modal
  const viewProductModalView = () => {
    return (
      currentProduct && (
        <>
          <Modal
            size='xl'
            centered
            show={show}
            onHide={closeProductViewModal}
          // fullscreen={true}
          >
            {/* {JSON.stringify(currentProduct)} */}
            <Modal.Header closeButton>
              <Modal.Title id="">
                {currentProduct.title}
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* productImage */}
              <Container className='text-center'>
                <img src={currentProduct.productImageName ? getProductImageUrl(currentProduct.productId) : defaultImage} alt="" style={{
                  // width: "100%",
                  height: "300px",
                  // objectFit:"contain"
                }} />
              </Container>

              <Table className='' responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Info</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Product Id</td>
                    <td className='fw-bold'>{currentProduct.productId}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td className='fw-bold'>{currentProduct.quantity}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td className='fw-bold'><FontAwesomeIcon size="1x" icon={faIndianRupee} />{currentProduct.price}</td>
                  </tr>
                  <tr>
                    <td>Discounted Price</td>
                    <td className='fw-bold'><FontAwesomeIcon size="1x" icon={faIndianRupee} />{currentProduct.discountedPrice}</td>
                  </tr>
                  <tr>
                    <td>Stock</td>
                    <td className='fw-bold'>{currentProduct.stock ? "Yes" : "OutOfStock"}</td>
                  </tr>
                  <tr>
                    <td>Live</td>
                    <td className='fw-bold'>{currentProduct.live ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td className='fw-bold'>{currentProduct.category?currentProduct.category.title:'-'}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td className='fw-bold'>{formatDate(currentProduct.addedDate)}</td>
                  </tr>

                </tbody>
              </Table>

              {/* description */}
              {/* parsing the html data */}
              <div dangerouslySetInnerHTML={{ __html: currentProduct.description }} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeProductViewModal}>
                Close
              </Button>
              <Button variant="primary" onClick={closeProductViewModal}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )
    )
  }

  //product view
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
                  <SingleProductView key={index} updateProductList={updateProductList} viewProductModal={showProductViewModal} product={product} index={index} />
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

              <Pagination.Ellipsis />

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
      {
        products ? viewProductModalView() : ''
      }
    </>
  )
}

export default ViewProducts
