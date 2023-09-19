import { Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import axios from "axios";
import { useEffect, useState } from "react";
import useLogin from "../hooks/useLogin";
import moment from "moment/moment";

const Novedades = () => {
  const { auth } = useLogin();
  const [novedades, setNovedades] = useState()

  useEffect(() => {
    const obtenerNovedades = async () => {
      try {
        const response = await axios.get('http://localhost:3000/eventos', {
          headers: {
            'Authorization': `${auth.token}`
          }
        });
        setNovedades(response.data.eventos);
      } catch (error) {
        console.error(`Hubo un error al obtener los usuarios: ${error}`);
      }
    };
    obtenerNovedades();
  }, []);

  console.log(novedades)
  return (
    <PageContainer title={"Novedades"}>
      <Container>
        <Row>
          <Col md={8} className="offset-lg-2">
            <Row>
              {novedades?.map(novedad => (
              <Col lg={12} className="shadow rounded-4 my-3 border" key={novedad.id}>
                <Row className="p-2">
                    <Col lg={5}><h3>{novedad.titulo}</h3></Col>
                    <Col lg={5} className="offset-lg-2 text-lg-end"><h3>{moment(novedad.created_at).format('DD-MM-YYYY')}</h3></Col>
                    <Col lg={12} className="w-100 h-100 bg-primary"><img src={novedad.img} /></Col>
                    <Col lg={12}><h4>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</h4></Col>
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