import { Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"

const Eventos = () => {
  return (
    <PageContainer title={"Historial de eventos"} btn btnAdd={"/crear-evento"} >
      <Container className="mt-4">
        <Row>
          <Col md={10} className="offset-1 my-2">
            <Card>
              <Card.Body>
                <h2>Titutlo del evento</h2>
                <h4>Fecha</h4>
                <p>Tipo de Evento</p>
                <p>Imagenes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={10} className="offset-1 my-2">
            <Card>
              <Card.Body>
                <h2>Titutlo del evento</h2>
                <h4>Fecha</h4>
                <p>Tipo de Evento</p>
                <p>Imagenes</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={10} className="offset-1 my-2">
            <Card>
              <Card.Body>
                <h2>Titutlo del evento</h2>
                <h4>Fecha</h4>
                <p>Tipo de Evento</p>
                <p>Imagenes</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
          
    </PageContainer>
  )
}

export default Eventos