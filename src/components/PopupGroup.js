import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import {
  useModal,
  useAuth,
  useTodo,
  useTodos,
  AddTodo,
  EditTodo,
  RemoveTodo,
} from '../hooks';
import { Icon, FormTodo, Popup } from '../components';

export function PopupGroup() {
  const modal = useModal();
  const auth = useAuth();
  const { id, title, description, clear } = useTodo();
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

  async function onEditTodoSubmit() {
    const result = await EditTodo('todos', { id, title, description });
    if (result.status === 200) {
      clear();
      fetchList();
    }
    modal.handleClose();
  }

  async function onRemoveTodoSubmit() {
    const result = await RemoveTodo('todos', { id });
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
            onClick={() => {
              auth.signout(() => history.push('/'));
            }}
            variant='danger'
            size='md'
            active
            block
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
      {modal.name === 'EDIT_TODO' && (
        <Popup
          title='Edit todo'
          mode='hbf'
          value={modal}
          onSubmit={onEditTodoSubmit}
        >
          <FormTodo />
        </Popup>
      )}
      {modal.name === 'REMOVE_TODO' && (
        <Popup
          title='Remove todo'
          mode='hf'
          value={modal}
          onSubmit={onRemoveTodoSubmit}
        ></Popup>
      )}
    </div>
  );
}
