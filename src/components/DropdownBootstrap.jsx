import { Dropdown } from "react-bootstrap"

const DropdownBootstrap = ({id, onEdit, onDelete}) => {
  return (
    <Dropdown className="d-inline">
        <Dropdown.Toggle id="dropdown-autoclose-true">
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={()=>onEdit(id)}>Editar</Dropdown.Item>
        <Dropdown.Item href="#" onClick={()=>onDelete(id)}>Eliminar</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownBootstrap