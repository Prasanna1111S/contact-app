import React from 'react'
import { createBrowserRouter } from 'react-router-dom';
import ContactTable from '../components/ContactTable';
import ContactForm from '../components/ContactForm';


export const router = createBrowserRouter([
  {
    path:"/",
    element:<ContactTable/>,
  },
 
  {
    path:"/ContactForm",
    element:<ContactForm/>,
  },
])