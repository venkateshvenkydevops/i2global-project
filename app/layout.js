
'use client';  
import { Provider } from 'react-redux';
import store from '../store'; 
import '../styles/globals.css';  

export default function Layout({ children }) {
  return (
    <html lang="en"> 
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>I2global user</title>
        <meta name="description" content="i2user notes app built with Next.js" />
      </head>
      <body className="bg-gray-100">
        <Provider store={store}> 
          {children}
        </Provider>
      </body>
    </html>
  );
}

