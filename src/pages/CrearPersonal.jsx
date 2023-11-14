import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';
import PageContainer from '../components/PageContainer';
import { useNavigate, useParams } from 'react-router-dom';

const CrearPersonal = () => {
  const {auth} = useLogin()
  const navigate = useNavigate();
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
          fechaIngreso: new Date(info.fechaIngreso)?.toISOString()?.split('T')[0],
          fechaEgreso: new Date(info.fechaEgreso)?.toISOString()?.split('T')[0],
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
    if(!id){
      const form = {
        ...usuario,
        cargo: 'MAESTRO_A_CARGO_DE_DIRECCION',
        rol: 'PERSONAL',
        fechaNacimiento: new Date(usuario.fechaNacimiento).toISOString(),
        fechaIngreso: new Date(usuario.fechaIngreso).toISOString(),
        antiguedadInstitucion: new Date(usuario.antiguedadInstitucion).toISOString(),
      }
      try {
          await axios.post('http://localhost:3000/usuarios', form, {
            headers: {
              'Authorization': `${auth.token}`
            }
          }).then((resp)=>{
            if(resp?.data?.ok){
              navigate('/personal')
            }
          })
      } catch (error) {
        console.error(`Hubo un error al crear el usuario: ${error}`);
      }
    }else{
      const form = {
        ...usuario,
        rol: 'PERSONAL',
        revista: 'TITULAR',
        observaciones: '-',
        legajo: '-',
        telefonoTutor: usuario?.telefono,
        cargo: 'MAESTRO_A_CARGO_DE_DIRECCION',
        fechaNacimiento: new Date(usuario.fechaNacimiento).toISOString(),
        antiguedadDocente: new Date(usuario.antiguedadDocente).toISOString(),
        fechaIngreso: new Date(usuario.fechaIngreso).toISOString(),
        fechaEgreso: new Date(usuario.fechaEgreso).toISOString(),
        antiguedadInstitucion: new Date(usuario.antiguedadInstitucion).toISOString(),
      }
      await axios.put(`http://localhost:3000/usuarios/${id}`, form, {
        headers: {
          'Authorization': `${auth.token}`
        }
      }).then((resp)=>{
        if(resp?.data?.ok){
          navigate('/personal')
        }
      })
    }
  };

    return (
    <PageContainer title={!id ? "Crear Personal" : "Editar Personal"} btnBack={'/personal'}>
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
        <Form.Group controlId="telefono" className='mt-3'>
          <Form.Label>Telefono</Form.Label>
          <Form.Control type="number" name="telefono" value={usuario?.telefono} onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="fechaNacimiento" className='mt-3'>
          <Form.Label>Fecha de Nacimiento</Form.Label>
          <Form.Control type="date" name="fechaNacimiento" value={usuario?.fechaNacimiento} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="fechaIngreso" className='mt-3'>
          <Form.Label>Fecha ingreso</Form.Label>
          <Form.Control type="date" name="fechaIngreso" value={usuario?.fechaIngreso} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="fechaIngreso" className='mt-3'>
          <Form.Label>Antiguedad institucional</Form.Label>
          <Form.Control type="date" name="antiguedadInstitucion" value={usuario?.antiguedadInstitucion} onChange={handleChange} required />
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
          { !id ? 'Crear Personal' : 'Editar Personal'}
        </Button>
      </Form>
    </PageContainer>
  );
};

export default CrearPersonal;
