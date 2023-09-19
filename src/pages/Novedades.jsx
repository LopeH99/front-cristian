import { Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";

const Novedades = () => {
  const [novedades, setNovedades] = useState([
    {
      id: 1,
      titulo: 'Novedad 1',
      created_at: new Date(),
      img: 'https://media.istockphoto.com/id/1301605613/es/foto/diversos-escolares-peque%C3%B1os-que-usan-el-tel%C3%A9fono-m%C3%B3vil-en-el-aula.jpg?s=612x612&w=0&k=20&c=hb_xRtF_nMFeq5QWR5S6-aeDNaZTrXrWepGbjLheTZg=',
    },
    {
      id: 2,
      titulo: 'Novedad 2',
      created_at: new Date(),
      img: 'https://w7.pngwing.com/pngs/965/636/png-transparent-national-primary-school-student-primary-education-school-child-dijak-area.png',
    },
    {
      id: 3,
      titulo: 'Novedad 3',
      created_at: new Date(),
      img: 'https://static.vecteezy.com/system/resources/previews/002/126/176/non_2x/elementary-school-student-education-concept-doodle-background-school-supplies-with-cute-student-characters-vector.jpg',
    },
    {
      id: 4,
      titulo: 'Novedad 4',
      created_at: new Date(),
      img: 'https://la-lista.com/wp-content/uploads/2023/08/lista-de-utiles-escolares-sep-para-primaria-2023-2024-por-grado.jpg',
    },
    // Agrega más novedades aquí
  ]);

  return (
    <PageContainer title={"Novedades"}>
      <Container>
        <Row>
          <Col md={8} className="offset-lg-2">
            <Row>
              {novedades.map(novedad => (
                <Col lg={12} className="shadow rounded-4 my-3 border" key={novedad.id}>
                  <Row className="p-2">
                    <Col lg={5}><h3>{novedad.titulo}</h3></Col>
                    <Col lg={5} className="offset-lg-2 text-lg-end"><h3>{novedad.created_at.toLocaleDateString()}</h3></Col>
                    <Col lg={12} className="w-100 h-100 text-center my-3"><img src={novedad.img} width={"100%"} height={480} alt={novedad.titulo} /></Col>
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
