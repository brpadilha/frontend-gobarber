# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 16 - Loading de autenticação

Agora nós iremos exibir as notificações para o usuário de que o mesmo não consegue logar ou que conseguiu logar com sucesso na conta. Para isso devemos instalar o Toastify:

```
yarn add react-toastify
```

Agora devemos ir no App.js e importar o ToastContainer e colocar dentro do return:

```
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoclose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;

```

Agora devemos importar dentro do `global.js` os estilos do toastify:

```
import 'react-toastify/dist/ReactToastify.css';

```

Agora dentro do `sagas.js` nós importamos o toast e passamos no lugar do controle.tron.error:

```

```

Ficando assim a nossa tela com Carregando:

![](imgs/trees/aula-16/loading.png 'Loading')

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-16-Loading-de-autenticacao
