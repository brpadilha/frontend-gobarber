# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-23-Pagina-de-perfil

## Aula 24 - Atualizando perfil

Para que a gente possa ver que estamos colhendo as informações da página, podemos dar um consle.tron.log(data) dentro da função handleSubmit(data), mas para a gente colher, temos que ir lá na Actions de usuário e começar a criar a nossa Action para atualizar o perfil.

user/Actions.js:

```
export function updateProfileRequest(data) {
  return {
    type: '@user/UPDATE_PROFILE_REQUEST',
    payload: { data },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: '@user/UPDATE_PROFILE_SUCCESS',
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: '@user/UPDATE_PROFILE_FAILURE',
  };
}
```

user/Sagas.js:

```

import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    toast.error('Erro ao atualizar Perfil');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);

```

Ficando assim a página do perfil:

![](imgs/trees/aula-23/meuperfil.png 'Perfil')

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-23-Pagina-de-perfil
