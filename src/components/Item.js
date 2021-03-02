import { Card, Button } from 'react-bootstrap';
import { Icon } from './Icon';
import { useModal, useTodo } from '../hooks';

export function Item({ children, ...props }) {
  const { item } = props;
  let { setForm } = useTodo();
  let { handleShow } = useModal();

  function onClickEditTodo() {
    handleShow('EDIT_TODO', item);
    setForm(item);
  }

  function onClickRemoveTodo() {
    handleShow('REMOVE_TODO', item);
    setForm(item);
  }
  return (
    <Card className='text-left m-2 shadow-bottom animate__animated animate__fadeInRight'>
      <Button
        onClick={onClickRemoveTodo}
        variant='danger'
        className='remove-button shadow-sm'
      >
        <Icon icon='trash' />
      </Button>
      <Card.Body onClick={onClickEditTodo} className='pl-3 p-2'>
        <Card.Title className='mb-0 font-title'>{item.title}</Card.Title>
        <Card.Text className='pr-4'>{item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
