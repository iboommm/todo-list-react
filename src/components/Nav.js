import { Navbar } from 'react-bootstrap';

export function Nav({ children, ...props }) {
  const { placement } = props;
  return (
    <Navbar
      className={placement === 'top' ? 'shadow-bottom' : 'shadow-top'}
      bg='light'
      fixed={placement}
    >
      {children}
    </Navbar>
  );
}
