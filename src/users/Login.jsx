// import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Google from '../components/auth/google';
import { toast } from "react-toastify";
import NavigationBar from '../components/navigation/NavigationBar';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/'); 
        }
    });

    const loginHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://shy-cloud-3319.fly.dev/api/v1/auth/login', {
                email,
                password,
            }, {
                headers: {
                    "Content-type": "application/json",
                }
            }
            );

            // Check if the login was successful
            if (response.status === 200) { // You may need to adjust this status code
                localStorage.setItem('token', response.data.token);
                navigate('/', {replace: true}); // Corrected route to 'dashboard'
            }

            const { token } = response.data.data;

            localStorage.setItem("token", token);

        } catch (error) {
            if (axios.isAxiosError(error)) {
              toast.error(error.response.data.message);
              return;
            }
            toast.error(error.message);
          }
    };

    const goToRegister = () => {
        navigate('/register');
    };

    return (
        <>
      <div className="vh-100">
        <NavigationBar />

        <Container className="p-5 mt-5">
          <h1 className="text-center text-white mb-4 mt-4">Login Into Your Account</h1>
          <Form onSubmit={loginHandler}>
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
                <h3 style={{ color: "#020202"}} className="text-light py-2" onClick={goToRegister}>register</h3>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                <Google buttonText="Login with Google" />
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
    );
}

export default Login;
