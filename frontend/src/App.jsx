import{BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Cargar from './pages/Cargar';
import Buscar from './pages/Buscar';
import Ventas from './pages/Ventas';
import Modificar from './pages/Modificar';

function App(){

  return(

    <BrowserRouter>
    <nav>
      <Link to="/">Cargar</Link>
      <Link to="/Buscar">Buscar</Link>
      <Link to="/Ventas">Ventas</Link>
      <Link to="/Modificar">Modificar</Link>
    </nav>

    <Routes>
      <Route path='/' element={<Cargar />} />
      <Route path='/Buscar' element={<Buscar />} />
      <Route path='/Ventas' element={<Ventas/>} />
      <Route path='/Modificar' element={<Modificar/>} />
    </Routes>

    </BrowserRouter>

  )  

}
export default App;