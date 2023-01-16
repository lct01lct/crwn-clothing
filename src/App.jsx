import Home from './routes/home/home.component';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
    </Routes>
  );
};

export default App;
