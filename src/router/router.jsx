
import { createBrowserRouter } from 'react-router-dom';
import Novedades from '../pages/Novedades';
import Profesores from '../pages/Profesores';
import Alumnos from '../pages/Alumnos';
import Sugerencias from '../pages/Sugerencias';
import Eventos from '../pages/Eventos';
import Incidencias from '../pages/Incidencias';
import Horarios from '../pages/Horarios';
import Comedor from '../pages/Comedor';
import Licencias from '../pages/Licencias';
import CrearNovedad from '../pages/CrearNovedad';
import CrearIncidencia from '../pages/CrearIncidencia';
import CrearLicencia from '../pages/CrearLicencia';
import RegistrarSemana from '../pages/RegistrarSemana';
import Usuarios from '../pages/Usuarios';
import CrearUsuario from '../pages/CrearUsuario';
import CrearSugerencia from '../pages/CrearSugerencia';
import CrearHorario from '../pages/CrearHorario';
import Personal from '../pages/Personal';
import CrearPersonal from '../pages/CrearPersonal';
import CrearProfesor from '../pages/CrearProfesor';
import CrearAlumno from '../pages/CrearAlumno';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Novedades />,
    },
    {
      path: "/alumnos",
      element: <Alumnos />,
    },
    {
      path: "/crear-alumno",
      element: <CrearAlumno />,
    },
    {
      path: "/crear-alumno/:id",
      element: <CrearAlumno />,
    },
    {
      path: "/profesores",
      element: <Profesores />,
    },
    {
      path: "/usuarios",
      element: <Usuarios />,
    },
    {
      path: "/personal",
      element: <Personal />,
    },
    {
      path: "/crear-personal",
      element: <CrearPersonal />,
    },
    {
      path: "/crear-personal/:id",
      element: <CrearPersonal />,
    },
    {
      path: "/crear-profesor",
      element: <CrearProfesor />,
    },
    {
      path: "/crear-profesor/:id",
      element: <CrearProfesor />,
    },
    {
      path: "/crear-usuario",
      element: <CrearUsuario />,
    },
    {
      path: "/sugerencias",
      element: <Sugerencias />,
    },
    {
      path: "/crear-sugerencia",
      element: <CrearSugerencia />,
    },
    {
      path: "/eventos",
      element: <Eventos />,
    },
    {
      path: "/crear-novedad",
      element: <CrearNovedad />,
    },
    {
      path: "/editar-novedad/:id",
      element: <CrearNovedad />,
    },
    {
      path: "/incidencias",
      element: <Incidencias />,
    },
    {
      path: "/crear-incidencia",
      element: <CrearIncidencia />,
    },
    {
      path: "/horarios",
      element: <Horarios />,
    },
    {
      path: "/crear-horario",
      element: <CrearHorario />,
    },
    {
      path: "/licencias",
      element: <Licencias />,
    },
    {
      path: "/crear-licencia",
      element: <CrearLicencia />,
    },
    {
      path: "/comedor",
      element: <Comedor />,
    },
    {
      path: "/registrar-menu",
      element: <RegistrarSemana />,
    },
  ]);

export default router