import React, { useEffect, useState } from 'react'
import CategoryView from '../../components/CategoryView'
import { deleteCategoriesById, getCategories, updateCategoriesById } from '../../services/CategoryService'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { Button, Card, Col, Container, Form, FormGroup, Modal, Row, Spinner } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import image from '../../assets/shubham.jpeg'
import InfiniteScroll from 'react-infinite-scroll-component'

const ViewCategories = () => {

  const [categories, setCategories] = useState({
    content: []
  })

  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(undefined)
  const [currentPage, setCurrentPage] = useState(0)

  // modal view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // modal update
  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  // initail page load
  useEffect(() => {
    setLoading(true)
    //get categories api call
    getCategories(0, 6)
      .then(data => {
        console.log(data);
        setCategories(data)
      })
      .catch(error => {
        console.log(error.response.data.message);
        toast.error("Error in loading categories from server!!")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  //current page load
  // we can use only one useEffect also but after some modification we can achieve
  useEffect(() => {
    if (currentPage > 0) {
      //get categories api call
      getCategories(currentPage, 6)
        .then(data => {
          console.log(data);
          setCategories({
            content: [...categories.content, ...data.content],
            lastPage: data.lastPage,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages
          })
        })
        .catch(error => {
          console.log(error.response.data.message);
          toast.error("Error in loading categories from server!!")
        })
    }
  }, [currentPage])

  //delete category from main function
  const deleteCategoryMain = (categoryId) => {
    // alert(categoryId)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        //delete api call
        deleteCategoriesById(categoryId)
          .then(data => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

            //refresh the page to remove the deleted category
            const newArray = categories.content.filter(c => {
              return c.categoryId !== categoryId
            })

            setCategories({
              ...categories,
              content: newArray
            })

          })
          .catch(error => {
            console.log(error);
            toast.error("Something went wrong!!")
          })
      }
    })
  }

  //update category
  const updateCategoryClicked = (event) => {
    handleClose()
    event.preventDefault();
    // Swal.fire("working");
    if (selectedCategory.title === undefined || selectedCategory.title.trim() === '') {
      toast.warn("Title field can't be empty!!")
      return
    }
    if (selectedCategory.description === undefined || selectedCategory.description.trim() === '') {
      toast.warn("description field can't be empty!!")
      return
    }
    //update api call
    updateCategoriesById(selectedCategory)
      .then(data => {
        toast.success("Category updated!!")
        console.log(data);

        //refresh the data of the updated category
        const updatedCategory = categories.content.map(cat => {
          if (cat.categoryId === selectedCategory.categoryId) {
            cat.title = data.title
            cat.description = data.description
            cat.coverImage = data.coverImage
          }
          return cat;
        })

        setSelectedCategory({
          ...categories,
          content: updatedCategory
        })

      })
      .catch(error => {
        toast.error(error.response.data.message)
        // toast.error("Error")
        console.log(error);
      })
      .finally(() => {
        handleCloseUpdate()
      })
  }

  //handle view category
  const handleView = (category) => {
    // alert("view")
    setSelectedCategory(category)
    handleShow()
  }

  //update view category
  const updateView = (category) => {
    // alert("update")
    setSelectedCategory(category)
    handleShowUpdate()
  }

  //load next page function
  const loadNextPage = () => {
    console.log("loading next page");
    setCurrentPage(currentPage + 1)
  }

  // model view 
  const modelView = () => {
    return (
      <>
        {/* {Swal.fire("testing")} */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title id="">
              {selectedCategory.title}
            </Modal.Title>
          </Modal.Header>
          <Container>
            <img src={selectedCategory.coverImage} alt="" srcset="" style={{
              width: "100%",
              // height:"250px",
              // objectFit:"contain"
            }} />
          </Container>

          <Modal.Body>
            <p>
              {selectedCategory.description}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleShowUpdate}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }


  // model update 
  const modelUpdate = () => {
    return (
      <>
        {/* {Swal.fire("testing")} */}

        <Modal size="lg" show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title id="">
              {selectedCategory.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <FormGroup>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className='mb-3'
                  type="text"
                  placeholder='Enter category title'
                  value={selectedCategory.title}
                  onChange={event => setSelectedCategory({
                    ...selectedCategory,
                    title: event.target.value
                  })}
                />
              </FormGroup>

              <FormGroup>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className='mb-3'
                  as={'textarea'}
                  rows={6}
                  placeholder='Enter category description'
                  value={selectedCategory.description}
                  onChange={event => setSelectedCategory({
                    ...selectedCategory,
                    description: event.target.value
                  })}
                />
              </FormGroup>

              <FormGroup>
                <Container className='text-center'>
                  <img
                    src={(selectedCategory.coverImage ? selectedCategory.coverImage : image)}
                    alt=""
                    className='img-fluid'
                  />
                </Container>
                <Form.Label>Category image Url</Form.Label>
                <Form.Control
                  className='mb-3'
                  type="text"
                  placeholder='Enter category url'
                  value={selectedCategory.coverImage}
                  onChange={event => setSelectedCategory({
                    ...selectedCategory,
                    coverImage: event.target.value
                  })}
                />
              </FormGroup>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Close
            </Button>
            <Button variant="primary" onClick={updateCategoryClicked}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  //not categories in view
  const notCategoriesView = () => {
    return (
      <Container className="mt-2">
        <Row>
          <Col md={{
            span: 8,
            offset: 2
          }}>
            <Card className="border-0 shadow mt-3">
              <Card.Body className="text-center">
                <h3>No categories in database !!</h3>
                <p>Please add category to view the page</p>
                <Button as={NavLink} to="/admin/add-category" variant="primary" >Add category</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div>

      {/* loader */}
      <Container className='text-center pb-3' hidden={!loading}>
        <Spinner
          animation="border"
          variant="dark"
          size="sm"
          className="me-2"
        />
        <span >Loading...</span>
      </Container>

      {
        (categories.content.length > 0 ? (
          <>
          {/* infinite scroll when the page touches the end */}
            <InfiniteScroll
              dataLength={categories.content.length}
              next={loadNextPage}
              hasMore={!categories.lastPage}
              loader={<h3 className='p-2 text-center'>Loading...</h3>}
              endMessage={
                <p style={{ textAlign: 'center' }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {
                categories.content.map(category => {
                  return (
                    <CategoryView
                      category={category}
                      viewCat={handleView}
                      updateCat={updateView}
                      deleteCat={deleteCategoryMain}
                      key={category.categoryId}
                    />
                  )
                })
              }
            </InfiniteScroll>
          </>
        ) : notCategoriesView())
      }
      {
        (selectedCategory ? modelView() : '')
      }
      {
        (selectedCategory ? modelUpdate() : '')
      }
    </div>
  )
}

export default ViewCategories
