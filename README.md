# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 05 - Rotas privadas

Aqui é configurado o `Route.js`para que nós possamos configurar as rotas privadas do usuário, para que ele acesse algumas rotas somente se ele estiver logado na aplicação.

Com isso não usamos mais o `Route` do `react-router-dom` e sim o `Route` que criamos.

Devemos configurar o proptypes dentro de Route para corrigir alguns problemas de eslint, para isso deve-se instalar a biblioteca:

```
yarn add prop-types
```
