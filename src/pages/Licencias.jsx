import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table"
import axios from "axios";
import useLogin from "../hooks/useLogin";
import { Button } from "react-bootstrap";
import moment from "moment";

const Licencias = () => {
    const [usuarios, setUsuarios] = useState()
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
        name: 'Fecha de nacimiento',
      selector: row => (moment(row.fechaNacimiento).format('DD-MM-YYYY')),
    },
      {
          name: 'Cargo',
          selector: row => row.rol,
      },
      {
          name: 'Acciones',
          selector: row => (<><Button variant="success">Autorizar</Button><Button variant="warning" className="mx-2">No autorizar</Button></>),
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
            setUsuarios(response.data.usuarios);
          } catch (error) {
            console.error(`Hubo un error al obtener los usuarios: ${error}`);
          }
        };
    
        obtenerUsuarios();
      }, []);
console.log(usuarios)
  return (
    <PageContainer title={"Licencias"} btnAdd={'/crear-licencia'}>
          <Table columns={columns} data={usuarios} placeholder={"Filtrar por nombre"}/>          
    </PageContainer>
  )
}

export default Licencias