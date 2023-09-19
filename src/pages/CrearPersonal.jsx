import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';
import PageContainer from '../components/PageContainer';

const CrearPersonal = () => {
    const {auth} = useLogin()
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    sexo: '',
    fechaNacimiento: '',
    cargo: ''
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'dni') {
      value = parseInt(value, 10);
    }
    setUsuario({
      ...usuario,
      [e.target.name]: value
    });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    usuario.rol = 'PROFESOR';

    try {
        const response = await axios.post('http://localhost:3000/usuarios', usuario, {
            headers: {
              'Authorization': `${auth.token}`
            }
          });
          console.log(response.data);
    } catch (error) {
      console.error(`Hubo un error al crear el usuario: ${error}`);
    }
  };

    return (
      <PageContainer title={"Crear Personal"}>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nombre" className='mt-3'>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="nombre" onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="apellido" className='mt-3'>
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" name="apellido" onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="dni" className='mt-3'>
        <Form.Label>DNI</Form.Label>
        <Form.Control type="number" name="dni" onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="sexo" className='mt-3'>
        <Form.Label>Sexo</Form.Label>
        <Form.Control as="select" name="sexo" onChange={handleChange} required>
          <option value="">Selecciona el sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="fechaNacimiento" className='mt-3'>
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control type="date" name="fechaNacimiento" onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="email" className='mt-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="password" className='mt-3'>
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="password" onChange={handleChange} required />
      </Form.Group>

      {/* Agrega aquí los Form.Group para los otros campos según el rol */}

      <Button variant="primary" type="submit" className='my-4'>
        Crear usuario
      </Button>
            </Form>
            </PageContainer>
  );
};

export default CrearPersonal;
