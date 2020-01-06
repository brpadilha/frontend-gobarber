# GoBarber Web

Vamos contruir o GoBarber WEB que vai consumir a API Rest Gobarber Backend em NodeJS, vamos controlar rotas privadas, fazer a autenticação JWT e receber um token de autenticação. A autenticação do usuário vai ficar guardada no Redux para sempre que precisarmos do usuário logado, ter acesso ao Nome e avatar.

## Aula 08 - Utilizando Root Import

Para não ter que ficar utilizando o `../` para navegar entre as pastas, iremos utilizar uma forma mais simples de navegação, primeiro devemos instalar as bitliotecas:

```
yarn add customize-cra react-app-rewired -D
```

```
yarn add babel-plugin-root-import -D
```

Criamos o config-`overrides.js` na raiz da aplicação e lá configuramos assim:

```
// eslint-disable-next-line import/no-extraneous-dependencies
const { addBabelPluggin, override } = require('customize-cra');

module.exports = override(
  addBabelPluggin([
    'babel-plugin-root-import',
    {
      rootPathSuffix: 'src',
    },
  ])
);

```

Dentro de `package.json` devemos reconfigurar os `scripts`:

```
"start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
```

Agora podemos trocar todas as importações de locais que começam com `../` por `~/`.

Agora nós devemos instalar a biblioteca, pois pode dar alguns problemas com eslint:

```
yarn add eslint-import-resolver-babel-plugin-root-import -D
```

Para que a gente possa acessar as pastas apertando Comand ou Alt, criamos na raiz o arquivo `jsconfig.json` com a seguinte configuração:

```
{
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

Código: https://github.com/brpadilha/frontend-gobarber/tree/Aula-08-Utilizando-Root-Import
