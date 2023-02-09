import { createContext, useContext, useEffect, useState } from "react"; //para criação de contexto

import { api } from "../services/api"; //chamando a API

export const AuthContext = createContext({});

//função que receberá o parâmetro email e password
function AuthProvider({ children }) {
  //armazenar informações, passando um objeto vazio
  const [data, setData] = useState({});
  async function signIn({ email, password }) {
    try {
      //chamando a api e repassando valores
      const response = await api.post("/sessions", {
        email,
        password,
      });
      //filtrando os dados do usuário, repassados pelo response
      const { user, token } = response.data;

      //aplicação do local storage / transformando o usário em um texto
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));
      localStorage.setItem("@rocketnotes:token", token);

      //enviando um token do tipo bearer para o cabeçalho de autorização de toda a minha API, em todas as requisições
      // api.defaults.headers.authorization = `Bearer ${token} `;
      //O método foi atualizado
      api.defaults.headers.common["Authorization"] = `Bearer ${token} `;

      //guardar as informações de user e token
      setData({
        user,
        token,
      });

      //caso dê errado na aplicação
    } catch (error) {
      //chamando a mensagem de error do backend
      if (error.response) {
        alert(error.response.data.message);

        //caso não exista a mensagem
      } else {
        alert("Não foi possível realizar o login.");
      }
    }
  }

  //função de logout
  function signOut() {
    //para remover as informações do local storage
    const token = localStorage.removeItem("@rocketnotes:token");
    const user = localStorage.removeItem("@rocketnotes:user");

    //voltando o satData para objeto vazio e automaticamente realizando a verificação no main.jsx
    setData({});
  }

  //Função de atualizar as informações de usuário
  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData();
        //adicionar no formulário o campo chamado de "avatar", passando o avatarFile para ele
        fileUploadForm.append("avatar", avatarFile);

        //enviando o avatar para o caminho criado
        const response = await api.patch("/users/avatar", fileUploadForm);
        //retornando o avatar
        user.avatar = response.data.avatar;
      }

      //se conectar com a api, repassando as informações do usuário
      await api.put("/users", user);
      //substituir as informações para o local storage / atualizar o local storage
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user));

      //repassar as informações para o data, atualizar as informações
      setData({
        user,
        token: data.token,
      });

      alert("Perfil atualizado!");
    } catch (error) {
      //chamando a mensagem de error do backend
      if (error.response) {
        alert(error.response.data.message);

        //caso não exista a mensagem
      } else {
        alert("Não foi possível atualizar o perfil.");
      }
    }
  }

  //guardar as informações do user e token no state
  useEffect(() => {
    //para obter as informações
    const token = localStorage.getItem("@rocketnotes:token");
    const user = localStorage.getItem("@rocketnotes:user");

    //se o token e o usuário forem informados
    if (token && user) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setData({
        token,
        //transformando novamente os dados do usuário
        user: JSON.parse(user),
      });
    }
  }, []);

  //o children será as rotas da aplicação repassadas no main.js
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        updateProfile,
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

//função que receberá o contexto criado acima
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
