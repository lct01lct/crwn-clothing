import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider, ProductsProvider, CartProvider } from '@/contexts/';
import '@/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <App></App>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  </BrowserRouter>
);
