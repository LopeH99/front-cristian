import { Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import moment from "moment";

const Eventos = () => {
  const { auth, baseUrl } = useLogin()
  const [eventos, setEventos] = useState([])
  
  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/eventos', {
          headers: {
            'Authorization': `${auth.token}`
          }
        });
        setEventos(response.data.eventos);
      } catch (error) {
        console.error(`Hubo un error al obtener los usuarios: ${error}`);
      }
    };

    obtenerEventos();
  }, []);

  return (
    <PageContainer title={"Historial de eventos"} btn btnAdd={"/crear-evento"} >
      <Container className="mt-4">
        <Row>
          {eventos.map((event, index) => (
            <Col md={10} className="offset-1 my-2" key={index}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={10}>
                      <h2>{event.titulo}</h2>
                    </Col>
                    <Col md={2}>
                      <h4>{moment(event.createdAt).format('DD-MM-YYYY')}</h4>
                    </Col>
                    <Col md={12}>
                      <p>{event.tipo}</p>
                    </Col>
                    <Col md={12}>
                      <img src={baseUrl + event?.imagen} width={"100%"} height={480} alt={event?.titulo} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>  
    </PageContainer>
  )
}

export default Eventos
