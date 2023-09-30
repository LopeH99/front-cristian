import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table"
import axios from "axios";
import useLogin from "../hooks/useLogin";
import { Button } from "react-bootstrap";
import moment from "moment";

const Licencias = () => {
    const { auth } = useLogin()
    const [licencias, setLicencias] = useState([])
    const columns = [

      {
          name: 'Dias',
          selector: row => row.dias,
      },

  ];

    useEffect(() => {
        const obtenerLicencias = async () => {
          try {
            const response = await axios.get('http://localhost:3000/licencias', {
              headers: {
                'Authorization': `${auth.token}`
              }
            });
            setLicencias(response.data.licencias);
          } catch (error) {
            console.error(`Hubo un error al obtener los licencias: ${error}`);
          }
        };
    
        obtenerLicencias();
      }, []);
console.log(licencias)
  return (
    <PageContainer title={"Licencias"} btnAdd={'/crear-licencia'}>
        <Table columns={columns} data={licencias} placeholder={"Filtrar por nombre"}/>        
    </PageContainer>
  )
}

export default Licencias