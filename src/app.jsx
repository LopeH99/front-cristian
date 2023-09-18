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
        <Col md={2} className="bg-dark">
          <Navegation />
        </Col>
        <Col md={10} className="overflow-y-scroll">
          <RouterProvider router={router} />
        </Col>
      </Row>    
    )}
  </Container>
  )
}

export default App