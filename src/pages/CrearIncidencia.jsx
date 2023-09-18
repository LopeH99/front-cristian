import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const CrearIncidencia = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = () => {
    console.log(title)
  }

  return ( 
    <Container>
    <h2 className="text-center mt-3 mb-5">Crear Incidencia</h2>      
      
  <Form onSubmit={handleSubmit} className="p-3 shadow">
    <Form.Group controlId="title">
    <Form.Label>Titulo</Form.Label>
    <Form.Control
        type="text"
        placeholder="Introduce el titulo del evento"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        />
    </Form.Group>
    <Form.Group controlId="type" className="mt-3">
    <Form.Label>Tipo</Form.Label>
    <Form.Control
        type="text"
        placeholder="Introduce el tipo de evento"
        value={type}
        onChange={(event) => setType(event.target.value)}
        />
    </Form.Group>
    <Form.Group>
    <Form.Label className="mt-3">Fecha</Form.Label>
    <Form.Control
        type="date"
        placeholder="Introduce la fecha"
        value={date}
        onChange={(event) => setDate(event.target.value)}
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

export default CrearIncidencia;