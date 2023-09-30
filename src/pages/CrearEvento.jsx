import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import PageContainer from '../components/PageContainer';
import useLogin from '../hooks/useLogin';
import { useParams } from 'react-router-dom';
import ToastBootstrap from "../components/Toasts";

const CrearEvento = () => {
  const { auth } = useLogin();
  const { id } = useParams(); // Obtén el id desde los parámetros de la URL
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [novedad, setNovedad] = useState(false);
  const [incidencia, setIncidencia] = useState(false);
  const [fecha, setFecha] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    title: "Novedad",
    message: "Se elimino la novedad correctamente",
    color:"danger"
  });

  const resetForm = () => {
  setTitulo('');
  setTipo('');
  setNovedad(false);
  setIncidencia(false);
  setFecha('');
  setArchivo(null);
  setDescripcion('');
};



const enviarFormulario = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const newFile = new File([archivo], archivo.name.toLowerCase(), {type: archivo.type});
  formData.append('files', newFile);
  formData.append('titulo', titulo);
  formData.append('descripcion', descripcion);
  formData.append('tipo', tipo);
  formData.append('novedad', novedad);
  formData.append('incidencia', incidencia);
  formData.append('fecha', new Date(fecha).toISOString())

  try {
    if (id) {
      // Si se proporciona un id, actualiza el evento existente
      await axios.put(`http://localhost:3000/eventos/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
    setToastMessage({
      title: "Evento",
      message: "Se actualizo correctamente",
      color:"success"
    })
      setShowToast(true)
      resetForm();
    } else {
      // Si no se proporciona un id, crea un nuevo evento
      await axios.post('http://localhost:3000/eventos', formData, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
    setToastMessage({
      title: "Evento",
      message: "Se creo el evento correctamente",
      color:"success"
    })
    setShowToast(true)
    }
  } catch (error) {
    console.error(error);
    setToastMessage({
      title: "Evento",
      message: "No se pudo crear el evento",
      color:"danger"
    })
    setShowToast(true)
  }
};

  const getNovedad = async () => {
      console.log(id)
    try {
      const response = await axios.get(`http://localhost:3000/eventos?novedad=true&incidencia=false&id=${id}`, {
        headers: {
          'Authorization': `${auth.token}`
        }
      });
      const novedad = response.data.novedades;
      // Establece los estados con los datos de la novedad
      setTitulo(novedad[0].titulo);
      setTipo(novedad[0].tipo);
      setNovedad(novedad[0].novedad);
      setIncidencia(novedad[0].incidencia);
      setFecha(novedad[0].fecha);
      setDescripcion(novedad[0].descripcion);
    } catch (error) {
      console.error(`Hubo un error al obtener la novedad: ${error}`);
    }
  };

  useEffect(() => {
    if (id) {
      getNovedad();
    }
  }, []);
  return (
    <PageContainer title={"Crear evento"} btnBack={'/eventos'}>
    <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
    <Form onSubmit={enviarFormulario}>
      <Form.Group className='mt-4' controlId="formFile">
        <Form.Label>Archivo</Form.Label>
        <Form.Control type="file" onChange={(e) => setArchivo(e.target.files[0])} required />
      </Form.Group>
      <Form.Group className='mt-3' controlId="formTitulo">
        <Form.Label>Título</Form.Label>
        <Form.Control type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
      </Form.Group>
      <Form.Group className='mt-4' controlId="formTipo">
        <Form.Label>Tipo</Form.Label>
        <Form.Control type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} required />
        </Form.Group>
        <Form.Group className='mt-4' controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        </Form.Group>
      <Form.Group className='mt-4' controlId="formNovedad">
        <Form.Check type="checkbox" label="Novedad" checked={novedad} onChange={(e) => setNovedad(e.target.checked)} />
      </Form.Group>
      <Form.Group className='mt-4' controlId="formIncidencia">
        <Form.Check type="checkbox" label="Incidencia" checked={incidencia} onChange={(e) => setIncidencia(e.target.checked)} />
      </Form.Group>
      <Form.Group className='mt-4' controlId="formFecha">
        <Form.Label>Fecha</Form.Label>
        <Form.Control type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit" className='mt-3'>Crear Evento</Button>
      </Form>
      </PageContainer>
  )
}

export default CrearEvento