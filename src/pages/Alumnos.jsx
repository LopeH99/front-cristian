import axios from "axios";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import { Button } from "react-bootstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ToastBootstrap from "../components/Toasts";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState()
  const { auth } = useLogin()
  const navigate = useNavigate()
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    title: "",
    message: "",
    color:""
  });

    const obtenerAlumnos = async () => {
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

  const eliminarUsuario = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta alumno?")) {
    try {
        const response = await axios.delete(`http://localhost:3000/usuarios/${id}`, {
            headers: {
                'Authorization': `${auth.token}`
            }
        });
        setToastMessage({
        title: "Alumnos",
        message: "Se elimino el alumno correctamente",
        color:"danger"
      })
      setShowToast(true)
      obtenerAlumnos()
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
        name: 'Fecha de egreso',
      selector: row => (moment(row.fechaNacimiento).format('DD-MM-YYYY')),
    },
      {
        name: 'Fecha de ingreso',
      selector: row => (moment(row.fechaNacimiento).format('DD-MM-YYYY')),
    },
      {
        name: 'Telefono tutor',
        selector: row => row.telefonoTutor,
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
          <Button variant="warning" onClick={() => navigate(`/crear-alumno/${row.id}`)}>E</Button>
          <Button variant="danger" className="mx-2" onClick={() => eliminarUsuario(row.id)}>X</Button>
      </>),
    }
  ];

    useEffect(() => {
        obtenerAlumnos();
      }, []);

  return (
        <PageContainer title={'Alumnos'} btnAdd={'/crear-alumno'}>
          <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
          <Table columns={columns} data={alumnos} placeholder={"Filtrar por nombre"}/>
        </PageContainer>
  )
}

export default Alumnos