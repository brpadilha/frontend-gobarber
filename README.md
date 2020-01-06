# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 10 - Utilizando o unform

Primeiramente deve-se instalar a biblioteca unform da rocketseat:

```
yarn add unform
```

Agora nós importamos o Form e o Input em index.js do Signin e trocamos o Form e os Inputs por essas componentes que importamos:

```
import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" type="email" placeholder="Seu email" />
        <Input name="email" type="password" placeholder="Sua senha secreta" />

        <button name="password" type="submit">
          Acessar
        </button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}


```

E iremos fazer isso também no SignUp:

```
import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignUp() {
  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />

        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}


```

Podemos testar no `Reactotron` se está retornando o data que informamos nos inputs.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-10-utilizando-unform
