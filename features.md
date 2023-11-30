# Stranger

## Features

### Essenciais
-Chat Global
-Salas de assuntos específicos (jogos,filmes,séries,música etc)
-Salas criadas pelos usuários (podem personalizar limite de pessoas, assunto, descrição, etc)
-Sala com duas pessoas aleatórias
-Filtragem de salas

### Não-essenciais
-Upload de imagens
-Sistema de avaliação de salas
-Personalização avançada de salas (cores, senhas, etc)

## Regras
-As mensagens de salas criadas pelos usuários ficam salvas enquanto a sala estiver ativa
-Um usuário só pode acessar um chat com um nome de usuário
-Não pode haver nomes de usuário duplicados em uma sala
-Se um usuário for expulso de uma sala, não pode mais entrar nela
-Não pode haver nomes de salas duplicados
-As salas de assuntos específicos já vão estar disponíveis para que qualquer um possa entrar
-Salas inativas ou sem usuários são automaticamente excluídas do banco de dados

## Setup

### Front-end
-React - Criação da interface de usuário

### Back-end
-Express - Criar endpoints para fazer o CRUD das salas
-Socket.io - Permitir a comunicação bidirecional em tempo real entre cliente e servidor
-MongoDb - Armazenar informações sobre as salas
