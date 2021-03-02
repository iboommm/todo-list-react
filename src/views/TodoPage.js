import { Button } from 'react-bootstrap';
import { Nav, NavTop, Item, Icon, PopupGroup, Backdrop } from '../components';
import { useTodos, useModal, ProvideForm, ProvideList } from '../hooks';

export const TodoList = () => {
  let { todos } = useTodos();
  let { handleShow } = useModal();

  function onClickAdd() {
    handleShow('ADD_TODO');
  }

  return (
    <div className='content'>
      <Backdrop />
      <Nav placement='top'>
        <NavTop />
      </Nav>

      <div>
        {todos &&
          todos.map((todo) => <Item key={todo['_id']} item={todo}></Item>)}
      </div>

      <Nav placement='bottom'>
        <Button onClick={onClickAdd} variant='primary' size='md' active block>
          <Icon icon='plus' /> Add todo
        </Button>
      </Nav>
      <PopupGroup />
    </div>
  );
};

export function TodoPage() {
  return (
    <ProvideList>
      <ProvideForm>
        <TodoList />
      </ProvideForm>
    </ProvideList>
  );
}
