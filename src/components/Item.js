import { Card, Button } from 'react-bootstrap';
import { Icon } from './Icon';
import { useModal, useTodo } from '../hooks';

export function Item({ children, ...props }) {
  const { item } = props;
  let { setForm } = useTodo();
  let { handleShow } = useModal();

  function onClickTodo() {
    handleShow('EDIT_TODO', item);
    setForm(item);
  }
  return (
    <Card className='text-left m-2 shadow-bottom' onClick={onClickTodo}>
      <Button variant='danger' className='remove-button shadow-sm'>
        <Icon icon='trash' />
      </Button>
      <Card.Body className='pl-3 p-2'>
        <Card.Title className='mb-0 font-title'>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
