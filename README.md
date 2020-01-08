# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-28-Estilizacao-da-Dashboard

## Aula 28 - Estilizaçao da dashboard

Agora para estilizarmos a Dashboard devemos criar um styles.js dentro da pasta Dashboard.

Criamos um Header para ter acessos aos botões de passar e voltar os dias da agenda.

`Dashboard/index.js`:

```
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
// import api from '~/services/api';

import { Container } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <header>
        <button type="button">
          <MdChevronLeft size={36} color="#FFF" />
        </button>
        <strong>31 de Maio</strong>
        <button type="button">
          <MdChevronRight size={36} color="#FFF" />
        </button>
      </header>
    </Container>
  );
}
``
```

Com isso vamos começar estilizando o Header.

```
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }
`;
```

Agora vamos fazer uma lista no index (ul) para que mostre os agendamentos, vamos mostrar os horários que estão agendados e os que estão em aberto, para isso nos de aberto, vamos criar uma tag de `available`, para que a gente estilize ele de forma diferente.

E também vamos colocar uma tag `past` nos que ja passaram, para a gente diminuir a opacidade dele.`

```
 <ul>
        <Time past>
          <strong>08:00</strong>
          <span>Diego Fernandes</span>
        </Time>
        <Time available>
          <strong>09:00</strong>
          <span>Em aberto</span>
        </Time>
        <Time>
          <strong>10:00</strong>
          <span>Diego Fernandes</span>
        </Time>
        <Time>
          <strong>11:00</strong>
          <span>Diego Fernandes</span>
        </Time>
      </ul>
```

Agora estilizando o Time, ficará assim o styles.js:

```
import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    button {
      border: 0;
      background: none;
    }

    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Time = styled.li`
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  opacity: ${props => (props.past ? 0.6 : 1)};

  strong {
    display: block;
    color: ${props => (props.available ? '#999' : '#7159c1')};
    font-size: 20px;
    font-weight: normal;
  }

  span {
    display: block;
    margin-top: 3px;
    color: ${props => (props.available ? '#999' : '#7159c1')};
  }
`;
```

Com isso nossa página de agendamento ficou dessa forma:

![](imgs/trees/aula-28/agenda.png 'Dashboard')
