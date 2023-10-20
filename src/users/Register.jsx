import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/auth/google';
import NavigationBar from '../components/navigation/NavigationBar';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';


function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validation, setValidation] = useState({});
    const navigate = useNavigate();


    const registerHandler = async (e) => {
        e.preventDefault();

        try {
            // Send data as JSON
            const response = await axios.post('https://shy-cloud-3319.fly.dev/api/v1/auth/register', {
                name,
                email,
                password,
            },
            {
                headers: {
                    "Content-type": "application/json",
                },
            }
            );

            // Check if registration was successful
            if (response.status === 201) {
                // Redirect to the login page
                navigate('/login', {replace: true});
            }
        } catch (error) {
            // Handle validation errors
            if (error.response && error.response.data) {
                setValidation(error.response.data);
            }
        }
    };

    return (
        <>
      <div className="vh-100">
        <NavigationBar />
        <Container className="p-5 mt-5">
          <h1 className="text-center text-white mb-4 mt-4">Register Your Account</h1>
          <Form onSubmit={registerHandler}>
          {validation.message && (
                                <div className="alert alert-danger">
                                    {validation.message}
                                </div>
                            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-light">Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-light">Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="text-light">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Row>
              <Col className="text-center pt-1">
                <Button className="w-25" variant="danger" type="submit">
                  Submit
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <h3 className="text-light py-2">Or</h3>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <GoogleLogin buttonText="Register with Google 🚀" />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
    )
}

export default Register;
