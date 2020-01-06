# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 04 - Configurando Reactotron

Primeiro deve-se instalar o reactotron no computador e os pacotes dele na aplicação com:

```
yarn add reactotron-react-js
```

É criado a pasta Config no src para configuração do arquivo `ReactotronConfig.js` e depois devemos importalo na `App.js`.
