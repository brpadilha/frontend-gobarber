# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 15 - Persistindo Autenticação

Para que quando a gente apertar F5, o nosso usuário não seja deslogado da nossa apliação, iremos usar a lib chamada redux-persist:

```
yarn add redux-persist
```

Com isso criamos ao lado do createStore o arquivo chamado `persistReducers`:

```
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gobarber',

      storage,
      whitelist: ['auth', 'user'],
    },
    reducers
  );

  return persistedReducer;
};

```

Agora vamos ao index do Store:

```
import { persistStore } from 'redux-persist';

import createSagaMiddleare from 'redux-saga';
import createStore from './createStore';
import persistReducers from './persistReducers';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleare({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
export { store, persistor };

```

Vimos que vai dar um erro na aplicação, para isso, vamos em App e no Route, e colocamos { } entre o store.

Com isso, nós agora devemos importar o PersistGate para que a aplicação renderize depois de buscar as informações no storage da nossa aplicação.

no `App.js`:

```

import React from 'react';
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
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
```

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-15-Persistindo-autenticacao
