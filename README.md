# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 03 - Configurando rotas

Para configurar as rotas devemos instalar o react-router-dom:

```
yarn add react-router-dom
```

O `history.js` serve para fazer a navegação do usuário na aplicação, para isso devemos instalar o history:

```
yarn add history
```

Logo é criado as Páginas do Dashboard, Profile, SignIn, SignUp ja com o snippet `rfc`.

E é configurado o `index.js` do Routes e do History.
