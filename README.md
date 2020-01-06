# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 06 - Layouts por página

Iremos criar templates das telas, pois elas são bem parecidas.

Esses Layouts iremos criar uma pasta \_layouts em pages e lá configuraremos os Layouts de Autenticação e Default.

Deve-se instalar o styled-components:

```
yarn add styled-components
```

Depois de configurar as paginas auth e layout, devemos importá-los la no `Route.js`.
E configurar se o Usuário está logado, qual Layout deve apresentar na tela.
