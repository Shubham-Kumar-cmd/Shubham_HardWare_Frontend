import { useContext, useState } from "react";
import Base from "../components/Base";
import { loginUser } from "../services/UserService";
import { Alert, Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login=()=>{

    const redirect=useNavigate()

    const userContext=useContext(UserContext)

    const [data, setData]=useState({
        email: '',
        password: ''
    })

    //To display the error message when user enter wrong details during login
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
            email: '',
            password: ''
        })
        setErrorData({
            isError:false,
            errorData:null
        })
        setLoading(false)
    }

    //do signin function
    const submitForm=(event)=>{
        event.preventDefault();
        console.log(data);

        //client side validation
        if (data.email===undefined || data.email.trim()==='') {
            toast.error("email field can't be empty");
            return
        }
        if (data.password===undefined || data.password.trim()==='') {
            toast.error("password field can't be empty");
            return
        }

        //call api
        setLoading(true)
        loginUser(data)
        .then(userData=>{
            //success handler
            console.log(userData);
            toast.success("login successfully!!")
            clearData()

            //redirect to dashboard page
            // 1) normal user: send it to normal user dashboard
            //we can remove setIsLogin and setUserData method bcz of doLogin method 
            // userContext.setIsLogin(true)
            // userContext.setUserData(userData)
            userContext.login(userData)
            redirect("/users/home")

            // 2) admin user: send it to admin user dashboard
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

    const loginForm=()=>{
        return (
            <Container className="m-5">
                <Row>
                    <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}  className="align-item-center">
                        <Card style={
                            {
                                positon:'relative',
                                top:-80
                            }
                        }>
                            <Card.Body>
                                <h2 className="display-muted mb-3 text-center">Sign in</h2>
                                <Alert show={err.isError} variant="danger" onClose={() => setErrorData({
                                    isError:false,
                                    errorData:null
                                })} dismissible
                                >
                                    <Alert.Heading>Hey there,</Alert.Heading>
                                    <p>{err.errorData?.response?.data?.message}</p>
                                </Alert>
                                <Form noValidate onSubmit={submitForm}>

                                    {JSON.stringify(data)}
                                    {JSON.stringify(userContext)}
                                    

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

                                    <div className="text-center">
                                        {/* <p>New user? <a className={{}} href='/signup'>Sign up</a></p> */}
                                        <p>forget password?<NavLink to="/forget">Click here</NavLink></p>
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
        title="Shubham HardWare" 
        description="Welcome back to store "
        buttonEnabled={null}
        buttonLink={"/"}
        buttonText="Shop Now"
        buttonType="success" 
        >
            {loginForm()}
        </Base>
    );
}

export default Login;