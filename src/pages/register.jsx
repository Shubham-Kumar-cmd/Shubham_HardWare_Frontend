import { Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import Base from "../components/Base";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/UserService";
import { NavLink } from "react-router-dom";

const Register = () => {

    let [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
        gender: ''
    })

    //To display the error message when user enter wrong details during register
    let [err, setErrorData] = useState({
        isError:false,
        errorData:null
    })

    const [loading,setLoading]=useState(false)


    const handleChange = (event, property) => {
        setData({
            ...data,
            [property]: event.target.value
        })
    }
    
    //clear data
    const clearData=()=>{
        setData({
            name: '',
            email: '',
            password: '',
            about: '',
            gender: '',
        })
        setErrorData({
            isError:false,
            errorData:null
        })
        setLoading(false)
    }

    //do signup function
    const submitForm=(event)=>{
        event.preventDefault();
        console.log(data);

        //client side validation
        if (data.name===undefined || data.name.trim()==='') {
            toast.error("name field can't be empty");
            return
        }
        if (data.email===undefined || data.email.trim()==='') {
            toast.error("email field can't be empty");
            return
        }
        if (data.password===undefined || data.password.trim()==='') {
            toast.error("password field can't be empty");
            return
        }
        if (data.gender===undefined || data.gender.trim()==='') {
            toast.error("select your gender");
            return
        }

        //call api
        setLoading(true)
        registerUser(data)
        .then(userData=>{
            //success handler
            console.log(userData);
            toast.success("user created successfully!!")
            clearData()
        })
        .catch(error=>{
            //error handler
            console.log(error);
            setErrorData({
                isError: true,
                errorData: error
            })
            // toast.error("something went wrong on the server!!")
            toast.error(error.response.data.message)
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    const registerForm = () => {
        return (
            <Container className="m-5">
                <Row>
                    <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }} >
                        <Card style={
                            {
                                positon:'relative',
                                top:-80
                            }
                        }>
                            <Card.Body>
                                <h2 className="display-muted mb-3 text-center">Create Account</h2>
                                <Form noValidate onSubmit={submitForm}>

                                    {JSON.stringify(data)}
                                    {/* name field */}
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Username"
                                        className="mb-2"
                                    >
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Your name"
                                        onChange={(event) => handleChange(event, 'name')}
                                        value={data.name}
                                        isInvalid={err.errorData?.response?.data?.name}
                                         />
                                        <Form.Control.Feedback type="invalid">{err.errorData?.response?.data?.name}</Form.Control.Feedback>
                                    </FloatingLabel>

                                    {/* email field */}
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-2"
                                    >
                                        <Form.Control 
                                        type="email" 
                                        placeholder="name@example.com" 
                                        onChange={(event) => handleChange(event, 'email')}
                                        value={data.email}
                                        isInvalid={err.errorData?.response?.data?.email}
                                        />
                                        <Form.Control.Feedback type="invalid">{err.errorData?.response?.data?.email}</Form.Control.Feedback>
                                    </FloatingLabel>

                                    {/* password field */}
                                    <FloatingLabel
                                        controlId="floatingPassword"
                                        label="Password"
                                        className="mb-2"
                                    >
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        onChange={(event) => handleChange(event, 'password')}
                                        value={data.password}
                                        isInvalid={err.errorData?.response?.data?.password}
                                        />
                                        <Form.Control.Feedback type="invalid">{err.errorData?.response?.data?.password}</Form.Control.Feedback>
                                    </FloatingLabel>

                                    {/* gender field */}
                                    <Form.Group className="mb-2">
                                        <Form.Label>Select gender</Form.Label>
                                        <div>
                                            <Form.Check
                                                inline
                                                name="gender"
                                                label="Male"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'male'}
                                                checked={data.gender === 'male'}
                                                onChange={event => handleChange(event, 'gender')}
                                            />

                                            <Form.Check
                                                inline
                                                name="gender"
                                                label="Female"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'female'}
                                                checked={data.gender === 'female'}
                                                onChange={event => handleChange(event, 'gender')}
                                            />
                                        </div>
                                    </Form.Group>


                                    {/* <FloatingLabel 
                                    controlId="floatingSelect" 
                                    label="Select gender" 
                                    className="mb-2"
                                    >
                                        <Form.Select aria-label="Floating label select example">
                                            <option>Male</option>
                                            <option value="female">Female</option>
                                        </Form.Select>
                                    </FloatingLabel> */}

                                    {/* about field */}
                                    <Form.Group>
                                        <FloatingLabel
                                            controlId="floatingTextarea"
                                            label="Comments"
                                            className="mb-2"
                                        >
                                            <Form.Control 
                                            as="textarea" 
                                            placeholder="Leave a comment here" 
                                            onChange={event => handleChange(event, 'about')}
                                            value={data.about}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <div className="text-center">
                                        <p>Already have an account? <NavLink to='/login'>Sign in</NavLink></p>
                                        <Container>
                                            <Button variant="warning" type="submit" disabled={loading}>
                                                <Spinner 
                                                animation="grow" 
                                                variant="dark" 
                                                size="sm"
                                                className="me-2"
                                                hidden={!loading}
                                                />
                                                <span hidden={!loading}>Wait</span>
                                                <span hidden={loading}>Continue</span>
                                            </Button>
                                        </Container>
                                    </div>
                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Base
            title={"HardWare Store"}
            description={"Fill the form correctly to register with us to get our services easily."}
            buttonEnabled={null}
            buttonLink="/"
            buttonText="Home"
            buttonType="warning"
        >
            {registerForm()}
        </Base>
    );
}

export default Register;