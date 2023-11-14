import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';
import PageContainer from '../components/PageContainer';
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';

const CrearProfesor = () => {
  const navigate = useNavigate();
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
  const {id} = useParams();
  const traerUsuario = async() => {
    await axios.get(`http://localhost:3000/usuarios/${id}`, {
      headers: {
        'Authorization': `${auth.token}`
      }
    }).then((resp)=>{
      if(resp?.data?.ok){
        const info = resp?.data?.usuario;
          setUsuario({
          ...info,
          fechaNacimiento: new Date(info.fechaNacimiento)?.toISOString()?.split('T')[0],
          antiguedadDocente: new Date(info.fechaNacimiento)?.toISOString()?.split('T')[0],
          antiguedadInstitucion: new Date(info.fechaNacimiento)?.toISOString()?.split('T')[0],
          telefonoTutor: info?.telefonoTutor || info?.telefono,
          seccion: info?.seccion || 'SECCION_A',
          pagoSeguroEscolar: info?.pagoSeguroEscolar || true,
          gradoEscolar: info?.gradoEscolar || 'JARDIN'
        })
      }
    })
  }

  useEffect(() => {
    if(id){
      traerUsuario()
    }
  }, [])


  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'dni') {
      value = parseInt(value, 10);
    }
    if (e.target.name === 'antiguedadDocente' || e.target.name === 'antiguedadInstitucion' || e.target.name === 'fechaNacimiento') {
      const parsedDate = moment(value, moment.ISO_8601, true);
      if (parsedDate.isValid()) {
        value = parsedDate.format('YYYY-MM-DD');
        setUsuario({
          ...usuario,
          [e.target.name]: value
        });
      } else {
        console.error('Fecha no válida:', value);
      }
    } else {
      setUsuario({
        ...usuario,
        [e.target.name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    usuario.rol = 'PROFESOR';
    try {
      if(!id){
        const form = {
          ...usuario,
          rol: 'PROFESOR',
          fechaNacimiento: new Date(usuario.fechaNacimiento).toISOString(),
          antiguedadDocente: new Date(usuario.antiguedadDocente).toISOString(),
          antiguedadInstitucion: new Date(usuario.antiguedadInstitucion).toISOString(),
        }
        await axios.post('http://localhost:3000/usuarios', form, {
          headers: {
            'Authorization': `${auth.token}`
          }
        }).then((resp)=>{
          if(resp?.data?.ok){
            navigate('/profesores')
          }
        })
      }else{
        const form = {
          ...usuario,
          rol: 'PROFESOR',
          fechaNacimiento: new Date(usuario.fechaNacimiento).toISOString(),
          antiguedadDocente: new Date(usuario.antiguedadDocente).toISOString(),
          antiguedadInstitucion: new Date(usuario.antiguedadInstitucion).toISOString(),
        }
        await axios.put(`http://localhost:3000/usuarios/${id}`, form, {
          headers: {
            'Authorization': `${auth.token}`
          }
        }).then((resp)=>{
          if(resp?.data?.ok){
            navigate('/profesores')
          }
        })
      }
    } catch (error) {
      console.error(`Hubo un error al crear el usuario: ${error}`);
    }
  };

    return (
      <PageContainer title={"Agregar un nuevo profesor"} btnBack={'/profesores'}>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nombre" className='mt-3'>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="nombre" value={usuario?.nombre} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="apellido" className='mt-3'>
        <Form.Label>Apellido</Form.Label>
        <Form.Control type="text" name="apellido" value={usuario?.apellido} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="dni" className='mt-3'>
        <Form.Label>DNI</Form.Label>
        <Form.Control type="number" name="dni" value={usuario?.dni} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="sexo" className='mt-3'>
        <Form.Label>Sexo</Form.Label>
        <Form.Control as="select" name="sexo" value={usuario?.sexo} onChange={handleChange} required>
          <option value="">Selecciona el sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="fechaNacimiento" className='mt-3'>
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          name="fechaNacimiento"
          value={usuario?.fechaNacimiento}
          onChange={handleChange}
          required
          min="1900-01-01"
          max='2005-01-01'
        />
      </Form.Group>

      <Form.Group controlId="cargo" className='mt-3'>
        <Form.Label>Cargo</Form.Label>
        <Form.Control as="select" name="cargo" value={usuario?.cargo} onChange={handleChange} required>
          <option value="">Selecciona el cargo</option>
          <option value="MAESTRO_DE_GRADO">Maestro de Grado</option>
          <option value="MAESTRO_A_CARGO_DE_DIRECCION">Maestro a Cargo de Dirección</option>
          <option value="MAESTRO_ESPECIAL">Maestro Especial</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="telefono" className='mt-3'>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="telefono" value={usuario?.telefono} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="revista" className='mt-3'>
        <Form.Label>Revista</Form.Label>
        <Form.Control as="select" name="revista" value={usuario?.revista} onChange={handleChange} required>
          <option value="">Selecciona la revista</option>
          <option value="TITULAR">Titular</option>
          <option value="SUPLENTE">Suplente</option>
          <option value="INTERINO">Interino</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="antiguedadDocente" className='mt-3'>
        <Form.Label>Antigüedad Docente</Form.Label>
        <Form.Control type="date" name="antiguedadDocente" value={usuario?.antiguedadDocente} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="antiguedadInstitucion" className='mt-3'>
        <Form.Label>Antigüedad Institucional</Form.Label>
        <Form.Control type="date" name="antiguedadInstitucion" value={usuario?.antiguedadInstitucion} onChange={handleChange} required />
          </Form.Group>

      <Form.Group controlId="observaciones" className='mt-3'>
        <Form.Label>Observaciones</Form.Label>
        <Form.Control type="text" name="observaciones" value={usuario?.observaciones} onChange={handleChange} required />
          </Form.Group>

      <Form.Group controlId="legajo" className='mt-3'>
        <Form.Label>Legajo</Form.Label>
        <Form.Control type="text" name="legajo" value={usuario?.legajo} onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="email" className='mt-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={usuario?.email} onChange={handleChange} required />
      </Form.Group>

      { !id && (
        <Form.Group controlId="password" className='mt-3'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
      )}

      {/* Agrega aquí los Form.Group para los otros campos según el rol */}

      <Button variant="primary" type="submit" className='my-4'>
        {!id ? 'Crear usuario' : 'Editar usuario'}
      </Button>
    </Form>
    </PageContainer>
  );
};

export default CrearProfesor;
