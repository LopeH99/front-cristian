import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import useLogin from "../hooks/useLogin";
import ToastBootstrap from "../components/Toasts";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const CrearIncidencia = () => {
  const { auth } = useLogin();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    title: "",
    message: "",
    color:""
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = {
      titulo: title,
      fecha: new Date(date).toISOString(),
      tipo: type,
      incidencia: true,
      descripcion
    }
    await axios.post('http://localhost:3000/eventos', form, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      }).then(()=>{
        setToastMessage({
          title: "Incidencia",
          message: "Se creo la incidencia correctamente.",
          color:"success"
        })
        setShowToast(true)
        navigate('/incidencias')
      })
  }

  return (
    <Container>
      <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
      <h2 className="text-center mt-3 mb-5">Crear Incidencia</h2>
      <Form onSubmit={handleSubmit} className="p-3 shadow">
        <Form.Group controlId="title">
          <Form.Label>Titulo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce el titulo del incidencia"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="type" className="mt-3">
          <Form.Label>Tipo</Form.Label>
          <Form.Control
            type="text"
            placeholder="Introduce el tipo de incidencia"
            value={type}
            onChange={(event) => setType(event.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-4' controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
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