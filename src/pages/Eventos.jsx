import { Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"

const Eventos = () => {
  const events = [
    { title: 'Evento 1', date: '2023-09-18', type: 'Tipo A', images: 'Imagen 1' },
    { title: 'Evento 2', date: '2023-09-17', type: 'Tipo B', images: 'Imagen 2' },
    { title: 'Evento 3', date: '2023-09-16', type: 'Tipo C', images: 'Imagen 3' },
    { title: 'Evento 4', date: '2023-09-15', type: 'Tipo D', images: 'Imagen 4' },
    { title: 'Evento 5', date: '2023-09-14', type: 'Tipo E', images: 'Imagen 5' },
    { title: 'Evento 6', date: '2023-09-13', type: 'Tipo F', images: 'Imagen 6' },
  ];

  return (
    <PageContainer title={"Historial de eventos"} btn btnAdd={"/crear-evento"} >
      <Container className="mt-4">
        <Row>
          {events.map((event, index) => (
            <Col md={10} className="offset-1 my-2" key={index}>
              <Card>
                <Card.Body>
                  <h2>{event.title}</h2>
                  <h4>{event.date}</h4>
                  <p>{event.type}</p>
                  <p>{event.images}</p>
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
