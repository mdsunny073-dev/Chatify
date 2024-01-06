import React from 'react'
import ReactDOM from 'react-dom';
import Registration from "./pages/Registration/Registration"
import Login from "./pages/Login/Login"


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import firebaseConfig from './authentication/firebaseConfig.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home.jsx';
import store from './Store';
import { Provider } from 'react-redux'
import Message from './pages/Message/Message';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Registration/>,
  },
  {
    path: "/Login",
    element: <Login/>,
  },
  {
    path: "/Home",
    element: <Home/>,
  },
  {
    path: "/Message",
    element: <Message/>,
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
    <RouterProvider router={router} />
    </div>
    </Provider>
  </React.StrictMode>,
);

