# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-24-Atualizando-perfil

## Aula 25 - Foto de perfil

Agora será capaz de inserir a foto de perfil do usuário. Para isso criamos dentro de /Profile a pasta AvatarInput/index.js. Que será o Container para a página do profile.

`AvatarInput/Index.js`:

```
import React from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function AvatarInput() {
  function handleChange(e) {}

  return (
    <Container>
      <label htmlFor="avatar">
        <img src="" alt="" />

        <input
          type="file"
          name=""
          id="avatar"
          accept="image/*" // faz aceitar somente imagem
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}

```

`AvatarInput/styles.js`

```
import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';
import api from '~/services/api';

export default function AvatarInput() {
  const ref = useRef();
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*" // faz aceitar somente imagem
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}


```

Agora para podermos fazer com que atualize a foto no banco de dados, vamos no Sagas.js do user, e colocamos para receber além de `name, email e ... rest`, para receber também o `avatar_id` que estamos enviando.

`user/sagas.js`

```
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
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

Podemos ver agora que podemos trocara a nossa foto de perfil:

![](imgs/trees/aula-25/fotoprofile.png 'profile')
