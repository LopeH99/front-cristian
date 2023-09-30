import { NavItem, NavLink } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useLogin from '../hooks/useLogin';

const Navegation = () => {
  const { cerrarSesion } = useLogin();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="flex-column">
            <NavItem>
              <NavLink className='fs-4 my-2' href="/">NOVEDADES</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/profesores">PROFESORES</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/alumnos">ALUMNOS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/usuarios">USUARIOS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/personal">PERSONAL</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/sugerencias">SUGERENCIAS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/eventos">EVENTOS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/incidencias">INCIDENCIAS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/horarios">HORARIOS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 my-2' href="/licencias">LICENCIAS</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className='fs-4 mt-2 mb-5' href="/comedor">COMEDOR</NavLink>
            </NavItem>
            <NavItem>
              <NavItem className='fs-4 mt-2 text-danger' onClick={()=>cerrarSesion()}><p className='ml-5'>Cerrar Sesion</p></NavItem>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default Navegation