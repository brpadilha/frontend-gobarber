# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 07 - Estilos globais

Cria-se a pasta `Styles` dentro de `src` para criar o `global.js`.

Iremos usar como fonte global a Roboto do google. E configuramos o estilo global:

```
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;
  }

  *:focus{
    outline:0;
  }

  html,body,#root{
    height:100%;
  }

  body{
    -webkit-font-smoothing: antialiased;
  }

  body,input,button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul{
    list-style: none;
  }

  button{
    cursor: pointer;
  }
`;
```

E logo após, nós importamos o global style em App.js.

```
import React from 'react';

import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyle />
    </Router>
  );
}

export default App;

```

Resultado final da aula 07:

Profile
![profile](Images/trees/aula-07/login.png 'Profile')

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-07-Estilos-globais
