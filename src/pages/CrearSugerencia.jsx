import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import PageContainer from '../components/PageContainer';
import useLogin from '../hooks/useLogin';

const CrearSugerencia = () => {
    const {auth} = useLogin()
    const [text, setText] = useState('');
    const [anonymous, setAnonymous] = useState(true);
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState({
      title: "",
      message: "",
      color:""
    });
  const [suggestionType, setSuggestionType] = useState(''); // Nuevo estado para el tipo de sugerencia

    const resetForm = () => {
      setText('');
      setAnonymous(true);
      setSuggestionType('');
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const suggestionData = {
      texto: text,
      anonima: anonymous,
      tipo: suggestionType,
    };

      console.log(suggestionData)
    try {
      await axios.post('http://localhost:3000/sugerencias', suggestionData, {
        headers: {
          'Authorization': `${auth.token}`
        }
      });
      setToastMessage({
        title: "Sugerencia",
        message: "Sugerencia enviada con éxito",
        color:"success"
      })
        setShowToast(true)
        resetForm();
    } catch (error) {
      setToastMessage({
        title: "Sugerencia",
        message: "No se pudo crear la sugerencia",
        color:"danger"
      })
      setShowToast(true)
    }
  };

    return (
      <PageContainer title={"Crear Sugerencia"} btnBack={'/sugerencias'}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="suggestionType" className='mt-3'>
          <Form.Label>Tipo de sugerencia</Form.Label>
          <Form.Control as="select" value={suggestionType} onChange={(e) => setSuggestionType(e.target.value)}>
            <option value="">Selecciona un tipo</option>
            <option value="REPORTAR_UN_PROBLEMA_DEL_SECTOR">Reportar un problema del sector</option>
            <option value="REPORTAR_UN_PROBLEMA_DE_LA_ESCUELA">Reportar un problema de la escuela</option>
            <option value="REPORTAR_UN_PROBLEMA_GENERAL">Reportar un problema general</option>
            <option value="REPORTAR_UN_PROBLEMA_PERSONAL">Reportar un problema personal</option>
            <option value="RECONOCIMIENTO_Y_FELICITACIONES">Reconocimiento y felicitaciones</option>
            <option value="OTRO">Otro</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="suggestionText" className='mt-3'>
            <Form.Label>Texto de la sugerencia</Form.Label>
            <Form.Control
            as="textarea"
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </Form.Group>

        <Form.Group controlId="anonymousCheckbox" className='mt-3'>
            <Form.Check
            type="checkbox"
            label="Anónimo"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            />
        </Form.Group>

        <Button variant="primary" type="submit" className='mt-3'>
            Enviar sugerencia
        </Button>
        </Form>
        </PageContainer>
  );
};

export default CrearSugerencia;