import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import Allergens from './Pages/Allergens/Allergens.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Dashboard from './Pages/Dashboard/Dashboard.jsx';
import CreateMenu from './Pages/CreateMenu/CreateMenu.jsx';
import Reservations from './Pages/Reservations/Reservations.jsx';
import SignUp from './Pages/SignUp/SignUp.jsx';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.jsx';
import OnlyAdminPrivateRoute from './Components/OnlyAdminPrivateRoute/OnlyAdminPrivateRoute.jsx';
import UpdateMenu from './Pages/UpdateMenu/UpdateMenu.jsx';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/alergenos' element={<Allergens/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Route>
        <Route element={<OnlyAdminPrivateRoute/>}>
          <Route path='/create-menu' element={<CreateMenu/>}/>
          <Route path='/create-reservations' element={<Reservations/>}/>
          <Route path='/update-menu/:menuId' element={<UpdateMenu/>}/>
        </Route>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
