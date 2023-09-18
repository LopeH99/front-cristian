import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const TableFood = () => {
    const navigate = useNavigate()
    const [week, setWeek] = useState()
  return (
    <Container fluid>
        <Row className="mt-3">
            <Col md={3}>
                <Row>
                <Col>Seleccionar semana</Col>
                <Col>
                    <Form.Control
                    type="date"
                    placeholder="Semana"
                    value={week}
                    onChange={(event) => setWeek(event.target.value)}
                    />
                </Col>
                </Row>
            </Col>
            <Col md={3} className="offset-md-6">
                <Row>
                    <Button className="col-md-12">Descargar listado</Button>
                    <Button className="col-md-12 mt-2 btn btn-success" onClick={()=>navigate('/registrar-semana')}>Registrar semanas</Button>
                </Row>      
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Row>
                    <Col md={12}><h3>Periodo de la semana</h3></Col>
                      
                    <Col md={12} className="card p-3 my-3">
                        <Row>
                            <Col md={12}>Dia:</Col>  
                            <Col md={12}>Menú:</Col>  
                            <Col md={12}>Ingredientes:</Col>  
                        </Row>
                    </Col>
                    <Col md={12} className="card p-3 my-3">
                        <Row>
                            <Col md={12}>Dia:</Col>  
                            <Col md={12}>Menú:</Col>  
                            <Col md={12}>Ingredientes:</Col>  
                        </Row>
                    </Col>
                    <Col md={12} className="card p-3 my-3">
                        <Row>
                            <Col md={12}>Dia:</Col>  
                            <Col md={12}>Menú:</Col>  
                            <Col md={12}>Ingredientes:</Col>  
                        </Row>
                    </Col>
                    <Col md={12} className="card p-3 my-3">
                        <Row>
                            <Col md={12}>Dia:</Col>  
                            <Col md={12}>Menú:</Col>  
                            <Col md={12}>Ingredientes:</Col>  
                        </Row>
                    </Col>
                    <Col md={12} className="card p-3 my-3">
                        <Row>
                            <Col md={12}>Dia:</Col>  
                            <Col md={12}>Menú:</Col>  
                            <Col md={12}>Ingredientes:</Col>  
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>  
          
    </Container>   
  )
}

export default TableFood