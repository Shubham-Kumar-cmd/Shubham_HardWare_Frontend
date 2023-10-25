import React, { useState } from 'react'
import { Button, Card, Container, FloatingLabel, Form, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { addCategory } from '../../services/ProductService'

const AddCategory = () => {

  const [category, setCategory] = useState({
    title: '',
    description: '',
    coverImage: ''
  })

  const [loading, setLoading] = useState(false)

  const handleFormSubmit = (event) => {
    event.preventDefault()
    console.log(category);
    if (category.title===undefined || category.title.trim()==='') {
      toast.warn("Title field can't be empty!!")
      return
    }
    if (category.description===undefined || category.description.trim()==='') {
      toast.warn("description field can't be empty!!")
      return
    }
    //call server api to add category
    setLoading(true)
    addCategory(category)
    .then(data=>{
      //success
      console.log(data);
      clearCategory()
      toast.success("category added")
      setLoading(false)
    }).catch(error=>{
      // error
      console.log(error)
      toast.error(error.response.data.name)
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  const handleFieldChange = (event, property) => {
    setCategory({
      ...category,
      [property]: event.target.value
    })
  }

  const clearCategory = () => {
    setCategory({
      title: '',
      description: '',
      coverImage: ''
    })
  }

  return (
    <>
      <Container fluid>
        <Card className='border border-0 shadow'>
          {JSON.stringify(category)}
          <Card.Body>
            <h5>
              Add Category
            </h5>
            <Form onSubmit={handleFormSubmit}>

              {/* title */}
              <FloatingLabel
                controlId="floatingInput"
                label="Title"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, 'title')}
                  value={category.title}
                />
              </FloatingLabel>

              {/*description  */}
              <FloatingLabel
                controlId="floatingInput"
                label="Description"
                className="mb-2"
              >
                <Form.Control
                  as={'textarea'}
                  rows={6}
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, 'description')}
                  value={category.description}
                />
              </FloatingLabel>

              {/* Cover image */}
              <FloatingLabel
                controlId="floatingInput"
                label="Cover image Url"
                className="mb-2"
              >
                <Form.Control
                  type='text'
                  placeholder="Enter here"
                  onChange={(event) => handleFieldChange(event, 'coverImage')}
                  value={category.coverImage}
                />
              </FloatingLabel>

              <Container className="text-center mt-3">
                <Button onClick={clearCategory} className='me-2' variant='danger' size='sm'>Reset</Button>
                <Button
                  variant='success'
                  size='sm'
                  type='submit'
                  disabled={loading}
                >
                  <Spinner
                    animation="grow"
                    variant="dark"
                    size="sm"
                    className="me-2"
                    hidden={!loading}
                  />
                  <span hidden={!loading}>wait...</span>
                  <span hidden={loading}>Add Category</span>
                </Button>
              </Container>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}

export default AddCategory