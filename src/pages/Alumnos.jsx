import axios from "axios";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import { Button } from "react-bootstrap";
import moment from "moment";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState()
  const { auth } = useLogin()
  
  const eliminarUsuario = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/usuarios/${id}`, {
            headers: {
                'Authorization': `${auth.token}`
            }
        });
        // Aquí puedes manejar la respuesta después de eliminar el usuario.
    } catch (error) {
        console.error(`Hubo un error al eliminar el usuario: ${error}`);
    }
  };

    const columns = [
      {
          name: 'Nombre y apellido',
          selector: row => row.nombre + " " + row.apellido,
      },
      {
          name: 'Sexo',
          selector: row => row.sexo,
      },
      {
        name: 'DNI',
        selector: row => row.dni,
      },
      {
        name: 'Fecha de nacimiento',
      selector: row => (moment(row.fechaNacimiento).format('DD-MM-YYYY')),
    },
      {
        name: 'Fecha de egreso',
      selector: row => (moment(row.fechaNacimiento).format('DD-MM-YYYY')),
    },
      {
        name: 'Fecha de ingreso',
      selector: row => (moment(row.fechaNacimiento).format('DD-MM-YYYY')),
    },
      {
        name: 'Telefono tutor',
        selector: row => row.telefono,
    },
      {
        name: 'Observaciones',
        selector: row => row.observaciones,
    },
      {
        name: 'Legajo',
        selector: row => row.legajo,
    },
    {
        name: 'Acciones',
        selector: row => (<>
          <Button variant="warning" onClick={() => navigate('/crear-usuario')}>E</Button>
          <Button variant="danger" className="mx-2" onClick={() => eliminarUsuario(row.id)}>X</Button>
      </>),
    }
  ];


    
    useEffect(() => {
        const obtenerUsuarios = async () => {
          try {
            const response = await axios.get('http://localhost:3000/usuarios?rol=ALUMNO', {
              headers: {
                'Authorization': `${auth.token}`
              }
            });
            setAlumnos(response.data.usuarios);
          } catch (error) {
            console.error(`Hubo un error al obtener los usuarios: ${error}`);
          }
        };
    
        obtenerUsuarios();
      }, []);
    
    console.log(alumnos)
  return (
        <PageContainer title={'Alumnos'} btnAdd={'/crear-usuario'}>
          <Table columns={columns} data={alumnos} placeholder={"Filtrar por nombre"}/>
        </PageContainer>
  )
}

export default Alumnos