import { useAuth, useModal, useTodos } from '../hooks';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Icon } from './';

export function NavTop() {
  let auth = useAuth();
  let { handleShow } = useModal();
  let { isDone, setIsDone, fetchList } = useTodos();

  function onClickProfile() {
    handleShow('ACCOUNT_SETTING');
  }

  function onClickFilter() {
    fetchList(!isDone);
  }

  return (
    auth.user && (
      <Container>
        <Navbar.Brand href='#home'>My Todo</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Navbar.Text>
            <Button
              className='mr-2'
              onClick={onClickProfile}
              variant='outline-primary'
              size='sm'
            >
              <Icon icon='user' /> Account
            </Button>
            <Button
              variant={isDone ? 'secondary' : 'outline-secondary'}
              size='sm'
              onClick={onClickFilter}
            >
              <Icon icon='filter' />
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    )
  );
}

// onClick={() => {
//   auth.signout(() => history.push('/'));
// }}
