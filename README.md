# App

GymPass style app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [] Deve ser possível obter o numero de check-ins realizados pelo usuário logado
- [] Deve ser possível o usuário obter o seu histórico de check-ins
- [] Deve ser possível o usuário buscar academias próximas
- [] Deve ser possível o usuário buscar academias pelo nome
- [] Deve ser possível o usuário realizar check-in em uma academia
- [] Deve ser possível validar o check-in de um usuário
- [] Deve ser possível cadastrar uma academia

## RNs (Regras de Negócio)

- [x] O usuário não deve poder se cadastrar com um email duplicado
- [] O usuário não pode fazer 2 check-ins no mesmo dia
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [] O check-in só pode ser validado até 20 minutos após ser criado
- [] O check-in só pode ser validado por administradores
- [] A academia só pode ser cadastrada por administradores  

## RNFs (Requisitos não Funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [] Todas listas de dados precisam estar paginadas com 20 itens por página
- [] O usuário deve ser identificado por um JWT (JSON Web Token)



### DEV NOTES
- Instalar o typescript com seus @types, mais o tsx pra executar o código typescrip em dev, mais tsup para criar a versão de build da aplicação
```
npm i typescript @types/node tsx tsup -D
```

- Rodar tsc pra ele criar o arquivo tsconfig.json (e trocar o es2016 para es2020)
```
npx tsc --init
```

- Criar a instancia do servidor com o fastify
```
npm i fastify
```

- Carregar as variaveis de ambiente
```
npm i dotenv
```

- Instalar biblioteca de validação zod, para validar testes e variaveis de ambiente
```
npm i zod
```

- Instalar o ORM prisma para banco de dados
```
npm i prisma -D
npm i @prisma/client
```

- Dependencia pra fazer a encriptação da senha
```
npm i bcryptjs
npm i @types/bcryptjs -D
```