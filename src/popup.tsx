import React from 'react';
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './components/App';

render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('react-target')
);
