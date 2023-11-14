import { Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import moment from "moment";

const Sugerencias = () => {
  const [sugerencias, setSugerencias] = useState()
  const { auth } = useLogin()


  useEffect(() => {
    const obtenerSugerencias = async () => {
      try {
        await axios.get('http://localhost:3000/sugerencias', {
          headers: {
            'Authorization': `${auth.token}`
          }
        }).then((response)=>{
          const data = response.data.sugerencias;
          data?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setSugerencias(response.data.sugerencias);
        })
      } catch (error) {
        console.error(`Hubo un error al obtener los usuarios: ${error}`);
      }
    };

    obtenerSugerencias();
  }, []);


  return (
    <PageContainer title={"Sugerencias"} btnAdd={'/crear-sugerencia'}>
      <Container className="py-3">
        <Row>
          {sugerencias?.map(sugerencia => (
            <Col xs={12} md={6} lg={4} className="my-2" key={sugerencia.id}>
              <Card>
                <Card.Header>
                  <Row>
                    <Col>
                  <p>{sugerencia.anonima ? "Anonima" : `${sugerencia.usuario.apellido} ${sugerencia.usuario.nombre}`}</p>
                  <h4>{sugerencia.tipo}</h4>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      {moment(sugerencia.created_at).format('DD-MM-YYYY HH:mm:ss')}
                    </Col>
                  </Row>
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