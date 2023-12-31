
import { createContext, useEffect, useState } from "react"

const loginContext = createContext()

const LoginProvider = ({ children }) => {
    const [auth, setAuth] = useState()
    const baseUrl = "http://localhost:3000";

    // Guarda la información del login en el localStorage
const inicioSesion = (data) => {
    // Convierte el objeto a una cadena JSON
    const dataJSON = JSON.stringify(data)
    // Guarda la cadena JSON en el localStorage con la clave "login"
    localStorage.setItem("login", dataJSON)
    setAuth(data)
}

    // Obtiene la información del login del localStorage
const obtenerLogin = () => {
    // Obtiene la cadena JSON del localStorage con la clave "login"
    const dataJSON = localStorage.getItem("login")
    // Convierte la cadena JSON a un objeto
    const data = JSON.parse(dataJSON)
    // Devuelve el objeto
    setAuth(data)
}

const cerrarSesion = () => {
    // Borra la clave "login" del localStorage
    setAuth()
    localStorage.removeItem("login")
    // navigate('/')
}

    useEffect(() => {
      obtenerLogin()
    }, [])

    return (
        <loginContext.Provider
            value={{
                auth,
                baseUrl,
                setAuth,
                inicioSesion,
                cerrarSesion,
            }}
        >
            {children}
        </loginContext.Provider>
    )
}

export {
    LoginProvider
}

export default loginContext