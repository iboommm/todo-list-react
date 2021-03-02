import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth, isAuthenticated } from '../hooks';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Icon } from '../components';

export const LoginPage = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  if (isAuthenticated()) {
    history.push('/');
  }

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let { from } = location.state || { from: { pathname: '/' } };
  let login = () => {
    auth.signin(username, password, () => {
      history.replace(from);
    });
  };

  return (
    <Container className='h-100 d-flex align-items-center justify-content-md-center'>
      <Row className='m-0 w-100'>
        <Col>
          <Card>
            <Card.Header as='h5'>Login</Card.Header>
            <Card.Body>
              <Form className='text-left'>
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
                  />
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
                  />
                </Form.Group>
                <Button
                  onClick={login}
                  className='btn-block'
                  variant='primary'
                  type='button'
                >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
