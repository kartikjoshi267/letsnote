import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import NavbarComp from './Components/NavbarComp/NavbarComp';
import Login from './Components/Login/Login';
import LoginContextProvider from './Context/Login/State';
import AlertComp from './Components/AlertComp/AlertComp';
import Notes from './Components/Notes/Notes';
import Home from './Components/Home/Home';

function App() {
  return (
    <LoginContextProvider>
      <BrowserRouter>
        <NavbarComp title="Let'sNote" />
        <AlertComp />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/notes' element={<Notes />} />
        </Routes>
      </BrowserRouter>
    </LoginContextProvider>
  );
}

export default App;