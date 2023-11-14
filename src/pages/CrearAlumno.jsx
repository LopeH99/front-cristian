import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import useLogin from '../hooks/useLogin';
import PageContainer from '../components/PageContainer';
import { useNavigate, useParams } from 'react-router-dom';

const CrearAlumno = () => {
  const navigate = useNavigate();
  const {auth} = useLogin()
  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    sexo: '',
    fechaNacimiento: '',
    cargo: '',
    telefonoTutor: '',
    revista: '',
    fechaIngreso: '',
    fechaEgreso: '',
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
    usuario.rol = 'ALUMNO';
    if(!id){
      const form = {
        ...usuario,
        rol: 'ALUMNO',
        cargo: 'MAESTRO_ESPECIAL',
        revista: 'SUPLENTE',
        fechaNacimiento: new Date(usuario.fechaNacimiento).toISOString(),
        fechaIngreso: new Date(usuario.fechaIngreso).toISOString(),
        fechaEgreso: new Date(usuario.fechaEgreso).toISOString(),
        telefono: usuario?.telefono || usuario?.telefonoTutor
      }
      try {
          await axios.post('http://localhost:3000/usuarios', form, {
            headers: {
              'Authorization': `${auth.token}`
            }
          }).then((resp)=>{
            if(resp?.data?.ok){
              navigate('/alumnos')
            }
          })
            console.log(response.data);
      } catch (error) {
        console.error(`Hubo un error al crear el usuario: ${error}`);
      }
    }else{
      const form = {
        ...usuario,
        rol: 'ALUMNO',
        cargo: usuario?.cargo || 'MAESTRO_ESPECIAL',
        revista: usuario?.revista || 'SUPLENTE',
        fechaNacimiento: new Date(usuario.fechaNacimiento).toISOString(),
        fechaIngreso: new Date(usuario.fechaIngreso).toISOString(),
        fechaEgreso: new Date(usuario.fechaEgreso).toISOString(),
        antiguedadDocente: new Date(usuario.antiguedadDocente).toISOString(),
        antiguedadInstitucion: new Date(usuario.antiguedadInstitucion).toISOString(),
        telefono: usuario?.telefono || usuario?.telefonoTutor
      }
      try {
          await axios.put(`http://localhost:3000/usuarios/${id}`, form, {
            headers: {
              'Authorization': `${auth.token}`
            }
          }).then((resp)=>{
            if(resp?.data?.ok){
              navigate('/alumnos')
            }
          })
            console.log(response.data);
      } catch (error) {
        console.error(`Hubo un error al crear el usuario: ${error}`);
      }
    }
  };

    return (
      <PageContainer title={"Agregar un nuevo alumno"} btnBack={'/alumnos'}>
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
        <Form.Control type="date" name="fechaNacimiento" value={usuario?.fechaNacimiento} onChange={handleChange} required />
          </Form.Group>
                    
      <Form.Group controlId="telefonoTutor" className='mt-3'>
        <Form.Label>Teléfono tutor</Form.Label>
        <Form.Control type="text" name="telefonoTutor" value={usuario?.telefonoTutor} onChange={handleChange} required />
      </Form.Group>
          
      <Form.Group controlId="gradoEscolar" className='mt-3'>
        <Form.Label>Cargo</Form.Label>
        <Form.Control as="select" name="gradoEscolar" value={usuario?.gradoEscolar} onChange={handleChange} required>
          <option value="">Selecciona el grado</option>
          <option value="JARDIN">JARDIN</option>
          <option value="PRIMER_GRADO">PRIMER_GRADO</option>
          <option value="SEGUNDO_GRADO">SEGUNDO_GRADO</option>
          <option value="TERCER_GRADO">TERCER_GRADO</option>
          <option value="CUARTO_GRADO">CUARTO_GRADO</option>
          <option value="QUINTO_GRADO">QUINTO_GRADO</option>
          <option value="SEXTO_GRADO">SEXTO_GRADO</option>
          <option value="SEPTIMO_GRADO">SEPTIMO_GRADO</option>
        </Form.Control>
      </Form.Group>
          
      <Form.Group controlId="fechaIngreso" className='mt-3'>
        <Form.Label>Fecha ingreso</Form.Label>
        <Form.Control type="date" name="fechaIngreso" value={usuario?.fechaIngreso} onChange={handleChange} required />
      </Form.Group>
          
      <Form.Group controlId="fechaEgreso" className='mt-3'>
        <Form.Label>Fecha egreso</Form.Label>
        <Form.Control type="date" name="fechaEgreso" value={usuario?.fechaEgreso} onChange={handleChange} required />
      </Form.Group>
      
      <Form.Group controlId="seguroEscolar" value={usuario?.seguroEscolar} className='mt-3'>
        <Form.Label className='mb-2'>Seguro escolar pagado</Form.Label>
        <Form.Check 
          type="checkbox"
          name="seguroEscolar"
          onChange={handleChange}
          label="Marque esta casilla si el seguro escolar ha sido pagado"
        />
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

      {!id && (
        <Form.Group controlId="password" className='mt-3'>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="password" name="password" onChange={handleChange} required />
        </Form.Group>
      )}

      {/* Agrega aquí los Form.Group para los otros campos según el rol */}

      <Button variant="primary" type="submit" className='my-4'>
        {!id ? 'Crear Alumno' : 'Editar Alumno'}
      </Button>
    </Form>
    </PageContainer>
  );
};

export default CrearAlumno;
