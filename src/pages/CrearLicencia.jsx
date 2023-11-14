import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import PageContainer from "../components/PageContainer";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import axios from 'axios';
import ToastBootstrap from "../components/Toasts";

const CrearLicencia = () => {
  const {auth} = useLogin();
  const navigate = useNavigate()
  const [articulo, setArticulo] = useState("");
  const [dias, setDias] = useState(1);
  const [date, setDate] = useState(new Date());
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    title: "",
    message: "",
    color:""
  });
  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = {
      articulo,
      dias: Number(dias),
      fechaSolicitud: new Date(date).toISOString(),
    }
    try {
      await axios.post('http://localhost:3000/licencias', form, {
        headers: {
          'Authorization': `${auth.token}`
        }
      }).then((resp)=>{
        if(resp?.data?.ok){
          setToastMessage({
            title: "Licencia",
            message: "Licencia enviada con éxito",
            color:"success"
          })
            setShowToast(true)
            navigate('/licencias')
        }
      })
    } catch (error) {
      setToastMessage({
        title: "Sugerencia",
        message: "No se pudo crear la licencia",
        color:"danger"
      })
      setShowToast(true)
    }
  }

  return (
    <PageContainer title="Crear licencia" btnBack={'/licencias'}>
      <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
      <Form onSubmit={handleSubmit} className="p-3">
        <Form.Group controlId="articulo" className='mt-3'>
          <Form.Label>Articulos</Form.Label>
          <Form.Control as="select" name="articulo" value={articulo} onChange={(e)=>setArticulo(Number(e.target.value))} required>
            <option value="">Seleccione el articulo</option>
            <option value="Artículo 1 - Descanso por enfermedad">Artículo 1 - Descanso por enfermedad</option>
            <option value="Artículo 2 - Licencia por motivos personales">Artículo 2 - Licencia por motivos personales</option>
            <option value="Artículo 3 - Licencia por asuntos familiares">Artículo 3 - Licencia por asuntos familiares</option>
            <option value="Artículo 4 - Licencia por formación profesional">Artículo 4 - Licencia por formación profesional</option>
            <option value="Artículo 5 - Licencia por maternidad/paternidad">Artículo 5 - Licencia por maternidad/paternidad</option>
            <option value="Artículo 6 - Licencia por mudanza">Artículo 6 - Licencia por mudanza</option>
            <option value="Artículo 7 - Licencia por duelo">Artículo 7 - Licencia por duelo</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="title">
        <Form.Label>Días</Form.Label>
        <Form.Control
            type="number"
            placeholder="Introduce la cantidad de días."
            value={dias}
            onChange={(event) => setDias(event.target.value)}
            />
        </Form.Group>
        <Form.Group>
        <Form.Label className="mt-3">Fecha de Solicitud</Form.Label>
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
    </PageContainer>
  );
};

export default CrearLicencia;