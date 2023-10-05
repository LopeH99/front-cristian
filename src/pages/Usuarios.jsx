import { useEffect, useState } from "react";
import PageContainer from "../components/PageContainer"
import Table from "../components/Table"
import axios from "axios";
import useLogin from "../hooks/useLogin";
import { Button } from "react-bootstrap";
import moment from "moment";
import ToastBootstrap from "../components/Toasts";

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState()
    const { auth } = useLogin()
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState({});
    
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
    
    const eliminarUsuario = async (id) => {
      if (window.confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
          await axios.delete(`http://localhost:3000/usuarios/${id}`, {
              headers: {
                  'Authorization': `${auth.token}`
              }
          });
          setToastMessage({
          title: "Usuarios",
          message: "Se elimino el usuario correctamente",
          color:"danger"
        })
        setShowToast(true)
        obtenerUsuarios()
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
        name: 'DNI',
        selector: row => row.dni,
      },
      {
          name: 'Sexo',
          selector: row => row.sexo,
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
        selector: row => (<>
          <Button variant="warning" onClick={() => navigate(`/crear-usuario/${row.id}`)}>E</Button>
          <Button variant="danger" className="mx-2" onClick={() => eliminarUsuario(row.id)}>X</Button>
      </>),
    }
  ];

    useEffect(() => {
        obtenerUsuarios();
      }, []);

  return (
    <PageContainer title={"Usuarios"} btnAdd={'/crear-usuario'}>
          <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
          <Table columns={columns} data={usuarios} placeholder={"Filtrar por nombre"}/>          
    </PageContainer>
  )
}

export default Usuarios