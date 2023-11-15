import { Button, Card, Col, Container, Row } from "react-bootstrap"
import PageContainer from "../components/PageContainer"
import { useEffect, useState } from "react";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import moment from "moment";
import ToastBootstrap from "../components/Toasts";

const Eventos = () => {
  const { auth, baseUrl } = useLogin()
  const [eventos, setEventos] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({
    title: "",
    message: "",
    color:""
  });
  const obtenerEventos = async () => {
    try {
      await axios.get('http://localhost:3000/eventos', {
        headers: {
          'Authorization': `${auth.token}`
        }
      }).then((response)=>{
        const data = response.data.eventos || []
        data?.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
        setEventos(data);
      })
    } catch (error) {
      console.error(`Hubo un error al obtener los usuarios: ${error}`);
    }
  };
  useEffect(() => {
    obtenerEventos();
  }, []);
  const eliminarEvento = async(id) => {
    if (window.confirm("¿Está seguro de que quiere eliminar el evento?")) {
      try {
          await axios.delete(`http://localhost:3000/eventos/${id}`, {
              headers: {
                  'Authorization': `${auth.token}`
              }
          }).then((resp)=>{
            if(resp?.data?.ok){
              setToastMessage({
                title: "Evento",
                message: "Se elimino el evento correctamente.",
                color:"danger"
              })
              setShowToast(true)
              obtenerEventos()
            }
          })
          // Aquí puedes manejar la respuesta después de eliminar el usuario.
      } catch (error) {
        console.error(`Hubo un error al eliminar el usuario: ${error}`);
      }
    }
  }
  return (
    <PageContainer title={"Historial de eventos"} >
      <ToastBootstrap show={showToast} toggleShow={setShowToast} toastMessage={toastMessage} />
      <Container className="mt-4">
        <Row>
          {eventos.map((event, index) => {
            let pathImg = null;
            if(event?.imagen){
              const existeUploads = event?.imagen.includes('/uploads')
              if(!existeUploads){
                pathImg = `/${event?.imagen}`
              }else{
                pathImg = event?.imagen;
              }
            }
            return (
              <Col md={10} className="offset-1 my-2" key={index}>
                <Card>
                  <Card.Body>
                    <Row>
                      <Col md={9}>
                        <h3>{event.titulo}</h3>
                      </Col>
                      <Col md={2}>
                        <h5
                          style={{
                            textAlign: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          {moment(event.createdAt).format('DD-MM-YYYY')}
                        </h5>
                      </Col>
                      <Col md={1}>
                        <Button
                          variant="danger"
                          className="mx-2"
                          onClick={() => eliminarEvento(event?.id)}
                        >
                          X
                        </Button>
                      </Col>
                      <Col md={12}>
                        <p>{`${event.tipo || ''} - ${event.novedad ? 'Novedad' : 'Incidencia'}`}</p>
                      </Col>
                      {pathImg && (
                        <Col md={12}>
                          <img
                            src={`${baseUrl}/image/..${pathImg}`}
                            width={"100%"}
                            height={350}
                            alt={event?.titulo}
                          />
                        </Col>
                      )}
                      <Col md={12}>
                        <p>{`${event.descripcion || ''}`}</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </PageContainer>
  )
}

export default Eventos
