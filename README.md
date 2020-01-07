# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 19 - Requisições autenticadas

Temos que fazer com que o Token seja carregado em todas as requisições feitas pelo usuário na aplicação:
Para isso vamos no `auth/sagas.js` e iremos dentro do nosso signIn e consultar os headers da nossa api pelo Authorizations.

```
    api.defaults.headers.Authorization = `Bearer ${token}`;

```

Agora vamos no `Dashboard`:

```
import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function Dashboard() {
  api.get('appointments');
  return <h1>Dashboard</h1>;
}

```

Podemos notar pelo Network no navegador, que estamos conseguindo passar o Token, entretanto não esta sendo mantido se apertarmos F5.
Para isso vamos sagas e ouvir a action Rehydrate:

```
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não é um prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}
export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
```

Agora nós conseguimos fazer o cadastro do usuário.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-19-Requisicoes-autenticadas
