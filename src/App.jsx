
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Allergens from './Pages/Allergens/Allergens'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'

function App() {


  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/alergenos' element={<Allergens/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
