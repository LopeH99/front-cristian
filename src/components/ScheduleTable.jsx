import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import * as XLSX from 'xlsx';

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

  const subjectsB = [
    'Ciencias',
    'Matemáticas',
    'Arte',
    'Inglés',
    'Historia',
    'Música',
    'Educación física',
  ];
  const crearExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([
      ['Sección', 'Módulos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      ...modules.map((module, index) => {
        const rowData = [
          { v: index === 0 ? 'Sección A' : '', rowspan: modules.length },
          { v: module },
          { v: subjects[index % subjects.length] },
          { v: subjects[(index + 1) % subjects.length] },
          { v: subjects[(index + 2) % subjects.length] },
          { v: subjects[(index + 3) % subjects.length] },
          { v: subjects[(index + 4) % subjects.length] }
        ];
        // Filtrar elementos indefinidos para obtener un array limpio
        return rowData.filter(Boolean);
      })
    ]);
    const wsB = XLSX.utils.aoa_to_sheet([
      ['Sección', 'Módulos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
      ...modules.map((module, index) => {
        const rowData = [
          { v: index === 0 ? 'Sección B' : '', rowspan: modules.length },
          { v: module },
          { v: subjectsB[index % subjectsB.length] },
          { v: subjectsB[(index + 1) % subjectsB.length] },
          { v: subjectsB[(index + 2) % subjectsB.length] },
          { v: subjectsB[(index + 3) % subjectsB.length] },
          { v: subjectsB[(index + 4) % subjectsB.length] }
        ];
        // Filtrar elementos indefinidos para obtener un array limpio
        return rowData.filter(Boolean);
      })
    ]);
    // Aplicar estilos si es necesario
    ws['!cols'] = [{ wch: 15 }, { wch: 37 }, ...Array(subjects.length).fill({ wch: 20 })];
    wsB['!cols'] = [{ wch: 15 }, { wch: 37 }, ...Array(subjectsB.length).fill({ wch: 20 })];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sección A');
    XLSX.utils.book_append_sheet(wb, wsB, 'Sección B');
    XLSX.writeFile(wb, 'horario.xlsx');
  }

  return (
    <>
      <Button className="float-end px-5 mx-2" onClick={()=>crearExcel()}>
        Descargar horario
      </Button>
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
                <td rowSpan={modules.length}>Sección B</td>
              )}
              <td>{module}</td>
              <td>{subjectsB[index % subjectsB.length]}</td>
              <td>{subjectsB[(index + 1) % subjectsB.length]}</td>
              <td>{subjectsB[(index + 2) % subjectsB.length]}</td>
              <td>{subjectsB[(index + 3) % subjectsB.length]}</td>
              <td>{subjectsB[(index + 4) % subjectsB.length]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ScheduleTable;
