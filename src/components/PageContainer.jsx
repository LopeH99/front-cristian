import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const PageContainer = ({ title, children, btnAdd, btnDownloadList }) => {
  const navigate = useNavigate()
  return (
        <Container fluid className="p-5 bg-light">
          <Row>
            <Col md={6}>
              <h1>{title}</h1>
            </Col>
            <Col md={6}>
              {btnAdd && (
                <Button className="float-end px-5 mx-2 btn btn-success" onClick={()=>navigate(btnAdd)}>
                  Agregar
                </Button>
              )}
              {btnDownloadList && (
                <Button className="float-end px-5 mx-2" onClick={()=>btnDownloadList()}>
                  Descargar listado
                </Button>
              )}
            </Col>
          </Row> 
          {children}
        </Container>
  )
}

export default PageContainer