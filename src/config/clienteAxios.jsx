import axios from "axios";

const clienteAxios = axios.create({
    baseURL: `http://localhost:3000`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_DEV}`,
      }
})

export default clienteAxios;