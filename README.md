## <h2>👋 Hello, I’m @butzlaff</h2>

## API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário, desenvolvida com Express e Prisma e JavaScript.

<p>Para inciciar, devemos clonar o repositório em sua máquina, com o comando:

```sh
 git clone git@github.com:butzlaff/api_login.git
```

Feito isto, devemos instalar as dependências, para isso acesse a pasta raiz, onde o programa esta.

> ✨Dica: A pasta raiz, é onde se encontra o arquivo package.json

Após estar na pasta raiz, executamos o comando:

```sh
npm install  
```
> ✨Caso você não tenha o NodeJs instalado em sua máquina, você pode baixá-lo no seguinte site: [NodeJS SITE](https://nodejs.org/en)

Depois de instalado, as dependências, agora podemos executar nosso código!


> Este código excutará o programa!
```sh
npm run dev  
```

Porém, caso queiro rodar os testes:
```sh
npm run test
```
ou somente:
```sh
npm test
```
Caso queira verificar a cobertura dos testes, use o comando:
```sh
npm run test:coverage
```

## As rotas válidas são: 

Verfica se a API está online.
>GET
```sh
http://localhost:3001/ 
```


Cadastrar novo usuário:
>POST
```sh
http://localhost:3001/users/register
```
Formato do body para cadastro:
```sh
{
  "nome": string,
  "email": string (com email válido),
  "senha": string,
  "telefones": [
    {
      "numero": string,
      "ddd": string
    }
  ]
}
```
Fazer login:

>POST
```sh
http://localhost:3001/users/register
```
Formato do body para login:
```
{
  "nome": "string",
  "email": "string com email válido",
}
```
A Api irá retornar o seguinte formato:
```sh
{
  "id": number,
  "data_criacao": data,
  "data_alteracao": data,
  "ultimo_login": data,
  "token": "token válido"
}
```


Listar usuário:
> GET
```sh
http://localhost:3001/users/:id
```
> Onde ID é o id cadastrado no banco de dados.



