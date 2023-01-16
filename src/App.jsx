import Home from './routes/home/home.component';
import { Routes, Route, Outlet } from 'react-router-dom';

const Shop = () => {
  return <div> I am Shop page</div>;
};

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>I am the Navigation bar</h1>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation></Navigation>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="shop" element={<Shop></Shop>}></Route>
      </Route>
    </Routes>
  );
};

export default App;
