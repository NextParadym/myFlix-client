import React, { useState } from 'react';
	import Form from 'react-bootstrap/Form';
	import Button from 'react-bootstrap/Button';
	import PropTypes from 'prop-types';
	import {Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
	

	export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
	
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password);
	    // Send a request to the server for authentication, then call props.onLoggedIn(username)
      props.onLoggedIn(username);
    };

  
  return (
  <Container fluid="md">
    <Row>
      <Col  md={{ span: 6, offset: 3 }}>
        <CardGroup>
          <Card>
            <Card.Body>
              <Card.Title> Please login here </Card.Title>
              
                <Form className="loginCard">
                  <Form.Group className= "mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                      <Form.Control 
                        type="text" 
                        onChange={e => setUsername(e.target.value)}
                        placeholder ="Enter a username"/>
                  </Form.Group>
      
                  <Form.Group  controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                      <Form.Control 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder ="Enter a password"/>
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                  </Button>
                </Form>
            </Card.Body>
          </Card>
        </CardGroup>
      </Col>
    </Row>
  </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};