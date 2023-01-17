import Home from './routes/home/home.component';
import Navigation from './components/navigation/navigation.component';
import { Routes, Route } from 'react-router-dom';

const Shop = () => {
  return <div> I am Shop page</div>;
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
