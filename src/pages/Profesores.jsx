import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table"
import axios from "axios";
import useLogin from "../hooks/useLogin";
import { Button } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ToastBootstrap from "../components/Toasts";

const Profesores = () => {
    const [profesores, setProfesores] = useState()
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState({
      title: "",
      message: "",
      color:""
    });
    const { auth } = useLogin()
    const navigate = useNavigate();
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios?rol=PROFESOR', {
          headers: {
            'Authorization': `${auth.token}`
          }
        });
        setProfesores(response.data.usuarios);
      } catch (error) {
        console.error(`Hubo un error al obtener los usuarios: ${error}`);
      }
    };
    const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar al profesor?")) {
      try {
          await axios.delete(`http://localhost:3000/usuarios/${id}`, {
              headers: {
                  'Authorization': `${auth.token}`
              }
          }).then((resp)=>{
            if(resp?.data?.ok){
              obtenerUsuarios()
            }
          })
          // Aquí puedes manejar la respuesta después de eliminar el usuario.
      } catch (error) {
          console.error(`Hubo un error al eliminar el usuario: ${error}`);
      }
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
          name: 'Cargo',
          selector: row => row.rol,
      },
        {
          name: 'Telefono',
          selector: row => row.telefono,
      },
        {
          name: 'Situacion de revista',
          selector: row => row.situacion,
      },
        {
          name: 'Antiguedad docente',
          selector: row => row.antiguedad_docente,
      },
        {
          name: 'Antiguedad en la institucion',
          selector: row => row.antiguedad_intitucion,
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
            <Button variant="warning" onClick={() => navigate(`/crear-profesor/${row.id}`)}>E</Button>
            <Button variant="danger" className="mx-2" onClick={() => eliminarUsuario(row.id)}>X</Button>
        </>),
      }
    ];

    useEffect(() => {
        obtenerUsuarios();
    }, []);
  return (
        <PageContainer title={"Profesores"} btnAdd={'/crear-profesor'}>
          <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
          <Table columns={columns} data={profesores} placeholder={"Filtrar por nombre"}/>
        </PageContainer>
  )
}

export default Profesores