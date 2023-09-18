import axios from 'axios';
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import PageContainer from '../components/PageContainer';
import useLogin from '../hooks/useLogin';

const CrearEvento = () => {
  const { auth } = useLogin();
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [novedad, setNovedad] = useState(false);
  const [incidencia, setIncidencia] = useState(false);
  const [fecha, setFecha] = useState('');
  const [archivo, setArchivo] = useState(null);

  const enviarFormulario = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', archivo);
    formData.append('titulo', titulo);
    formData.append('tipo', tipo);
    formData.append('novedad', novedad);
    formData.append('incidencia', incidencia);
    formData.append('fecha', fecha);

    try {
      await axios.post('http://localhost:3000/eventos', formData, {
        headers: {
          'Authorization': `Bearer ${auth.token}`
        }
      });
      alert('Evento creado con éxito');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al crear el evento');
    }
  };
  return (
    <PageContainer title={"Crear evento"}>
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