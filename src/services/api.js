//ser possível do back consumir requisições e se comunicar com o Frontend
import axios from "axios";

export const api = axios.create({
  // baseURL: "https://rocketnotes-api-cadastro.herokuapp.com",
  baseURL: "https://api-cadastro-five.vercel.app",
  baseURL: "https://api-cadastro-6rrh.onrender.com",

});
