import { useContext } from "react"
import loginContext from "../context/loginContext"

const useLogin = () => {
  return useContext(loginContext)
}

export default useLogin