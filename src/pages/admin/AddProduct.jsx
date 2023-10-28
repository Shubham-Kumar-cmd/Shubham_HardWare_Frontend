import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, InputGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import defaultImage from '../../assets/default.png'
import { createProductWithoutCategory, addProductImage, createProductInCategory } from "../../services/ProductService";
import { getCategories } from "../../services/CategoryService";
import { Editor } from "@tinymce/tinymce-react";

// function AddProduct(){
const AddProduct = () => {

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        discountedPrice: 0,
        quantity: 1,
        live: false,
        stock: true,
        image: undefined,
        imagePreview: undefined
    })


    const [selectedCategoryId, setSelectedCategoryId] = useState("none")

    const [categories, setCategories] = useState(undefined)

    // for rich text editor
    const editorRef = useRef()

    useEffect(() => {
        getCategories(0, 1000)
            .then(data => {
                console.log(data);
                setCategories(data)
            })
            .catch(error => {
                console.log(error);
                toast.error("Error in loading categories!")
            })
    }, [])

    const handleChange = (event, property) => {
        event.preventDefault()
        setProduct({
            ...product,
            [property]: event.target.value
        })
    }

    const handleFileChange = (event) => {
        // const localFile=event.target.files[0]
        // console.log(event.target.files[0]);
        if (event.target.files[0].type === 'image/jpeg' || event.target.files[0].type === 'image/png') {
            //preview image
            const reader = new FileReader()
            reader.onload = (r) => {
                setProduct({
                    ...product,
                    image: event.target.files[0],
                    imagePreview: r.target.result
                })
                // console.log(r.target.result);
            }
            reader.readAsDataURL(event.target.files[0])
        }
        else {
            toast.error("file type not supported!!")
            setProduct({
                ...product,
                image: undefined,
                imagePreview: defaultImage
            })
        }
    }

    //clear the image
    const clearImage = (event) => {
        event.preventDefault()
        setProduct({
            ...product,
            image: undefined,
            imagePreview: null
        })
    }

    const clearForm = () => {
        setProduct({
            title: '',
            description: '',
            price: 0,
            discountedPrice: 0,
            quantity: 1,
            live: false,
            stock: true,
            image: undefined,
            imagePreview: undefined
        })
        editorRef.current.setContent('')
    }

    const submitAddProductForm = (event) => {
        event.preventDefault()
        console.log(product);
        if (product.title === null || product.title.trim() === '') {
            toast.warn("title field can't be empty!")
            return
        }
        if (product.description === null || product.description.trim() === '') {
            toast.warn("description field can't be empty!")
            return
        }
        if (product.price === null || product.price === '') {
            toast.warn("price field can't be empty!")
            return
        }
        if (product.price <= 0) {
            toast.warn("Invalid price!")
            return
        }
        if (product.discountedPrice === null || product.discountedPrice === '') {
            toast.warn("discountedPrice field can't be empty!")
            return
        }
        if (product.discountedPrice <= 0 || product.discountedPrice >= product.price) {
            toast.warn("discounted price must be less than original price!")
            return
        }
        if (product.quantity === null || product.quantity === '') {
            toast.warn("quantity field can't be empty!")
            return
        }
        //if the category is selected then we call other api
        if (selectedCategoryId === 'none') {
            //Add product without category api call
            createProductWithoutCategory(product)
                .then(data => {
                    console.log(data);
                    if (!product.image) {
                        setProduct({
                            title: '',
                            description: '',
                            price: 0,
                            discountedPrice: 0,
                            quantity: 1,
                            live: false,
                            stock: true,
                            image: undefined,
                            imagePreview: undefined
                        })
                        toast.success("Product added successfully without image!! without category")
                        return;
                    }
                    //product image api call 
                    addProductImage(product.image, data.productId)
                        .then(imageData => {
                            console.log(imageData);
                            setProduct({
                                title: '',
                                description: '',
                                price: 0,
                                discountedPrice: 0,
                                quantity: 1,
                                live: false,
                                stock: true,
                                image: undefined,
                                imagePreview: undefined
                            })
                        })
                        .catch(error => {
                            console.log(error);
                            toast.error("Error in adding image!! without category")
                        })
                    toast.success("Product added successfully!! without category")
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    toast.error("Error in creating product!! Check product details. without category")
                })
        }
        else {
            //Add product with category api call
            createProductInCategory(product, selectedCategoryId)
                .then(data => {
                    console.log(data);
                    if (!product.image) {
                        setProduct({
                            title: '',
                            description: '',
                            price: 0,
                            discountedPrice: 0,
                            quantity: 1,
                            live: false,
                            stock: true,
                            image: undefined,
                            imagePreview: undefined
                        })
                        toast.success("Product added successfully without image!! with category")
                        return;
                    }
                    //product image api call 
                    addProductImage(product.image, data.productId)
                        .then(imageData => {
                            console.log(imageData);
                            toast.success("Product added successfully!! with category")
                            setProduct({
                                title: '',
                                description: '',
                                price: 0,
                                discountedPrice: 0,
                                quantity: 1,
                                live: false,
                                stock: true,
                                image: undefined,
                                imagePreview: undefined
                            })
                            clearForm()
                        })
                        .catch(error => {
                            console.log(error);
                            toast.error("Error in adding image!! with category")
                        })
                    toast.success("Product added successfully!! with category")
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    toast.error("Error in creating product!! Check product details. with category")
                })
        }
    }

    const formView = () => {
        return (
            <>
                <Card className="border-0 shadow">
                    {/* {JSON.stringify(product)} */}
                    <Card.Body>
                        <h1>Add product</h1>
                        <Form noValidate onSubmit={submitAddProductForm}>
                            {/* title field */}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Title"
                                className="mb-2"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Enter here"
                                    onChange={(event) => handleChange(event, 'title')}
                                    value={product.title}
                                />
                            </FloatingLabel>

                            {/* description field */}
                            {/* <FloatingLabel
                                controlId="floatingTextarea"
                                label="Description"
                                className="mb-2"
                            >
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    placeholder="describe about product here"
                                    onChange={event => handleChange(event, 'description')}
                                    value={product.description}
                                />
                            </FloatingLabel> */}
                            {/* {JSON.stringify(product.description)} */}
                            <Form.Group className="mb-2">
                                <Form.Label>Description</Form.Label>
                                <Editor
                                    apiKey='your-api-key'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p></p>"
                                    init={{
                                        height: 225,
                                        menubar: true,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={() => setProduct({
                                        ...product,
                                        description: editorRef.current.getContent()
                                    })}
                                    value={product.description}
                                />
                            </Form.Group>

                            <Row>
                                <Col>
                                    {/* price field */}
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Price"
                                        className="mb-2"
                                    >
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter here"
                                            onChange={(event) => handleChange(event, 'price')}
                                            value={product.price}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    {/* discounted price field */}
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Discounted price"
                                        className="mb-2"
                                    >
                                        <Form.Control
                                            type="number"
                                            placeholder="Enter here"
                                            onChange={(event) => {
                                                //checking isDiscountedPrice is less than original price or not
                                                if (event.target.value > product.price) {
                                                    toast.warn("discounted price must be less than original price")
                                                    return
                                                }
                                                handleChange(event, 'discountedPrice')
                                            }}
                                            value={product.discountedPrice}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            {/* quantity field */}
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Quantity"
                                className="mb-2"
                            >
                                <Form.Control
                                    type="number"
                                    placeholder="Enter here"
                                    onChange={(event) => handleChange(event, 'quantity')}
                                    value={product.quantity}
                                />
                            </FloatingLabel>

                            <Row>
                                <Col>
                                    {/* isStock field */}
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                        label="Stock available"
                                        className="mb-2"
                                        onChange={(event) => setProduct({
                                            ...product,
                                            stock: !product.stock
                                        })}
                                        value={product.stock}
                                        checked={product.stock}
                                    />
                                </Col>
                                <Col>
                                    {/* isLive field */}
                                    <Form.Check // prettier-ignore
                                        type="switch"
                                        id="custom-switch"
                                        label="Live product"
                                        className="mb-2"
                                        onChange={(event) => setProduct({
                                            ...product,
                                            live: !product.live
                                        })}
                                        value={product.live}
                                        checked={product.live}
                                    />
                                </Col>
                            </Row>
                            <Form.Group className="py-2">
                                <Container
                                    className="text-center m-2"
                                    hidden={!product.imagePreview}
                                >
                                    <img
                                        src={product.imagePreview}
                                        alt="product"
                                        className="img-fluid"
                                        style={{
                                            maxHeight: "350px",
                                            // objectFit:"contain"
                                            objectFit: "cover"
                                        }}
                                    />
                                </Container>
                                <Form.Label>Select product image</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type={'file'}
                                        onChange={event => handleFileChange(event)}
                                    />
                                    <Button variant="outline-secondary" onClick={clearImage}>Clear</Button>
                                </InputGroup>
                            </Form.Group>

                            {/* {JSON.stringify(selectedCategoryId)} */}
                            <Form.Group className="mt-3">
                                <Form.Label>Select category</Form.Label>
                                <Form.Select
                                    aria-label="Default select example"
                                    onChange={event => setSelectedCategoryId(event.target.value)}
                                    value={selectedCategoryId}
                                >

                                    <option value="none" key={"none"}>None</option>{
                                        (categories ? (
                                            <>
                                                {
                                                    categories.content.map(category =>
                                                        <option value={category.categoryId} key={category.categoryId}>{category.title}</option>
                                                    )
                                                }
                                            </>
                                        ) : '')
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Container className="text-center mt-3">
                                <Button type="submit" variant="success" size="small">Add product</Button>
                                <Button className="ms-2" onClick={clearForm} variant="danger" size="small">Reset</Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }

    return (
        <div>
            {
                formView()
            }
        </div>
    )
}

export default AddProduct;