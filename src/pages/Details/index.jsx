import { useEffect, useState } from "react";
import { Container, Links, Content } from "./styles";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Section } from "../../components/Section";
import { Tags } from "../../components/Tags";
import { ButtonText } from "../../components/ButtonText";

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  async function handleRemove() {
    //Window é uma funcionalidade do próprio navegador
    const confirm = window.confirm("Deseja realmente remover a nota?");

    if (confirm) {
      //captura o id através do params, pegando diretamente da rota
      await api.delete(`/notes/${params.id}`);
      navigate("/");
    }
  }

  //cria um effect sem dependências, pois será carregado somente uma única vez
  useEffect(() => {
    async function fetchNote() {
      //requisição a API
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }

    fetchNote();
  }, []);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Excluir a nota" onClick={handleRemove} />

            <h1>{data.title}</h1>

            <p>{data.description}</p>

            {/* caso exista link, ele renderizará toda essa seção */}
            {data.links && (
              <Section title="Links úteis">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {/* caso exista link, ele renderizará toda essa seção */}
            {data.tags && (
              <Section title="Marcadores">
                {data.tags.map((tag) => (
                  <Tags key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}

            <Button title="Voltar" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  );
}
