import clienteAxios from "../config/clienteAxios"

export const getUsuarios = async () => {
    try {
      const {data} = await clienteAxios(`/usuarios`)
      return data
    } catch (error) {
      console.log(error)
    }
}
