import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider, CategoriesProvider, CartProvider } from '@/contexts';
import '@/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <BrowserRouter>
    <UserProvider>
      <CategoriesProvider>
        <CartProvider>
          <App></App>
        </CartProvider>
      </CategoriesProvider>
    </UserProvider>
  </BrowserRouter>
);
