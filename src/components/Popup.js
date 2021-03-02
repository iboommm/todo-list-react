import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export function Popup({
  children,
  value,
  title,
  mode = 'hbf',
  onSubmit = () => {},
}) {
  <Button variant='primary' onClick={onSubmit}>
    Submit
  </Button>;
  const { show, handleClose } = value;

  const showHeader = mode.includes('h');
  const showBody = mode.includes('b');
  const showFooter = mode.includes('f');

  return (
    <>
      <Modal
        animation={false}
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        {showHeader && (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}
        {showBody && <Modal.Body>{children}</Modal.Body>}
        {showFooter && (
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={onSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
}
