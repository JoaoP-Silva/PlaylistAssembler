# PlaylistAssembler
Sistema de montagem automática de playlists para as principais plataformas de streaming de músicas.

## Escopo do projeto
A função do sistema é otimizar o tempo de criação de playlists, após o usuário realizar o login em sua plataforma de streaming, a playlist é montada automaticamente a partir de uma lista de músicas inserida em uma caixa de texto. O sistema conta com as seguintes features:
* Autenticação do usuário pela sua plataforma de streaming(Napster, Deezer ou Spotify).
* Opção de montar a playlist no Napster.
* Opção de montar a playlist no Deezer.
* Opção de montar a playlist no Spotify.

## Tecnologias usadas
* Respectivas APIs do [Napster](https://developer.prod.napster.com/api/v2.2), [Deezer](https://developers.deezer.com/) e [Spotify](https://developer.spotify.com/documentation/web-api/).
* JavaScript para comunicação com as APIs.
* React para desenvolvimento do frontend.

## Time de desenvolvimento
* João Igor - frontend
* João Pedro - backend (Spotify API)
* Milton Bravo - backend (Deezer API)
* Pedro Cimini - backend (Napster API)

## Backlog do Sprint
- História de usuário 1: Como usuário eu quero escolher qual serviço de streaming vou utilizar.
  - Criar a interface de botões para selecionar o serviço de streaming que será utilizado (João Igor)
  - Realizar a autenticação da conta Spotify (João Pedro)
  - Realizar a autenticação da conta Deezer (Milton Bravo)
  - Realizar a autenticação da conta Napster (Pedro Cimini)
  
- História de usuário 2: Como usuário eu quero poder nomear a playlist que será criada.
  - Criar a interface para inserir o nome da playlist (João Igor)
  - Extrair o nome da playlist (João Pedro)
  - Criar uma playlist na conta do usuário Spotify (João Pedro)
  - Criar uma playlist na conta do usuário Deezer (Milton Bravo)
  - Criar uma playlist na conta do usuário Napster (Pedro Cimini)
  
- História de usuário 3: Como usuário eu quero inserir várias músicas na playlist simultaneamente.
  - Criar a interface para inserir a lista de músiscas da playlist (João Igor)
  - Obter a lista de músicas inserida pelo usuário (João Pedro)
  - Inserir as músicas na playlist criada no Spotify (João Pedro)
  - Inserir as músicas na playlist criada no Deezer (Milton Bravo)
  - Inserir as músicas na playlist criada no AppleMusic (Pedro Cimini)
