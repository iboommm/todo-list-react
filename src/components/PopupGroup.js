import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useModal, useAuth, useTodo, useTodos, AddTodo } from '../hooks';
import { Icon, FormTodo, Popup } from '../components';

export function PopupGroup() {
  const modal = useModal();
  const auth = useAuth();
  const { title, description, clear } = useTodo();
  const { fetchList } = useTodos('todos');
  let history = useHistory();

  async function onAddTodoSubmit() {
    const result = await AddTodo('todos', { title, description });
    if (result.status === 200) {
      clear();
      fetchList();
    }
    modal.handleClose();
  }

  return (
    <div>
      {modal.name === 'ACCOUNT_SETTING' && (
        <Popup title='Account Setting' mode='hb' value={modal}>
          <Button
            variant='danger'
            size='md'
            active
            block
            onClick={() => {
              auth.signout(() => history.push('/'));
            }}
          >
            <Icon icon='sign-out-alt' /> Sign out
          </Button>
        </Popup>
      )}
      {modal.name === 'ADD_TODO' && (
        <Popup
          title='Add todo'
          mode='hbf'
          value={modal}
          onSubmit={onAddTodoSubmit}
        >
          <FormTodo />
        </Popup>
      )}
    </div>
  );
}
