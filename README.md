# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 11 - Validações

Para validarmos o que o usuário escreve nos forms, devemos utilizar a biblioteca Yup como no backend:

```
yarn add Yup
```

Primeiro em SignIn, importamos \* as Yup e criamos o `schema` de validação:

```
import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignIn() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um email válido')
      .required('Email é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
  });

  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
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

SignUp:

```
 import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

// import { Container } from './styles';

export default function SignUp() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('Email é obrigatório'),
    password: Yup.string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  function handleSubmit(data) {
    console.tron.log(data);
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
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

Ficará assim a nossa página:

- Error SignIn:
  ![](imgs/trees/aula-11/validation.png 'Validação')

- Error SignUp
  ![](imgs/trees/aula-11/error2.png 'Validação')

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-11-Validacoes
