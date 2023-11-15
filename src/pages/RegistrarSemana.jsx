import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import ToastBootstrap from "../components/Toasts";
import axios from 'axios';

const RegistrarSemana = () => {
    const [date, setDate] = useState("");
    const [menu, setMenu] = useState()
    const [ingredientes, setIngredientes] = useState()
    const { auth } = useLogin();
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
      fecha: new Date(date).toISOString(),
      menu,
      ingredientes
    }
    await axios.post('http://localhost:3000/menus', form, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      }).then(()=>{
        setToastMessage({
          title: "Menu",
          message: "Se creo el menu correctamente.",
          color:"success"
        })
        setShowToast(true)
        navigate('/comedor')
      })
  }

  return (
    <Container>
      <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
      <h2 className="text-center mt-5 mb-2">Registrar Menu</h2>
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