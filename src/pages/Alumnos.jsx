import axios from "axios";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";

const Alumnos = () => {
    const [alumnos, setAlumnos] = useState()
    const { auth } = useLogin()

    const columns = [
        {
            name: 'Nombre y apellido',
            selector: row => row.nombre + " " + row.apellido,
        },
        {
          name: 'DNI',
          selector: row => row.dni,
        },
        {
            name: 'Sexo',
            selector: row => row.sexo,
        },
        {
            name: 'Fecha de nacimiento',
            selector: row => row.fechaNacimiento,
        },
        {
            name: 'Cargo',
            selector: row => row.cargo,
        }
    ];


    
    useEffect(() => {
        const obtenerUsuarios = async () => {
          try {
            const response = await axios.get('http://localhost:3000/usuarios', {
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