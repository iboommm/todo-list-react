import React from 'react';
import { Form } from 'react-bootstrap';
import { useTodo } from '../hooks';

export function FormTodo() {
  const {
    title,
    description,
    isDone,
    submitted,
    setTitle,
    setDescription,
    setIsDone,
  } = useTodo();

  return (
    <div>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          value={title}
          placeholder='Title'
          isInvalid={title === '' && submitted}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a valid title.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          value={description}
          placeholder='Description'
          isInvalid={description === '' && submitted}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          Please provide a valid description.
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Check
        type='switch'
        onClick={(e) => setIsDone(!isDone)}
        defaultChecked={isDone}
        id='isDone'
        label='Is done'
      />
    </div>
  );
}
