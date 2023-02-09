import { useState } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"; //importando o svg

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { Container, Form, Avatar } from "./styles";

export function Profile() {
  //para acessar o usuário e o updateProfile
  const { user, updateProfile } = useAuth();

  //Informações do perfil
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  //Caso exista uma imagem para o avatar, senão irá passar o svg avatarPlaceholder
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;
  //Apresentação do Avatar
  const [avatar, setAvatar] = useState(avatarUrl);
  //carregar o arquivo de foto
  const [avatarFile, setAvatarFile] = useState(null);

  async function handleUpdate() {
    //informações que serão coletadas
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld,
    };

    const userUpdated = Object.assign(user, updated);

    await updateProfile({ user: userUpdated, avatarFile });
  }

  //alteração do avatar
  function handleChangeAvatar(event) {
    //pegando a primeira posição do arquivo, no caso somente um
    const file = event.target.files[0];
    //colocar o arquivo que o usuário acabou de selecionar
    setAvatarFile(file);

    //gerar url da imagem do avatar
    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <FiArrowLeft />
        </Link>
      </header>

      <Form>
        <Avatar>
          <img src={avatar} alt="Foto do usuário" />

          <label htmlFor="avatar">
            <FiCamera />

            <input id="avatar" type="file" onChange={handleChangeAvatar} />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="Password"
          icon={FiLock}
          onChange={(e) => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova senha"
          type="Password"
          icon={FiLock}
          onChange={(e) => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate}></Button>
      </Form>
    </Container>
  );
}
