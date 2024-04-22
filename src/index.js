import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CartProvider from './contexts/CartContext';

import { ProductProvider } from './contexts/ProductContext';
import { SidebarProvider } from './contexts/SidebarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* Outermost to provide cart context globally */}
      <SidebarProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </SidebarProvider>
    </CartProvider>
  </React.StrictMode>
);
