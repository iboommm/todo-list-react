import { Toast } from 'react-bootstrap';
import { useModal, useTodo } from '../hooks';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';

export function Item({ children, ...props }) {
  const { item } = props;
  let { setForm } = useTodo();
  let { handleShow } = useModal();

  dayjs.extend(relativeTime);

  function onClickEditTodo() {
    handleShow('EDIT_TODO', item);
    setForm(item);
  }

  function onClickRemoveTodo() {
    handleShow('REMOVE_TODO', item);
    setForm(item);
  }
  return (
    <>
      <Toast className='mw-100 ml-4 mr-4' onClose={() => onClickRemoveTodo()}>
        <Toast.Header>
          <strong onClick={onClickEditTodo} className='mr-auto'>
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
