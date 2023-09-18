import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table"
import axios from "axios";
import useLogin from "../hooks/useLogin";

const Profesores = () => {
    const [profesores, setProfesores] = useState()
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
            setProfesores(response.data.usuarios);
          } catch (error) {
            console.error(`Hubo un error al obtener los usuarios: ${error}`);
          }
        };
    
        obtenerUsuarios();
      }, []);
  return (
        <PageContainer title={"Profesores"} btnAdd={'/crear-usuario'}>
          <Table columns={columns} data={profesores} placeholder={"Filtrar por nombre"}/>
        </PageContainer>
  )
}

export default Profesores