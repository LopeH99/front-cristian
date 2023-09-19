import { Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"

const Incidencias = () => {
  const incidents = [
    { title: 'Incidencia 1', date: '2023-09-18', type: 'Tipo A', images: 'Imagen 1' },
    { title: 'Incidencia 2', date: '2023-09-17', type: 'Tipo B', images: 'Imagen 2' },
    { title: 'Incidencia 3', date: '2023-09-16', type: 'Tipo C', images: 'Imagen 3' },
    { title: 'Incidencia 4', date: '2023-09-15', type: 'Tipo D', images: 'Imagen 4' },
    { title: 'Incidencia 5', date: '2023-09-14', type: 'Tipo E', images: 'Imagen 5' },
    { title: 'Incidencia 6', date: '2023-09-13', type: 'Tipo F', images: 'Imagen 6' },
  ];

  return (
    <PageContainer title={"Historial de incidencias"} btn btnAdd={"/crear-evento"} >
      <Container className="mt-4">
        <Row>
          {incidents.map((incident, index) => (
            <Col md={10} className="offset-1 my-2" key={index}>
              <Card>
                <Card.Body>
                  <h2>{incident.title}</h2>
                  <h4>{incident.date}</h4>
                  <p>{incident.type}</p>
                  <p>{incident.images}</p>
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
