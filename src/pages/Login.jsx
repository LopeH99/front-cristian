import { useState } from "react";
import { Form, Button, Container, Col, Row, Alert } from "react-bootstrap";
import { login } from "../services/authService";
import useLogin from "../hooks/useLogin";
import Alerta from "../components/Alerta";

const Login = () => {
    const {inicioSesion} = useLogin()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState();
    const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true)
      // Realizar la acción de inicio de sesión
      try {
          const result = await login(email, password);
          setAlert({message:"Se inicio sesion correctamente", variant:"success"})
          setTimeout(() => {
              if (result.data) {
                inicioSesion(result.data)
              }
          }, 2000);
      } catch (error) {
          setAlert({ message: "Email o contraseña incorrecta", variant: "danger" })
          setLoading(false)
    }

};

  return (
      <Container fluid className="pt-md-5 bg-primary bg-image" style={{height:'100vh'}}>
        <Row className="pf-md-5">
            <Col xs={12} sm={12} md={4} lg={4} className="offset-md-4 align-items-center justify-content-center">
                <Form onSubmit={handleSubmit} className="p-3 mt-5 bg-white shadow rounded my-auto border border-primary">
                    <h2 className="text-center mt-3 mb-5">SISTEMA DE GESTION ESCOLAR</h2>  
                    {alert && (<Alerta alerta={alert} />)}  
                    <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Introduce su email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                    <Form.Label className="mt-3">Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Introduce su contraseña"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>
                    <div className="text-center my-4">
                        <Button variant="primary" type="submit" className="px-5" disabled={loading}>
                        Iniciar sesión
                        </Button>
                    </div>  
                </Form>
            </Col>
        </Row>
    </Container>
  );
};

export default Login;