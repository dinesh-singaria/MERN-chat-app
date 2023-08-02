import React from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom' 
import { ChakraProvider } from '@chakra-ui/react'
import ChatProvider from './Context/ChatProvider';


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
<BrowserRouter>
  <ChatProvider>
    
    <ChakraProvider>
    <App />
    </ChakraProvider>
    
  </ChatProvider>
</BrowserRouter>
   
);