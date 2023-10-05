import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import TableFood from "../components/TableFood"
import axios from "axios";
import useLogin from "../hooks/useLogin";

const Comedor = () => {
  const {auth} = useLogin()
  const [menus, setMenus] = useState()
  
  const obtenerMenus = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios?rol=ALUMNO', {
        headers: {
          'Authorization': `${auth.token}`
        }
      });
      setMenus(response.data);
      console.log(response)
    } catch (error) {
      console.error(`Hubo un error al obtener los usuarios: ${error}`);
    }
  };
  
  useEffect(() => {
    obtenerMenus();
  }, []);
  return (
    <PageContainer title={'Comedor'}>
      <TableFood />
    </PageContainer>
  )
}

export default Comedor