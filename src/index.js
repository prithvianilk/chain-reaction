import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'


ReactDOM.render(
    <ThemeProvider>
      <CSSReset />
        <App />
    </ThemeProvider>
, document.querySelector('#root'))