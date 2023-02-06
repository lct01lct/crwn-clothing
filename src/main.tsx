import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from '@/utils';
import '@/assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>

  // </React.StrictMode>
  <BrowserRouter>
    <Provider>
      <App></App>
    </Provider>
  </BrowserRouter>
);
