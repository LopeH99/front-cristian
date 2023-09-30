import { Col, Container, Row } from "react-bootstrap"
import { RouterProvider } from "react-router-dom"
import routerLogin from "./router/routerLogin"
import Header from "./components/Header"
import Navegation from "./components/Navegation"
import router from "./router/router"
import useLogin from "./hooks/useLogin"

const App = () => {

   const {auth} = useLogin()
  return (
    <Container fluid>
    {!auth ? (
      <RouterProvider router={routerLogin} />
      ): (
        <Row>
        <Header />
        <Col md={2} className="bg-dark h-100-lg z-index-top" style={{ position: 'fixed', overflowY: 'auto' }}>
          <Navegation />
        </Col>
        <Col md={{ span: 10, offset: 2 }} className="overflow-y-scroll" style={{height: '100vh', overflowX: 'hidden', overflowY: 'scroll' }}>
          <RouterProvider router={router} />
        </Col>
      </Row>    
    )}
  </Container>
  )
}

export default App
