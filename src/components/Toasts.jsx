import { Toast, ToastContainer } from 'react-bootstrap'

const ToastBootstrap = ({show, toggleShow, toastMessage}) => {
  return (
    <ToastContainer position='top-end'>
      <Toast show={show} onClose={() => toggleShow(false)} bg={toastMessage.color} className='m-5' delay={3000} autohide>
      <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
          <strong className="me-auto">{toastMessage.title}</strong>
            <small>11 mins ago</small>
          </Toast.Header>
      <Toast.Body>{toastMessage.message}</Toast.Body>
      </Toast>
      </ToastContainer>
  )
}

export default ToastBootstrap