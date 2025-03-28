---
title: Aplicação de Gestão de Membros | Leandro Pata
slug: memberManagementApp
locale: pt
github_url: https://github.com/LeandroPata/MemberManagementApp
publishDate: 2024-10-22 00:00:00
img: /assets/stock-1.jpg
img_alt: Member Management App Main Menu
imgs:
  [
    ['/src/assets/projects/memberManagementApp/mainMenu.png', 'Menu Principal'],
    [
      '/src/assets/projects/memberManagementApp/addMember.png',
      'Adicionar Membro',
    ],
    [
      '/src/assets/projects/memberManagementApp/searchMember.png',
      'Procurar Membro',
    ],
    ['/src/assets/projects/memberManagementApp/profile.png', 'Perfil'],
    [
      '/src/assets/projects/memberManagementApp/importExport.png',
      'Importar/Exportar',
    ],
  ]
description: |
  Projeto desenvolvido para auxiliar a gestão de membros de uma organização ou clube.
tags:
  - Dev
  - React Native
  - Expo
---

<h1 style='text-align: center;'>Projeto de Aplicação de Gestão de Membros</h1>

Projeto pessoal criado para auxiliar a gestão de membros.

Foi desenvolvido com o objetivo de permitir a criação de um perfil de membro, verificar a informação de um membro, entre outras funcionalidades, de forma rápida e fácil, assim como
tornar toda esta informação disponível em qualquer lugar, armazenando-a numa base de dados na cloud.

## Funcionalidades

### Funcionalidades Principais

- Adicionar novos membros a uma base de dados;
- Consultar a informação de um membro específico;
- Editar a informação de um membro;
- Apagar membros;
- Importar/Exportar informação de membros para/de ficheiros .csv de forma a facilitar a partilha e/ou edição;

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/memberManagementApp/mainMenu.png' alt = 'MainMenu' width=190>
  <img align='top' src='/src/assets/projects/memberManagementApp/addMember.png' alt = 'AddMemberMenu' width=190>
  <img align='top' src='/src/assets/projects/memberManagementApp/searchMember.png' alt = 'SearchMemberMenu' width=190>
  <img align='top' src='/src/assets/projects/memberManagementApp/profile.png' alt = 'Profile' width=190>
  <img align='top' src='/src/assets/projects/memberManagementApp/importExport.png' alt = 'ImportExportMenu' width=190>
</p> -->

### Funcionalidades Gerais

- Autenticação para permitir o acesso da informação apenas a contas aprovadas (a habilidade de criar uma conta seria removida numa implementação real, ou necessitar a verificação/aprovação da conta antes de permitir o acesso);
- Mudar a password;
- Tradução para várias línguas;
- Modo claro/escuro;
- Verificação de atualizações (como isto é um projeto pessoal, publicar nas App Stores não é viável, logo um sistema de atualizações diferente foi implementado, não possível para iOS);

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/memberManagementApp/drawerLight.png' alt = 'DrawerLightMode' width=190>
  <img align='top' src='/src/assets/projects/memberManagementApp/drawerDark.png' alt = 'DrawerDarkMode' width=190>
</p> -->

## Notas Técnicas

- Procuras de membros têm uma implementação de "fuzzy searching" com uma lista para ajudar o utilizador a encontrar o membro desejado;
- Verificações de atualizações foi implementado por guardando as APKs em Firebase Storage e depois verificando a versão atual da aplicação com as versões das APKs guardadas, fazendo o download e atualizando se uma versão mais recente estiver disponível (isto não é possível no iOS, sendo que este não permite sideloading);
- Como todas as funcionalidades cloud requerem a Firebase, em qualquer reprodução deste projeto vai requerir a configuração de um projeto Firebase (mais especificamente dos módulos descritos na seção seguinte) e a adição de ambos os ficheiros com configurações (google-services.json and GoogleService-Info.plist) ao projeto;
- 'Environment variables' são usadas, portanto, em qualquer reprodução deste projeto irá requerer que elas existam no ficheiro .env (para a execução local) e/ou Expo (ou outra framework), tal como o exemplo seguinte:

```
# Firebase Config Files
GOOGLE_SERVICES_JSON='./google-services.json'
GOOGLE_SERVICES_PLIST='./GoogleService-Info.plist'

# URL for placeholder profile picture, stored in Firebase Storage
EXPO_PUBLIC_PLACEHOLDER_PICTURE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Tech utilizada

Este projeto foi desenvolvido com a <a href="https://reactnative.dev/" target=_blank>React Native</a> <a href="https://expo.dev/" target=_blank>Expo</a> framework, usando Typescript, CSS e Javascript.

Todas as funcionalidades cloud usam <a href="https://firebase.google.com/" target=_blank>Firebase</a>. Os módulos principalmente usados são:

- <a href="https://firebase.google.com/products/auth" target=_blank>Firebase Authentication</a> para a autenticação das contas de utilizadores;
- <a href="https://firebase.google.com/products/firestore" target=_blank>Firestore</a> como uma base de dados NoSQL pa guardar os documentos com dados;
- <a href="https://firebase.google.com/products/storage" target=_blank>Firebase Cloud Storage</a> para armazenar ficheiros maiores (imagens de perfil, exportações de dados e atualizações);

Alguns do 'pacotes' usados principalmente são:

- <a href="https://www.fusejs.io/" target=_blank>Fuse.js</a> para 'fuzzy searching';
- <a href="https://www.i18next.com/" target=_blank>i18next</a> para a implementação de traduções;
- <a href="https://reactnativepaper.com/" target=_blank>React Native Paper</a> para a customização de temas e aparência;
- Todos os 'pacotes' estão presentes em package.json;

## Desenvolvido por

- [Leandro Pata](/about/)
