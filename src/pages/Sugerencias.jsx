import { Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import useLogin from "../hooks/useLogin";

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState()
  const { auth } = useLogin()


  useEffect(() => {
    const obtenerSugerencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/sugerencias', {
          headers: {
            'Authorization': `${auth.token}`
          }
        });
        setSugerencias(response.data.sugerencias);
      } catch (error) {
        console.error(`Hubo un error al obtener los usuarios: ${error}`);
      }
    };

    obtenerSugerencias();
  }, []);
  console.log(sugerencias)
  return (
    <PageContainer title={"Sugerencias"}>
      <Container className="py-3">
        <Row>
          {sugerencias?.map(sugerencia => (
            
            <Col md={4} className="my-2" key={sugerencia.id}>
              <Card>
                <Card.Header>
                  <h2>{sugerencia.tipo}</h2>
                </Card.Header>
                <Card.Body>
                  <p>{sugerencia.texo}</p>
                </Card.Body>
              </Card>
            </Col>
            ))}
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Sugerencias