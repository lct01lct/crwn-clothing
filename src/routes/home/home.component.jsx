import { Outlet } from 'react-router-dom';
import Directory from '@/components/directory/directory.component';
import Test from './test';

const Home = () => {
  return (
    <div className="home-container">
      <Outlet></Outlet>
      <Directory></Directory>
      <Test></Test>
    </div>
  );
};

export default Home;
