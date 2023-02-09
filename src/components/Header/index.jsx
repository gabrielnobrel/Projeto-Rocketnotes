import { RiShutDownLine } from "react-icons/ri";
import { Container, Profile, Logout } from "./styles";
import { useAuth } from "../../hooks/auth";

import { api } from "../../services/api";

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"; //importando o svg

export function Header() {
  //acessando signOut do useAuth
  const { signOut, user } = useAuth();

  //Caso exista uma imagem para o avatar, senão irá passar o svg avatarPlaceholder
  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholder;

  return (
    <Container>
      <Profile to="/profile">
        <img src={avatarUrl} alt={user.name} />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={signOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
