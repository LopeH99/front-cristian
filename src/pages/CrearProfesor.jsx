import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';
import PageContainer from '../components/PageContainer';

const CrearProfesor = () => {
  const {auth} = useLogin()
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    sexo: '',
    fechaNacimiento: '',
    cargo: '',
    telefono: '',
    revista: '',
    antiguedadDocente: '',
    antiguedadInstitucion: '',
    observaciones: '',
    legajo: '',
    email: '',
    password: ''
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

    console.log(usuario)

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
      <PageContainer title={"Agregar un nuevo profesor"}>
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
          
      <Form.Group controlId="cargo" className='mt-3'>
        <Form.Label>Cargo</Form.Label>
        <Form.Control as="select" name="cargo" onChange={handleChange} required>
          <option value="">Selecciona el cargo</option>
          <option value="MAESTRO_DE_GRADO">Maestro de Grado</option>
          <option value="MAESTRO_A_CARGO_DE_DIRECCION">Maestro a Cargo de Dirección</option>
          <option value="MAESTRO_ESPECIAL">Maestro Especial</option>
        </Form.Control>
      </Form.Group>
          
      <Form.Group controlId="telefono" className='mt-3'>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="telefono" onChange={handleChange} required />
      </Form.Group>
          
      <Form.Group controlId="revista" className='mt-3'>
        <Form.Label>Revista</Form.Label>
        <Form.Control as="select" name="revista" onChange={handleChange} required>
          <option value="">Selecciona la revista</option>
          <option value="TITULAR">Titular</option>
          <option value="SUPLENTE">Suplente</option>
          <option value="INTERINO">Interino</option>
        </Form.Control>
      </Form.Group>
          
      <Form.Group controlId="antiguedadDocente" className='mt-3'>
        <Form.Label>Antigüedad Docente</Form.Label>
        <Form.Control type="date" name="antiguedadDocente" onChange={handleChange} required />
      </Form.Group>
          
      <Form.Group controlId="antiguedadInstitucion" className='mt-3'>
        <Form.Label>Antigüedad Institucional</Form.Label>
        <Form.Control type="date" name="antiguedadInstitucion" onChange={handleChange} required />
          </Form.Group>
          
      <Form.Group controlId="observaciones" className='mt-3'>
        <Form.Label>Observaciones</Form.Label>
        <Form.Control type="text" name="observaciones" onChange={handleChange} required />
          </Form.Group>
          
      <Form.Group controlId="legajo" className='mt-3'>
        <Form.Label>Legajo</Form.Label>
        <Form.Control type="text" name="legajo" onChange={handleChange} required />
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

export default CrearProfesor;
