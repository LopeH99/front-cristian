import { Col, Container, Dropdown, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import moment from "moment";
import DropdownBootstrap from "../components/DropdownBootstrap";
import { useNavigate } from "react-router-dom";
import ToastBootstrap from "../components/Toasts";

const Novedades = () => {
  const { auth } = useLogin()
  const [novedades, setNovedades] = useState([]);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    title: "Novedad",
    message: "Se elimino la novedad correctamente",
    color:"danger"
  });

  const getNovedades = async () => {
  try {
    await axios.get('http://localhost:3000/eventos?novedad=true', {
      headers: {
        'Authorization': `${auth.token}`
      }
    }).then((response)=>{
      const data = response.data.novedades || []
      data?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
      setNovedades(data);
    })
  } catch (error) {
    console.error(`Hubo un error al obtener los usuarios: ${error}`);
  }
};

  const onEdit = (id) => {
  // Navega a la página CrearEvento con el id de la novedad en la URL
  navigate(`/editar-novedad/${id}`);
};

const onDelete = async (id) => {
  // Mostrar un cuadro de diálogo de confirmación
  if (window.confirm("¿Estás seguro de que quieres eliminar esta novedad?")) {
    try {
      await axios.delete(`http://localhost:3000/eventos/${id}`, {
        headers: {
          'Authorization': `${auth.token}`
        }
      }).then(()=>{
        setToastMessage({
          title: "Novedad",
          message: "Se elimino la novedad correctamente",
          color:"danger"
        })
        setShowToast(true)
        // Actualizar la lista de novedades después de eliminar
        getNovedades();
      })
    } catch (error) {
      console.error(`Hubo un error al eliminar la novedad: ${error}`);
    }
  }
};

  useEffect(() => {
    getNovedades();
  }, []);

  return (
    <PageContainer title={"Novedades"} btn btnAdd={'/crear-novedad'}>
    <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
      <Container>
        <Row>
          <Col md={8} className="offset-lg-2">
            <Row>
              {novedades?.map(novedad => {
                let pathImg = null;
                if(novedad?.imagen){
                  const existeUploads = novedad?.imagen.includes('/uploads')
                  if(!existeUploads){
                    pathImg = `/${novedad?.imagen}`
                  }else{
                    pathImg = novedad?.imagen;
                  }
                }
                return (
                  <Col lg={12} className="shadow rounded-4 my-3 border" key={novedad.id}>
                    <Row className="px-2 py-3">
                      <Col md={8}><h4 style={{textDecoration: 'underline'}}>{novedad?.titulo}</h4></Col>
                      <Col md={3}><h5>{moment(novedad?.fecha).format('DD-MM-YYYY')}</h5></Col>
                      <Col md={1}>
                        <DropdownBootstrap id={novedad.id} onEdit={onEdit} onDelete={onDelete}/>
                      </Col>
                      {novedad?.imagen && (
                        <Col
                          lg={12}
                          className="w-100 h-100 text-center my-3"
                        >
                          <img
                            src={`http://localhost:3000${pathImg}`}
                            width={"100%"}
                            height={350}
                            alt={novedad?.titulo}
                          />
                        </Col>
                      )}
                      <Col lg={12}>
                        <h6>{novedad?.descripcion}</h6>
                      </Col>
                    </Row>
                  </Col>
                )
              })}
            </Row>
          </Col>
        </Row>
      </Container>
      </PageContainer>
  )
}

export default Novedades
