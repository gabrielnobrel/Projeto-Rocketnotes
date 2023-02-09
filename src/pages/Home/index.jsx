import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { Container, Brand, Menu, Search, Content, NewNote } from "./styles";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Note } from "../../components/Note";
import { Section } from "../../components/Section";
import { ButtonText } from "../../components/ButtonText";
import { api } from "../../services/api";

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  function handleSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([]);
    }

    //verificar se a tagName está inclusa na tagsSelected
    const alreadySelected = tagsSelected.includes(tagName);

    // Se caso houver tag selecionada, ele poderá desmarcá-la
    if (alreadySelected) {
      const filteredTags = tagsSelected.filter((tag) => tag !== tagName);
      setTagsSelected(filteredTags);
    } else {
      setTagsSelected((prevState) => [...prevState, tagName]);
    }
  }

  function handleDetails(id) {
    //levando o usuário para a rota /details
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags");
      setTags(response.data);
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );
      setNotes(response.data);
    }

    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>RocketNotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            onClick={() => handleSelected("all")}
            isActive={tagsSelected.length === 0}
          />
        </li>
        {
          //se existe tags, ele irá percorrer com o map
          tags &&
            tags.map((tag) => (
              <li key={String(tag.id)}>
                <ButtonText
                  title={tag.name}
                  onClick={() => handleSelected(tag.name)}
                  isActive={tagsSelected.includes(tag.name)} //Saber se a tag selecionada existe dentro do array
                />
              </li>
            ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo título"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas Notas">
          {notes.map((note) => (
            <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
            />
          ))}
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar Nota
      </NewNote>
    </Container>
  );
}
