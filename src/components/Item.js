import { Toast } from 'react-bootstrap';
import { useModal, useTodo } from '../hooks';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import { Icon } from './';
import { apiGet } from '../api/connect';

export function Item({ children, ...props }) {
  const { item } = props;
  let { setForm } = useTodo();
  let { handleShow } = useModal();

  dayjs.extend(relativeTime);

  async function onClickEditTodo() {
    const { id } = item;
    const result = await apiGet(`todos/${id}`);
    handleShow('EDIT_TODO', result);
    setForm(item);
  }

  function onClickRemoveTodo() {
    handleShow('REMOVE_TODO', item);
    setForm(item);
  }
  return (
    <>
      <Toast
        className='mw-100 ml-3 mr-3 animate__animated animate__fadeInRight animate__faster'
        onClose={() => onClickRemoveTodo()}
      >
        <Toast.Header>
          <strong onClick={onClickEditTodo} className='mr-auto'>
            {item.isDone && (
              <span className='text-success'>
                {' '}
                <Icon icon='check' />{' '}
              </span>
            )}
            {item.title}
          </strong>
          <small>{dayjs(item.updatedAt).fromNow()}</small>
        </Toast.Header>
        <Toast.Body onClick={onClickEditTodo} className='text-left'>
          {item.description}
        </Toast.Body>
      </Toast>
    </>
  );
}
