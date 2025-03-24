---
title: Aplicação de Gestão de Encomendas | Leandro Pata
slug: orderManagementApp
locale: pt
github_url: https://github.com/LeandroPata/OrderManagementApp
publishDate: 2024-12-19 00:00:00
img: /assets/stock-3.jpg
img_alt: Order Management App Main Menu
imgs:
  [
    /src/assets/projects/orderManagementApp/addClient.png,
    /src/assets/projects/orderManagementApp/addProduct.png,
    /src/assets/projects/orderManagementApp/addOrder.png,
    /src/assets/projects/orderManagementApp/showClientOrder.png,
    /src/assets/projects/orderManagementApp/showOrderDetails.png,
    /src/assets/projects/orderManagementApp/showProductOrder.png,
    /src/assets/projects/orderManagementApp/showProductQuantity.png,
    /src/assets/projects/orderManagementApp/mainMenu.png,
    /src/assets/projects/orderManagementApp/addMenu.png,
    /src/assets/projects/orderManagementApp/showMenu.png,
    /src/assets/projects/orderManagementApp/importExport.png,
    /src/assets/projects/orderManagementApp/drawerLight.png,
    /src/assets/projects/orderManagementApp/drawerDark.png,
  ]
description: |
  Projeto desenvolvido para auxiliar a gestão encomendas.
tags:
  - Dev
  - React Native
  - Expo
---

<h1 style='text-align: center;'>Projeto Aplicação de Gestão de Encomendas</h1>

Projeto pessoal criado para auxiliar a gestão de encomendas.

Foi desenvolvido com o objetivo de permitir a consulta das encomendas atuais, que encomendas ainda não estão completadas, prontas para entrega ou já entregues, a quantidade de produtos específicos necessários para satisfazer as encomendas atuais, entre outras funcionalidades, de forma rápida e fácil, assim como tornar toda esta informação disponível em qualquer lugar, armazenando-a numa base de dados na cloud.

## Funcionalidades

### Funcionalidades Principais

- Adicionar Clientes, Produtos e Encomendas para uma base de dados;

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/addClient.png' alt = 'AddClient' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/addProduct.png' alt = 'AddProduct' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/addOrder.png' alt = 'AddOrder' width=190>
</p> -->

- Consultar encomendas de um cliente específico;

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/showClientOrder.png' alt = 'ShowClientOrder' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/showOrderDetails.png' alt = 'ShowOrderDetails' width=190>
</p> -->

- Consultar encomendas de um produto específico;

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/showProductOrder.png' alt = 'ShowProductOrder' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/showProductOrderLandscape.png' alt = 'ShowProductOrderLandscape' height=350>
</p> -->

- Consultar as quantidades de todos os produtos incluídos atualmente em encomendas;

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/showProductQuantity.png' alt = 'ShowProductQuantity' width=190>
</p> -->

- Atualizar o estado da encomenda(quando uma linha de uma DataTable é premida continuamente);
- Importar/Exportar informação de membros para/de ficheiros .csv de forma a facilitar a partilha e/ou edição;

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/mainMenu.png' alt = 'MainMenu' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/addMenu.png' alt = 'AddMenu' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/showMenu.png' alt = 'ShowMenu' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/importExport.png' alt = 'ImportExportMenu' width=190>
</p> -->

### Funcionalidades Gerais

- Autenticação para permitir o acesso da informação apenas a contas aprovadas (a habilidade de criar uma conta seria removida numa implementação real, ou necessitar a verificação/aprovação da conta antes de permitir o acesso);
- Mudar a password;
- Tradução para várias línguas;
- Modo claro/escuro;
- Verificação de atualizações (como isto é um projeto pessoal, publicar nas App Stores não é viável, logo um sistema de atualizações diferente foi implementado, não possível para iOS);

<!-- <p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/drawerLight.png' alt = 'DrawerLight' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/drawerDark.png' alt = 'DrawerDark' width=190>
</p> -->

## Notas Técnicas

- Ambos os esquemas de ecrã vertical e horizontal são suportados, pois o esquema horizontal melhora significativamente a visualização da informação numa DataTable;
- Como a largura de um smartphone comum pode não ser suficiente para mostrar toda a informação de uma linha de uma DataTable, uma alternativa foi implementada onde premir na linha mostra toda a informação da mesma;
- Todas as procuras de clientes/produtos têm uma implementação de "fuzzy searching" com uma lista para ajudar o utilizador a encontrar o membro desejado;
- Verificações de atualizações foi implementado por guardando as APKs em Firebase Storage e depois verificando a versão atual da aplicação com as versões das APKs guardadas, fazendo o download e atualizando se uma versão mais recente estiver disponível (isto não é possível no iOS, sendo que este não permite sideloading);
- Como todas as funcionalidades cloud requerem a Firebase, em qualquer reprodução deste projeto vai requerir a configuração de um projeto Firebase (mais especificamente dos módulos descritos na seção seguinte) e a adição de ambos os ficheiros com configurações (google-services.json and GoogleService-Info.plist) ao projeto;
- 'Environment variables' são usadas, portanto, em qualquer reprodução deste projeto irá requerer que elas existam no ficheiro .env (para a execução local) e/ou Expo (ou outra framework), tal como o exemplo seguinte:

```
# Firebase Config Files
GOOGLE_SERVICES_JSON='./google-services.json'
GOOGLE_SERVICES_PLIST='./GoogleService-Info.plist'
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
