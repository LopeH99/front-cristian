import { Col, Dropdown, Row } from "react-bootstrap"
import useLogin from "../hooks/useLogin"

const Header = () => {
  const { auth, cerrarSesion } = useLogin()

  return (
    <Row className="text-center bg-dark py-3 text-white d-none d-md-flex">
      <Col md={8} className="offset-md-2"><h4>SISTEMA DE GESTION ESCOLAR</h4></Col>
      <Col md={2}>
          <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="capitalize">
          {auth.nombre}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className="text-danger" onClick={()=>cerrarSesion()}><a href='/' style={{ color: 'red', textDecoration: 'none' }}>
                <p className='ml-5'>Cerrar Sesion</p>
              </a></Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  )
}

export default Header