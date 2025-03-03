---
title: App Encomendas | Leandro Pata
slug: orderManagementApp
locale: pt
publishDate: 2024-12-19 00:00:00
img: /assets/stock-3.jpg
img_alt: Order Management App Main Menu
description: |
  This was a project developed to help manage orders.
tags:
  - Dev
  - React Native
  - Expo
---

<h1 style='text-align: center;'>Order Management App Project</h1>

This is a personal project created to improve order management.

It was developed with the intent to accurately, quickly and easily check current orders, what orders are not completed yet, are ready to be delivered or already delivered, what products are needed to fulfill current orders and other features, while making the information available anywhere by storing it in a cloud database.

## Features

### Main Features

- Add Clients, Products and Orders to a cloud database;

<p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/addClient.png' alt = 'AddClient' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/addProduct.png' alt = 'AddProduct' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/addOrder.png' alt = 'AddOrder' width=190>
</p>

- Show orders from a specific client;

<p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/showClientOrder.png' alt = 'ShowClientOrder' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/showOrderDetails.png' alt = 'ShowOrderDetails' width=190>
</p>

- Show orders of a specific product;

<p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/showProductOrder.png' alt = 'ShowProductOrder' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/showProductOrderLandscape.png' alt = 'ShowProductOrderLandscape' height=350>
</p>

- Show the quantities of all products currently ordered;

<p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/showProductQuantity.png' alt = 'ShowProductQuantity' width=190>
</p>

- Updating a order's status(long pressing on a DataTable's row);
- Import/Export of clients, products and orders databases to/from .csv files in order to facilitate sharing and/or editing;

<p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/mainMenu.png' alt = 'MainMenu' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/addMenu.png' alt = 'AddMenu' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/showMenu.png' alt = 'ShowMenu' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/importExport.png' alt = 'ImportExportMenu' width=190>
</p>

### General Features

- Authentication to allow only trusted accounts to access the information (ability to freely create an account would be removed in a real world implementation or require email/account verification before allowing login);
- Changing Password;
- Translation to different languages;
- Light/Dark Theme;
- Checking for updates (as it is a personal project, publishing in App Stores isn't feasible, so a different update checking system was implemented, not possible for iOS);

<p align='middle'>
  <img align='top' src='/src/assets/projects/orderManagementApp/drawerLight.png' alt = 'DrawerLight' width=190>
  <img align='top' src='/src/assets/projects/orderManagementApp/drawerDark.png' alt = 'DrawerDark' width=190>
</p>

## Tecnical Notes

- Both portrait and landscape layouts are supported, as landscape layout significantly improves viewing information from the DataTables;
- As a common smartphone's screen width isn't enough to fully display the information from a DataTable's row, a solution was implemented where clicking a DataTable's row will display all that row's information;
- All searchs of clients/products have a "fuzzy searching" implementation with a "hint" list to help the user find the intended client/product;
- Update checking was implemented by having the APKs stored in Firebase Storage and then cross-checking the app's current version and the stored APKs version, downloading and updating if a more recent version is available (this isn't possible in iOS, as it doesn't allow sideloading);
- As all cloud functionalities (as is) require Firebase, in any reproduction of this project will require setting up Firebase (more specifically the modules detailed in the next section) and adding both config files (google-services.json and GoogleService-Info.plist) to the project;
- Environment variables are used, so in any reproduction of this project setting them in a .env file (to run locally) and/or Expo (or other building framework) will be necessary. This is an .env example:

```
# Firebase Config Files
GOOGLE_SERVICES_JSON='./google-services.json'
GOOGLE_SERVICES_PLIST='./GoogleService-Info.plist'
```

## Tech used

This project was developed with the <a href="https://reactnative.dev/" target=_blank>React Native</a> <a href="https://expo.dev/" target=_blank>Expo</a> framework, using a mix of Typescript, CSS and some Javascript.

All cloud features are build using <a href="https://firebase.google.com/" target=_blank>Firebase</a>. The main Firebase features used are:

- <a href="https://firebase.google.com/products/auth" target=_blank>Firebase Authentication</a> for user accounts authentication;
- <a href="https://firebase.google.com/products/firestore" target=_blank>Firestore</a> as a NoSQL DataBase to store data documents;
- <a href="https://firebase.google.com/products/storage" target=_blank>Firebase Cloud Storage</a> to store larger files (profile pictures, data exports and updates);

Some of the main packages used are:

- <a href="https://www.fusejs.io/" target=_blank>Fuse.js</a> for fuzzy searching;
- <a href="https://www.i18next.com/" target=_blank>i18next</a> for translation implementation;
- <a href="https://reactnativepaper.com/" target=_blank>React Native Paper</a> for theming and appearance customization;
- All other packages are present in the package.json;

## Developed by

- [Leandro Pata](/about/)
