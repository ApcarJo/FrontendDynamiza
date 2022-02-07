import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './containers/Login/Login.jsx'
import Register from './containers/Register/Register.jsx'
import Record from './containers/Record/Record.jsx'
import Header from './components/Header/Header.jsx'
import './App.scss';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          {/* <Route path="/" element={<Home/>}></Route> */}
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/record" element={<Record/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
