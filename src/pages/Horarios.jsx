import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import ScheduleTable from "../components/ScheduleTable"
import useLogin from "../hooks/useLogin";
import axios from "axios";

const Horarios = () => {
  const [sugerencias, setSugerencias] = useState()
  const { auth } = useLogin()

  useEffect(() => {
    const obtenerSugerencias = async () => {
      try {
        await axios.get('http://localhost:3000/horarios', {
          headers: {
            'Authorization': `${auth.token}`
          }
        }).then((response)=>{
          const data = response.data.horarios;
          data?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          setSugerencias(response.data.horarios);
        })
      } catch (error) {
        console.error(`Hubo un error al obtener los usuarios: ${error}`);
      }
    };

    obtenerSugerencias();
  }, []);
  return (
    <PageContainer title={"Horarios"} btnAdd={'/crear-horario'}>
      <ScheduleTable />
    </PageContainer>
  )
}

export default Horarios