import { Table } from 'react-bootstrap';

const ScheduleTable = () => {
  const modules = [
    'Modulo 1: 8:00hs a 8:40hs',
    'Modulo 2: 8:40hs a 9:20hs',
    'Modulo 3: 9:30hs a 10:10hs',
    'Modulo 4: 10:10hs a 10:50hs',
    'Modulo 5: 11:00hs a 11:40hs',
    'Modulo 6: 11:40hs a 12:15hs',
    'Jornada simple extendida: 12:20hs a 13:00hs'
  ];

  const subjects = [
    'Matemáticas',
    'Ciencias',
    'Historia',
    'Arte',
    'Educación física',
    'Inglés',
    'Música'
  ];

  return (
    <Table striped bordered hover className='mt-5'>
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
        {modules.map((module, index) => (
          <tr key={index}>
            {index === 0 && (
              <td rowSpan={modules.length}>Sección A</td>
            )}
            <td>{module}</td>
            <td>{subjects[index % subjects.length]}</td>
            <td>{subjects[(index + 1) % subjects.length]}</td>
            <td>{subjects[(index + 2) % subjects.length]}</td>
            <td>{subjects[(index + 3) % subjects.length]}</td>
            <td>{subjects[(index + 4) % subjects.length]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScheduleTable;
