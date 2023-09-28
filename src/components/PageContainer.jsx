import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const PageContainer = ({ title, children, btnAdd, btnBack, btnDownloadList }) => {
  const navigate = useNavigate()
  return (
        <Container fluid className="p-5 bg-light">
          <Row>
            <Col md={6}>
              <Row>
                {btnBack && (
                  <Col md={2}>
                    <FaArrowLeft size={45} onClick={()=>navigate(btnBack)} />
                  </Col>
                )}
                <Col md={10}>
                  <h1>{title}</h1>
                </Col>
              </Row>
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