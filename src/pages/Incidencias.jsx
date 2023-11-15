import { Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import useLogin from "../hooks/useLogin"
import { useState, useEffect } from "react"
import axios from "axios";
import moment from "moment";

const Incidencias = () => {
  const { auth, baseUrl } = useLogin()
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        await axios.get('http://localhost:3000/eventos?incidencia=true', {
          headers: {
            'Authorization': `${auth.token}`
          }
        }).then((response)=>{
          const data = response.data.incidencias || []
          data?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
          setEventos(data);
        })
      } catch (error) {
        console.error(`Hubo un error al obtener los usuarios: ${error}`);
      }
    };

    obtenerEventos();
  }, []);

  return (
    <PageContainer title={"Historial de incidencias"} btn btnAdd={"/crear-incidencia"} >
      <Container className="mt-4">
        <Row>
          {eventos.map((incident, index) => (
            <Col md={10} className="offset-1 my-2" key={index}>
              <Card>
                <Card.Body>
                  <h4>{incident.titulo}</h4>
                  <h5>{moment(incident.created_at).format('DD-MM-YYYY HH:mm:ss')}</h5>
                  <p>{incident.type}</p>
                  <p>{incident?.descripcion}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Incidencias
