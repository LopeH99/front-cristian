import { Dropdown } from "react-bootstrap"
import { FaEllipsisVertical } from "react-icons/fa6";

const DropdownBootstrap = ({id, onEdit, onDelete}) => {
  return (
    <Dropdown className="d-inline">
        <Dropdown.Toggle id="dropdown-autoclose-true" variant="" className="bg-transparent text-secondary border-0">
          <FaEllipsisVertical />
        </Dropdown.Toggle>

        <Dropdown.Menu>
        {/* <Dropdown.Item href="#" onClick={()=>onEdit(id)}>Editar</Dropdown.Item> */}
        <Dropdown.Item href="#" onClick={()=>onDelete(id)}>Eliminar</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  )
}

export default DropdownBootstrap
