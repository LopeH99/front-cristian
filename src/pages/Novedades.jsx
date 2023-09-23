import { Col, Container, Dropdown, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import moment from "moment";
import DropdownBootstrap from "../components/DropdownBootstrap";
import { useNavigate } from "react-router-dom";

const Novedades = () => {
  const { auth } = useLogin()
  const [novedades, setNovedades] = useState([]);
  const navigate = useNavigate();

  const getNovedades = async () => {
  try {
    const response = await axios.get('http://localhost:3000/eventos?novedad=true', {
      headers: {
        'Authorization': `${auth.token}`
      }
    });
    console.log(response)
    setNovedades(response.data.novedades);
  } catch (error) {
    console.error(`Hubo un error al obtener los usuarios: ${error}`);
  }
};

  const onEdit = (id) => {
  // Navega a la página CrearEvento con el id de la novedad en la URL
  navigate(`/crear-evento/${id}`);
};

const onDelete = async (id) => {
  try {
    const response = await axios.delete(`http://localhost:3000/eventos/${id}`, {
      headers: {
        'Authorization': `${auth.token}`
      }
    });
    console.log(response);
    // Actualizar la lista de novedades después de eliminar
    getNovedades();
  } catch (error) {
    console.error(`Hubo un error al eliminar la novedad: ${error}`);
  }
  };

  useEffect(() => {
    getNovedades();
  }, []);

  return (
    <PageContainer title={"Novedades"}>
      <Container>
        <Row>
          <Col md={8} className="offset-lg-2">
            <Row>
              {novedades?.map(novedad => (
                <Col lg={12} className="shadow rounded-4 my-3 border" key={novedad.id}>
                  <Row className="px-2 py-3">
                    <Col md={8}><h3>{novedad?.titulo}</h3></Col>
                    <Col md={3}><h4>{moment(novedad?.fecha).format('DD-MM-YYYY')}</h4></Col>
                    <Col md={1}>
                      <DropdownBootstrap id={novedad.id} onEdit={onEdit} onDelete={onDelete}/>
                    </Col>
                    <Col lg={12} className="w-100 h-100 text-center my-3"><img src={novedad?.imagen} width={"100%"} height={480} alt={novedad?.titulo} /></Col>
                    <Col lg={12}><h4>{novedad?.descripcion}</h4></Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Novedades
