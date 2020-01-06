# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 14 - Armazenando perfil

Agora iremos criar um module para o User, assim como o auth.

Primeiro em `sagas.js`:

```
import { all } from 'redux-saga/effects';

export default all([]);
```

Agora em `reducer.js`:

Aqui nós queremos receber os dados do usuário que estamos enviando.

```
import produce from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.profile = action.payload.user;
      });
    default:
      return state;
  }
}

```

Cadastramos o reducer e o saga no rootSaga e no rootReducer. Devemos agora criar um State para User e fazemos o login e vemos se está la os dados que inserimos.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-13-Autenticacao
