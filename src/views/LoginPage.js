import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth, isAuthenticated } from '../hooks';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from 'react-bootstrap';
import { Icon } from '../components';

export const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  if (isAuthenticated()) {
    history.push('/');
  }

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState({ valid: true });

  let { from } = location.state || { from: { pathname: '/' } };
  let login = (event) => {
    handleSubmit(event);
    if (username === '' || password === '') return;
    auth.signin(username, password, (res) => {
      setResult(res);
      if (res.valid) history.replace(from);
    });
  };

  return (
    <Container className='h-100 d-flex align-items-center justify-content-md-center'>
      <Row className='m-0 w-100'>
        <Col>
          <Card>
            <Card.Header as='h5'>Login</Card.Header>
            <Card.Body>
              <Form
                className='text-left'
                noValidate
                validated={validated}
                onSubmit={login}
              >
                <Form.Group>
                  <Form.Label>
                    <Icon icon='user' />
                    Username
                  </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please provide a username.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <Icon icon='lock' />
                    Password
                  </Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please provide a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className='btn-block' variant='primary' type='submit'>
                  Submit
                </Button>
                {!result.valid && (
                  <Alert className='mt-2' variant='danger'>
                    {result.msg}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
