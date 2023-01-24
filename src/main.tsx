import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from '@/contexts/user.context';
import '@/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <UserProvider>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </UserProvider>
);
