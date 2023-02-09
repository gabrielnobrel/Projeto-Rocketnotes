import { useState } from "react"; //para pegar informações de login do usuário
import { FiLogIn, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; //Biblioteca para servir de comunicação entre as páginas

import { api } from "../../services/api";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Background } from "./styles";

export function SingUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    //Verificar se os campos foram preenchido
    if (!name || !email || !password) {
      return alert("Preencha com todos os campos");
    }

    api
      .post("/users", { name, email, password })
      //Caso dê certo
      .then(() => {
        alert("Usuário cadastrado com sucesso");
        navigate("/"); //tela inicial de login
      })
      //caso dê errado
      .catch((error) => {
        if (error.reponse) {
          //mensagem de erro já existente no backend
          alert(error.response.data.message);
        } else {
          //caso não exista a mensagem...
          alert("Não foi possível cadastrar");
        }
      });
  }

  return (
    <Container>
      <Background />

      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">Voltar para o login</Link>
      </Form>
    </Container>
  );
}
