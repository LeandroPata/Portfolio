---
title: WallTheme | Leandro Pata
slug: wallTheme
locale: pt
github_url: https://github.com/LeandroPata/WallTheme
publishDate: 2024-10-22 00:00:00
img: assets/projects/wallTheme/cover.png
img_alt: WallTheme Cover
imgs: []
description: |
  Gera temas baseado nas cores dominantes de uma imagem.
tags:
  - Dev
  - Python
---

<h1 style='text-align: center;'>WallTheme</h1>

<p align="center">
<a href="https://pypi.python.org/pypi/walltheme/"><img src="https://img.shields.io/pypi/v/walltheme.svg"></a>
<a href="./LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
<a href="https://github.com/LeandroPata/WallTheme/actions/workflows/release.yml"><img src="https://github.com/LeandroPata/WallTheme/actions/workflows/release.yml/badge.svg"></a>
</p>

## Uma ferramenta para gerar palettes de cores

Gera uma paleta de cores usando as cores dominantes de uma imagem, inspirado por `pywal`, `wallust` e (em torno do) no esquema de `matugen` (Material You theming).

## Funcionalidades

 Para cada cor obtida da imagem, duas outras são geradas e adicionadas à palette. Elas são:

(O significado de `primary` depende da relevância da cor. A cor mais dominante é a `primary`, a segunda é `secondary`, a terceira é `tertiary`, a quarta é `quaternary`, a quinta é `quinary`. Cores adicionais serão chamadas de `colorN`, onde `N` é o número da cor)

- `primary`: A cor original, útil para cores de destaque;
- `primary_light`: Uma tonalidade mais clara da cor original, útil para texto e elementos no primeiro plano;
- `primary_dark`: Uma tonalidade mais escura da cor original, útil para contentores e elementos no plano de fundo;

Além disso, em cada tema, há quatro campos extra:

- `wallpaper`: O caminho absoluto da imagem fornecida;
- `background`: Uma cor para o fundo com base na cor mais dominante (deve ser mais escuro que `primary_dark` , idealmente, será algo quase preto/cinza escuro com um leve tom da cor dominante);
- `foreground`: Uma cor para ser usada em elementos no primeiro plano com base na cor mais dominante (deve ser mais clara que `primary_light` , idealmente, será algo quase branco com um leve tom da cor dominante);
- `cursor`: A cor a ser usada como cor de cursor. É exatamente a mesma que `foreground`;

## Requisitos

- Requer Python versão 3.10 ou mais recente;;
- Requer [llaisdy's dominant-colours](https://github.com/llaisdy/dominant-colours);

```shell
cargo install dominant-colours
```

## Instalação

- Instalar `dominant-colours`:

```shell
cargo install dominant-colours
```

- Desinstalar `dominant-colours`:

```shell
cargo uninstall dominant-colours
```

### Usando pipx:

- Instalar `WallTheme`:

```shell
pipx install walltheme
```

- Atualizar `WallTheme`:

```shell
pipx upgrade walltheme
```

- Desinstalar `WallTheme`:

```shell
pipx uninstall walltheme
```

### Usando pip:

- Instalar `WallTheme`:

```shell
pip install walltheme
```

- Atualizar `WallTheme`:

```shell
pip install walltheme --upgrade
```

- Desinstalar `WallTheme`:

```shell
pip uninstall walltheme
```

## Uso

```shell
walltheme /path/to/image.png
```

| Args | Description |
| -------- | ----------- |
| -m, --max-colors | Define quantas cores são usadas de uma imagem (Padrão: 5) |
| -q, --quiet | Não exibe nada no terminal |
| -v, --version     | Mostra a versão atual do WallTheme |

Todos os templates estão armazenados em "~/.config/walltheme/templates" (ou onde o diretório de configuração está definido em XDG);

Todas os temas gerados são armazenados em  "~/.cache/walltheme" (ou onde o diretório de cache está definido em XDG);

## Backend

O backend para encontrar as cores dominantes das imagens é a ferramenta [llaisdy's dominant-colours](https://github.com/llaisdy/dominant-colours), ela **NÃO** foi criada por mim.

## Templates

Templates também são completamente suportados (com `jinja2`) e as seguintes variáveis estão disponíveis (várias amostras de templates e um template de exemplo com múltiplas sintaxes corretas estão disponíveis na pasta `templates`):

- `theme`: Inclui todos os valores;
- `wallpaper`: Inclui o caminho absoluto da imagem;
- `special`: Inclui os valores `background`, `foreground` e `cursor`;
- `palette`: Inclui todas as cores;

Enquanto `wallpaper` é uma `string` com um único valor (ou seja, pode ser referenciado apenas pelo seu nome), todos os outros são `dictionary` e exigem a seguinte sintaxe para serem referenciados corretamente:

  Todos estes são exemplos e podem ser usados em todas as variáveis do tipo `dictionary`:

- `theme.items()`: Referencia todos os itens no `dictionary`;
- `special['background']`: Referencia a variável `background` em `special` (aspas são necessárias);
- `palette.secondary`: Referencia a variável `secondary` em `palette`;

## Porquê

Eu criei esta ferramenta porque as opções disponíveis que encontrei e experimentei não atendiam completamente às minhas necessidades.

Ambos [pywal](https://github.com/dylanaraps/pywal) e [wallust](https://codeberg.org/explosion-mental/wallust) criam temas com cores de uma imagem em praticamente qualquer formato (apenas tenha ou crie o modelo correspondente), mas, para mim, muitas vezes a ordem das cores parecia aleatória, sendo difícil automatizar o uso dos temas da forma que eu preferia.

[Matugen](https://github.com/InioX/matugen) did choose the dominant color for the theming the grand majority of the times, but it takes into account only a single color, and the color tones of color schemes themselves are not based on the color itself, but on what the color is (red, green, blue, etc), resulting in a lot of similar looking themes and mismatching secondary and tertiary colors.

[Matugen](https://github.com/InioX/matugen) escolheu a cor dominante para o t na maioria dos casos, mas considera apenas uma única cor e os tons das cores do tema não são baseados na própria cor, mas em qual cor ela é (vermelho, verde, azul, etc), resultando em muitos temas semelhantes e cores secundárias e terciárias que não encaixam.

Esta ferramenta (na minha opinião tendenciosa) combina o melhor dos dois mundos.

## Desenvolvido por

- [Leandro Pata](/pt/about/)
