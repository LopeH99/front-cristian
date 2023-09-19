
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
import CrearEvento from '../pages/CrearEvento';
import CrearIncidencia from '../pages/CrearIncidencia';
import CrearLicencia from '../pages/CrearLicencia';
import RegistrarSemana from '../pages/RegistrarSemana';
import Usuarios from '../pages/Usuarios';
import CrearUsuario from '../pages/CrearUsuario';
import CrearSugerencia from '../pages/CrearSugerencia';
import CrearHorario from '../pages/CrearHorario';

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
      path: "/profesores",
      element: <Profesores />,
    },
    {
      path: "/usuarios",
      element: <Usuarios />,
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
      path: "/crear-evento",
      element: <CrearEvento />,
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
      path: "/registrar-semana",
      element: <RegistrarSemana />,
    },
  ]);

export default router