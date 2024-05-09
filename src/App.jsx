
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Allergens from './Pages/Allergens/Allergens'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/alergenos' element={<Allergens/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
