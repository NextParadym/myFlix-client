import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ Birthday, setBirthday] = useState('');

// Declare hook for each input
const [ values, setValues] = useState ({
  usernameErr: ' ',
  passwordErr: ' ',
  emailErr: ' ',
  birthdayErr: ' '
});
const validate = () => {

let isReq = true;
if(username){
  setValues({...values, usernameErr: ' Username is required'});
  isReq = false;
}

if (!password){
  setValues({...values,passwordErr:'Password is required'});
  isReq = false;

}else if (password.length<6){
  setValues({...values, passwordErr: 'Password must be 6 charaters long'});
  isReq = false;
}


if (!email){
  setValues({...values,emailErr:'Email is required'});
  isReq = false;
}else if (email.indexOf('@')===-1){
  setValues({...values, emailErr: 'email is invalid'});
  isReq = false;
}
return isReq
}



  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq)
    axios.post(`https://murmuring-bastion-72555.herokuapp.com/users`, {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
  })
      .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration Successful!");
          window.open("/", "_self"); // the second arguement '_self' is necessary so that the page will open in the cureent tab
      })
      .catch(response=>{
          console.error(response);
          alert("unable to register!");
      });
};
  return (

    <Container fluid className="registerContainer" >
    
        <Navbar bg="navColor" variant="dark" expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home">My Comedy Flix</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#logout">Register</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
  
      <Row>
        <Col>
          <CardGroup>
            <Card className="registerCard">
              <Card.Body>
                <Card.Title className="text-center">Welcome to My Comedy Flix.</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
            
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                  {values.usernameErr && <p>{values.usernameErr}</p>}
                  
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    {values.emailErr && <p>{values.emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control className="mb-3" type="date" value={Birthday} onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>
                  
                  <Button className="registerButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>Register</Button>
                  
                </Form>
              </Card.Body>
            </Card>
        </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};



