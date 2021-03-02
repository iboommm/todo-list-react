import React from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from '../hooks';

export function FormTodo() {
  const { title, description, setTitle, setDescription } = useTodo();

  return (
    <div>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          value={title}
          placeholder='Title'
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          value={description}
          placeholder='Description'
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
    </div>
  );
}
