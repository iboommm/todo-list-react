import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { TodoPage, LoginPage } from './views/pages';
import { ProvideAuth, ProvideModal, isAuthenticated } from './hooks';

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <div className='App'>
      <ProvideAuth>
        <ProvideModal>
          <Router>
            <Switch>
              <Route path='/login'>
                <LoginPage />
              </Route>
              <PrivateRoute path='/'>
                <TodoPage />
              </PrivateRoute>
            </Switch>
          </Router>
        </ProvideModal>
      </ProvideAuth>
    </div>
  );
}

export default App;
