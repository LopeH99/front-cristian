import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const RegistrarSemana = () => {
    const [date, setDate] = useState("");
    const [menu, setMenu] = useState()
    const [ingredientes, setIngredientes] = useState()

  const handleSubmit = () => {
    console.log(menu)
  }

  return ( 
    <Container>
    <h2 className="text-center mt-5 mb-2">Registrar Semana</h2>      
      
  <Form onSubmit={handleSubmit} className="p-3">
    <Form.Group controlId="title">
    <Form.Label>Dia</Form.Label>
    <Form.Control
        type="date"
        placeholder="Introduce el dia"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        />
    </Form.Group>
    <Form.Group controlId="type" className="mt-3">
    <Form.Label>Menu</Form.Label>
    <Form.Control
        as="textarea"
        placeholder="Describe menu"
        style={{ height: '200px' }}
        value={menu}
        onChange={(event) => setMenu(event.target.value)}
        />
    </Form.Group>
    <Form.Group>
    <Form.Label className="mt-3">Ingredientes</Form.Label>
    <Form.Control
        as="textarea"
        placeholder="Ingredientes"
        style={{ height: '200px' }}
        value={ingredientes}
        onChange={(event) => setIngredientes(event.target.value)}
      />
    </Form.Group>
    <div className="my-4">
        <Button variant="primary" type="submit" className="px-5">
        Enviar
        </Button>
    </div>  
      </Form>  
      </Container>    
  );
};

export default RegistrarSemana;