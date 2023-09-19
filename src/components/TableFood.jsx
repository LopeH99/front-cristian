import { useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const TableFood = () => {
    const navigate = useNavigate()
    const [week, setWeek] = useState()

    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    const menus = ['Pollo a la plancha', 'Pasta con salsa de tomate', 'Ensalada César', 'Sopa de verduras', 'Pizza Margherita'];
    const ingredients = [
        'Pollo, sal, pimienta',
        'Pasta, tomates, cebolla, ajo',
        'Lechuga, crutones, queso parmesano, aderezo César',
        'Zanahorias, apio, cebolla, caldo de verduras',
        'Masa de pizza, salsa de tomate, mozzarella'
    ];

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

                    {days.map((day, index) => (
                        <Col md={12} className="card p-3 my-3" key={index}>
                            <Row>
                                <Col md={12}>Dia: {day}</Col>  
                                <Col md={12}>Menú: {menus[index]}</Col>  
                                <Col md={12}>Ingredientes: {ingredients[index]}</Col>  
                            </Row>
                        </Col>
                    ))}
                    
                </Row>
            </Col>
        </Row>  
          
    </Container>   
  )
}

export default TableFood
