import axios from "axios";

export const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        // Correo electrónico o contraseña incorrectos
        throw new Error("Correo electrónico o contraseña incorrectos");
      } else {
        throw error;
      }
    }
  };