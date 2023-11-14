import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import axios from "axios";
import useLogin from "../hooks/useLogin";
import { Button } from "react-bootstrap";
import moment from "moment";
import TableLicences from "../components/TableLicences";

const Licencias = () => {
  const { auth } = useLogin()
  const [licencias, setLicencias] = useState([])
    const columns = [
      {
          name: 'Nombre y apellido',
          selector: row => row.solicitante.nombre + " " + row.solicitante.apellido,
      },
      {
        name: 'DNI',
        selector: row => row.solicitante.dni,
      },
      {
          name: 'Fecha de solicitud de licencia',
          selector: row => moment(row.fechaSolicitud).format('DD-MM-YYYY'),
      },
      {
        name: 'Cantidad de dias solicitados',
      selector: row => row.dias,
    },
      {
          name: 'Expiracion licencia',
          selector: row => moment(row.fechaSolicitud).add(row.dias,'d').format('DD-MM-YYYY'),
      },
      {
          name: 'Articulo solicitado',
          minWidth: '320px',
          selector: row => row.articulo,
      }
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
        <TableLicences columns={columns} data={licencias} placeholder={"Filtrar por nombre"}/>
    </PageContainer>
  )
}

export default Licencias