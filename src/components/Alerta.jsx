import { Alert } from 'react-bootstrap'

const Alerta = ({alerta}) => {
  return (
    <Alert variant={alerta.variant}>
        {alerta.message}
    </Alert>
  )
}

export default Alerta