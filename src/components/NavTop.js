import { useAuth, useModal } from '../hooks';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Icon } from './';

export function NavTop() {
  let auth = useAuth();
  let { handleShow } = useModal();

  function onClickProfile() {
    handleShow('ACCOUNT_SETTING');
  }

  return auth.user ? (
    <Container>
      <Navbar.Brand href='#home'>My Todo</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className='justify-content-end'>
        <Navbar.Text>
          <Button variant='outline-primary' size='sm' onClick={onClickProfile}>
            <Icon icon='user' /> Account
          </Button>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  ) : (
    <p>You are not logged in.</p>
  );
}

// onClick={() => {
//   auth.signout(() => history.push('/'));
// }}
