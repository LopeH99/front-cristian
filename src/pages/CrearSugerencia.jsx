import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import PageContainer from '../components/PageContainer';
import useLogin from '../hooks/useLogin';

const CrearSugerencia = () => {
    const {auth} = useLogin()
    const [text, setText] = useState('');
    const [anonymous, setAnonymous] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const suggestionData = {
      texto: text,
      anonima: anonymous,
    };

      console.log(suggestionData)
    try {
      await axios.post('http://localhost:3000/sugerencias', suggestionData, {
        headers: {
          'Authorization': `${auth.token}`
        }
      });
      alert('Sugerencia enviada con éxito');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al enviar la sugerencia');
    }
  };

    return (
      <PageContainer title={"Crear Sugerencia"}>
        <Form onSubmit={handleSubmit}>
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