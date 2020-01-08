# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-27-Logout-da-aplicacao

## Aula 27 - Logout da aplicação

Agora para nós fazermos o logout devemos criar uma action de signOut dentro do auth/sagas:

```
export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

```

Com isso no Reducer, a gente chama essa action e setamos o token como nulo e o signed como false.

```
case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
```

E também devemos ouvir essa action no reducer de usuário e setar o profile como null.:

```
case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
```

E agora por último abrimos o saga de Autenticação e colocamos para ouvir o signOut e damos um hisoty.push('/') que ele vai deslogar automaticamente:

```
export function signOut() {
  history.push('/');
}
```

E assim vamos no Profile e importamos essa action SignOut e colocamos ela para funcionar:

```

import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from './styles';
import AvatarInput from './AvatarInput';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
    // console.tron.log(data);
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" placeholder="Seu endereço completo" />
        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>

      <button type="submit" onClick={handleSignOut}>
        Sair do Gobarber
      </button>
    </Container>
  );
}
```

Assim podemos testar e ver que está funcionando perfeitamente.
