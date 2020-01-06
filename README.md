# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 13 - Autenticação

Agora nós iremos fazer a autenticação do usuário, recebendo email e senha do Redux-Saga, ai recebemos de volta o token do usuário para autenticar ele na aplicação.

Primeiramente vamos em `actions.js` do nosso Auth:

```
export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}


export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE ',
  };
}

```

Nós devemos instalar o Axios para fazer a chamada da nossa Api:

```
yarn add axios
```

Agora vamos no nosso `sagas.js` de autenticação:

```
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess } from './actions';
import history from '~/services/history';

export function* signIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Usuário não é um prestador');
    return;
  }

  yield put(signInSuccess(token, user));

  history.push('/dashboard');
}
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

```

Entretanto ainda não vai funcionar pois a rota que criamos, é como se o usuário estivesse sempre deslogado.
Com isso vamos para o `index.js` do SignIn:
Lá iremos importar o useDispatch e fazer o uso do dispatch para receber o email e a senha no `handleSubmit`

```
import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido')
    .required('Email é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta gratuita</Link>
      </Form>
    </>
  );
}

```

Agora devemos ir no Reducer de autenticação, para fazer com que ele ouça o nosso signin, para mostrar para ele q estamos logados.

```
import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.signed = true;
      });
    default:
      return state;
  }
}
```

Agora para finalizar e fazer com que o usuário seja redirecionado para o Dashboard, vamos em `Route.js`:

Aqui nós importamos o store e no const signed, seja = store.getState().auth

```
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';
import store from '~/store';

export default function RouteWrapper({
  // eslint-disable-next-line react/prop-types
  component: Component,
  // eslint-disable-next-line react/prop-types
  isPrivate = false,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="dashboard" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTipes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
```

Agora tentamos logar novamente e deve redirecionar para o Dashboard.

Agora podemos fazer o Login com um provider e verificar o State no nosso Reactotron para ver se o mesmo está com o token e está com signed = true.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-13-Autenticacao
