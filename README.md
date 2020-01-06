# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 12 - Configurando Store

Primeiramente adicionamos as bibliotecas:

```
yarn add redux redux-saga react-redux reactotron-redux reactotron-redux-saga immer
```

1-Com isso criamos a pasta Store com index.js dentro.
2-Criamos a pasta Modules dentro de Store
3-Criamos o arquivo rootReducer e rootSaga e a pasta auth
4- Dentro de auth criamos os arquivos: actions.js, reducer.js e sagas.js

Dentro de `reducer.js`:

```
const INITIAL_STATE = {};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}

```

Dentro de `sagas.js`:

```
import { all } from 'redux-saga';

export default all([]);

```

Agora devemos combinar os reducers no `rootReducer.js`:

```
import { combineReducers } from 'redux';
import auth from './auth/reducer';

export default combineReducers({
  auth,
});

```

E agora precisamos combinar os sagas no `rootSaga.js`

```
import { all } from 'redux-saga/effects';

import auth from './auth/sagas';

export default function* rootSaga() {
  return yield all([auth]);
}

```

Para o nosso arquivo Index nao ficar muito grande, criamos o arquivo createStore.js para algumas funcionalidades.

Agora vamos para o `index.js` do Store:

```
import createSagaMiddleare from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMiddleware = createSagaMiddleare();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);
export default store;

```

Agora em `createStore.js`:

```
 import { createStore } from 'redux';

export default (reducers, middlewares) => {
  return createStore(reducers, middlewares);
};

```

Precisamos agora arrumar as configurações no `ReacotronConfig.js`:

```
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  const tron = Reactotron.configure()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();

  tron.clear();

  console.tron = tron;
}

```

Agora devemos ainda configurar algumas coisas no `index.js` do Store:

```
import createSagaMiddleare from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleare({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);
export default store;

```

E agora em `createStore.js`:

```
import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(console.tron.createEnhancer(), applyMiddleware(...middlewares))
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};

```

Agora nosso Store está todo configurado.

Agora podemos importá-los no `App.js`:

```
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/ReactotronConfig';

import Routes from './routes';
import history from './services/history';

import store from './store';

import GlobalStyle from './styles/global';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyle />
      </Router>
    </Provider>
  );
}

export default App;

```

Agora vamos no Reactotron para testar, vamos em State e clicamos em Add e criamos o state Auth.

Ficará assim a nossa página:

- Reactotron state:



Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-12-Configurando-store
