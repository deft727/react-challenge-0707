import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {PublicRoutes} from 'routes'
// providers
import {
  LoginProvider,
} from "components/contexts/LoginContextContainer";

function App() {
  return (
    <Router>
      <LoginProvider>
        <PublicRoutes />
      </LoginProvider>
    </Router>
  );
}

export default App;
