
import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';

const routerLogin = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);

export default routerLogin