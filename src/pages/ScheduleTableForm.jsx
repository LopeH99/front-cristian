import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import useLogin from '../hooks/useLogin';

const ScheduleTableForm = () => {
    const { auth } = useLogin()
  const modules = [
    'Modulo 1: 8:00hs a 8:40hs',
    'Modulo 2: 8:40hs a 9:20hs',
    'Modulo 3: 9:30hs a 10:10hs',
    'Modulo 4: 10:10hs a 10:50hs',
    'Modulo 5: 11:00hs a 11:40hs',
    'Modulo 6: 11:40hs a 12:15hs',
    'Jornada simple extendida: 12:20hs a 13:00hs'
  ];

  const [schedule, setSchedule] = useState(
    modules.map(module => ({
      seccion: 'SECCION_A',
      gradoEscolar: '',
      modulo: module,
      rangoHorario: '',
      lunes: '',
      martes: '',
      miercoles: '',
      jueves: '',
      viernes: ''
    }))
  );

  const handleChange = (index, field) => event => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = event.target.value;
    setSchedule(newSchedule);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:3000/horarios', schedule, {
        headers: {
          'Authorization': `${auth.token}`
        }
      });
      alert('Horario enviado con éxito');
    } catch (error) {
      console.error(`Hubo un error al enviar el horario: ${error}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='mt-4'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sección</th>
            <th>Módulos</th>
            <th>Lunes</th>
            <th>Martes</th>
            <th>Miércoles</th>
            <th>Jueves</th>
            <th>Viernes</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, index) => (
            <tr key={index}>
              {index === 0 && (
                <td rowSpan={modules.length}>Sección A</td>
              )}
              <td>{row.modulo}</td>
              {['lunes', 'martes', 'miercoles', 'jueves', 'viernes'].map(day => (
                <td key={day}>
                  <Form.Control
                    value={row[day]}
                    onChange={handleChange(index, day)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="primary" type="submit" className='mt-3'>
        Enviar horario
      </Button>
    </Form>
  );
};

export default ScheduleTableForm;
