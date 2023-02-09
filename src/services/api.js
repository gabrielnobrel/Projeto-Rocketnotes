//ser possível do back consumir requisições e se comunicar com o Frontend
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333", //o que mais se repete
});
