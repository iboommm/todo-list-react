import { useTodos } from '../hooks';
import { Spinner } from 'react-bootstrap';

export function Backdrop() {
  const { loading } = useTodos();
  return (
    loading && (
      <div className='backdrop d-flex align-items-center justify-content-center'>
        <Spinner animation='border' role='status'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    )
  );
}
