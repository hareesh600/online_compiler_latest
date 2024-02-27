import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Signup from './Signup.jsx'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login.jsx'
import App from "./App.jsx"
import CreateorEnter from './CreteorEnter.jsx'
import Error from "./Error.jsx"
import UseContextProvider from './useContextProvider.jsx'
const routes = [
  {
    path: "/", 
    element: <Home/>,
    errorElement:<Error/>,
  },
  {
      path: "/signup", 
      element: <Signup/>,
      errorElement:<Error/>,
  },
  {
    path: "/login", 
    element: <Login/>,
    errorElement:<Error/>,
    
},
{
  path: "/join", 
  element: <CreateorEnter/>,
  errorElement:<Error/>,
  
},
{
  path:"/editor/:token",
  element:<App/>,
  errorElement:<Error/>,
},
{
  path:"/error",
  element:<Error/>,
}


];

const router = createBrowserRouter( routes );


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UseContextProvider>
    <RouterProvider router={router}></RouterProvider> 
    </UseContextProvider>
  </React.StrictMode>,
)
