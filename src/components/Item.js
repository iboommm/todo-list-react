import { Card, Button } from 'react-bootstrap';

export function Item({ children, ...props }) {
  const { item } = props;
  return (
    <Card className='text-left m-2 shadow-sm'>
      <Card.Body className='p-2'>
        <Card.Title className='mb-1'>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
