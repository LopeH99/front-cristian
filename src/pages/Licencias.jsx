import axios from "axios";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table"
import useLogin from "../hooks/useLogin";
import { useEffect, useState } from "react";

const Licencias = () => {
    const { auth } = useLogin()
    const [licencias, setLicencias] = useState()

  const columns = [
    {
        name: 'Nombre y apellido',
        selector: row => row.solicitante.nombre + " " + row.solicitante.apellido,
    },
    {
        name: 'Articulo',
        selector: row => row.articulo,
    },
    {
        name: 'Dias',
        selector: row => row.dias,
    },
];

const data = [
    {
        id: 1,
        name: 'Beetlejuice',
        dias: '1988',
    },
    {
        id: 2,
        name: 'Ghostbusters',
        dias: '1984',
    },
    ]
    
useEffect(() => {
    const obtenerUsuarios = async () => {
        try {
        const response = await axios.get('http://localhost:3000/licencias', {
            headers: {
            'Authorization': `${auth.token}`
            }
        });
        setLicencias(response.data.licencias);
        } catch (error) {
        console.error(`Hubo un error al obtener las licencias: ${error}`);
        }
    };

    obtenerUsuarios();
}, []);
console.log(licencias)

  return (
    <PageContainer title={"Licencias"} btnAdd={"/crear-licencia"}>
          <Table columns={columns} data={data} placeholder={"Filtrar por nombre"}/>          
    </PageContainer>
  )
}

export default Licencias