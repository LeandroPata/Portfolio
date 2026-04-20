---
title: Linux Tools | Leandro Pata
slug: linuxTools
locale: pt
github_url: https://github.com/LeandroPata/LinuxTools
publishDate: 2025-05-01 00:00:00
img: assets/projects/linuxTools/cover.jpg
img_alt: Linux Tools Cover
imgs: []
description: |
  Collection of linux tools and/or scripts to improve my own personal Linux experience.
tags:
  - Dev
  - Linux
  - Bash
---

<h1 style='text-align: center;'>Linux Tools</h1>

## Informação do Sistema

Estas ferramentas foram criadas para melhorar a minha própria experiência de `Linux`, então podem não funcionar para outros, especialmente com distribuições muito diferentes (como distribuições baseadas em `Debian`, por exemplo). Eu também adicionei prompts onde possível em casos onde apenas algumas tarefas de um script sejam úteis (como a atualização desnecessária da lista de `mirrorlists` de `EndeavourOs` num sistema `Arch`, por exemplo).

O meu sistema usa `EndeavourOs`, uma distribuição baseada em `Arch`, com `KDE Plasma 6`, além de `systemd-boot` como bootloader.

Eu penso que a maioria destas ferramentas funcionem pelo menos para aqueles que usam um sistema baseado em `Arch Linux`, mas tudo foi testado apenas no meu próprio sistema. Também não estou certo como se portam em sistemas com múltiplos usuários. Usar por vossa própria conta e risco.

## Index

- [backupConfigs](#backupConfigs)
- [bootOptimizations](#bootOptimizations)
- [getInstalledPackages](#getInstalledPackages)
- [globalizeScripts](#globalizeScripts)
- [open-wofi](#open-wofi)
- [prepareSystemD](#prepareSystemD)
- [sortAudio](#sortAudio)
- [sortImages](#sortImages)
- [systemCleaning](#systemCleaning)
- [updateMirrorlist](#updateMirrorlist)
- [vdirsyncer](#vdirsyncer)

<details>
<summary>backupConfigs</summary>
<span id='backupConfigs'></span>

Realiza o backup dos ficheiros de configuração especificados (ou outros ficheiros) para a pasta designada.

- `CONFIG` define os ficheiros de configuração desejados (ou outros ficheiros para fazer backup);
- `DEST_FOLDER` define a pasta desejada para fazer backup dos ficheiros;

Exemplo de execução:

```shell
./backupConfigs
```

## autoBackupConfigs

O mesmo que `backupConfigs`, mas com alterações que permitem a sua execução com um serviço `systemd` (removi prompts e itens desnecessários).

Usar com `backup-configs.service` e `backup-configs.timer` para automatizar.

## backup-configs.service and backup-configs.timer

Automatiza a execução de `backupConfigs` e executa-o uma vez por mês.
Devem ser colocados em `/etc/systemd/system/`

```shell
/usr/bin/autoBackupConfigs # deve ser alterado para o caminho do script autoBackupConfigs
```

Para ativar o temporizador:

```shell
systemctl daemon-reload
sudo systemctl enable --now backup-configs.timer
sudo systemctl list-timers # opcional, apenas para verificar se o temporizador foi ativado
```

## updateConfigs

Verifica se os ficheiros de configuração contidos na pasta fornecida estão na lista e solicita ao usuário se eles devem ser atualizados.

- O caminho do sistema de configurações deve incluir a variável `CONFIGS`. Qualquer ficheiro de configuração que não esteja na lista `CONFIGS` será ignorado;
- `CUR_DIR` define a pasta fornecida com as configurações (caso contrário, será definido como a pasta atual);

Exemplo de execução:

```shell
./updateConfigs
```

Or

```shell
./updateConfigs caminho/para/pasta
```

</details>

<details>
<summary>bootOptimizations</summary>
<span id='bootOptimizations'></span>

Otimizações de boot que fiz pessoalmente no meu sistema para melhorar os tempos de boot.

Não é pretendido ser executado como está, e, embora possa ser feito, não é recomendado a menos que se entendam os comandos executados, pois podem ser perigosos ao serem realizados.

Uma explicação dos comandos está disponível como comentário no script.

</details>

<details>
<summary>getInstalledPackages</summary>
<span id='getInstalledPackages'></span>

Gera um ficheiro de texto com todos os pacotes instalados atualmente, tanto pelo `pacman` quanto pelo `AUR`.

Cuidado ao usar para reinstalar pacotes, já que também inclui pacotes específicos da distribuição que podem não ser necessários ao mudar de distribuição.

- `DEST_FOLDER` define a pasta desejada para o ficheiro de texto (caso contrário, será definido como a pasta atual);
- `DEST_FILE` designa o nome do ficheiro de texto desejado (e talvez a extensão, embora não tenha testado);

## autoGetInstalledPackages

O mesmo que `getInstalledPackages`, mas com alterações que permitem a sua execução com um serviço `systemd` (removi prompts e itens desnecessários).

Usar com `getInstalledPackages.service` e `getInstalledPackages.timer` para automatizar.

## getInstalledPackages.service and getInstalledPackages.timer

Automatiza a execução de `getInstalledPackages` e executa-o uma vez por semana.
Devem ser colocados em `/etc/systemd/system/`

```shell
/usr/bin/autoGetInstalledPackages # deve ser alterado para o caminho do script autoGetInstalledPackages
```

Para ativar o temporizador:

```shell
systemctl daemon-reload
sudo systemctl enable --now getInstalledPackages.timer
sudo systemctl list-timers # opcional, apenas para verificar se o temporizador foi ativado
```

</details>

<details>
<summary>globalizeScripts</summary>
<span id='globalizeScripts'></span>

Torna os scripts, selecionados da pasta atual, globais (copia-os para `/usr/bin`), para que possam ser executados de qualquer lugar do sistema em vez de apenas na pasta onde estão.

## updateGlobalScripts

Verifica se os scripts contidos na pasta fornecida são globais (existem em `/usr/bin`) e solicita ao usuário se eles devem ser atualizados.

- `CUR_DIR` define a pasta fornecida com os scripts (caso contrário, será definido como a pasta atual);

Exemplo de execução:

```shell
./updateGlobalScripts
```

Or

```shell
./updateGlobalScripts caminho/para/pasta
```

</details>

<details>
<summary>open-wofi</summary>
<span id='open-wofi'></span>

Script simples para apenas abrir `wofi` se este não estiver já aberto.

Destinado a ser usado quando atribuído a uma tecla de atalho.

</details>

<details>
<summary>prepareSystemD</summary>
<span id='prepareSystemD'></span>

Script para reinstalar kernels, copiado de [este tutorial ao converter para systemd-boot](https://forum.endeavouros.com/t/tutorial-convert-to-systemd-boot/13290)

</details>

<details>
<summary>sortAudio</summary>
<span id='sortAudio'></span>

Ordena ficheiros de áudio de uma pasta (recursivamente, inclui ficheiros dentro de subpastas) em pastas de álbum e (opcionalmente) pastas de artista e/ou discos.

- A pasta intendida pode ser definida por um parâmetro (caso contrário, será a pasta atual);
- O caminho fornecido pode ser para uma pasta ou um ficheiro;
- Aceita apenas ficheiros de áudio (verificado pelo tipo MIME);
- Além disso, os ficheiros precisam de ter as tags corretamente, com pelo menos a tag `Album` (e as tags `AlbumArtist`, `TotalDiscs` e `Discs` para ordenar opcionalmente em artistas e pastas de discos, respectivamente);
- As pastas ordenadas podem ser todas movidas para a pasta raiz (o caminho fornecido) ou as pastas ordenadas podem ser criadas na localização atual dos ficheiros de áudio.

Exemplo de execução:

```shell
./sortAudio
```

Ou

```shell
./sortAudio caminho/para/pasta
```

Ou

```shell
./sortAudio caminho/para/audio
```

</details>

<details>
<summary>sortImages</summary>
<span id='sortImages'></span>

Ordena imagens de uma pasta (recursivamente, inclui imagens dentro de subpastas) por resolução e exporta a lista ordenada para um ficheiro de texto na pasta atual.

- A lista inclui o caminho da imagem, a resolução da imagem, o formato da imagem e a quantidade de pixels;
- A pasta intendida pode ser definida por um parâmetro (caso contrário, será a pasta atual);
- Se em vez de uma pasta, for inserido o caminho de um ficheiro, apenas as informações daquela imagem serão exportadas para o ficheiro de texto;

Exemplo de execução:

```shell
./sortImages
```

Or

```shell
./sortImages caminho/para/pasta
```

Or

```shell
./sortImages caminho/para/imagem
```

</details>

<details>
<summary>systemCleaning</summary>
<span id='systemCleaning'></span>

Automatiza algumas das manutenções que devem ser feitas para manter o computador 'saudável', para que apenas o script precise de ser executado em vez dos comandos individuais

- Limpa registos do jornal mais antigos que 4 semanas;
- Limpa cache do `pacman` e `yay` e remove TODOS os pacotes desinstalados;
- Solicita ao usuário se deseja remover pacotes órfãos e gera um ficheiro de texto com todos os pacotes órfãos encontrados;

- `DEST_FOLDER` define a pasta desejada para o ficheiro de texto (caso contrário, será definido como a pasta atual);
- `DEST_FILE` designa o nome do ficheiro de texto desejado (e talvez sua extensão, embora não tenha testado);

## autoSystemCleaning

O mesmo que `systemCleaning`, mas com alterações que permitem a sua execução com um serviço `systemd` (removi prompts e itens desnecessários). Removi também a remoção de pacotes órfãos, já que sua remoção poderia ser problemática e deve ser feita com cuidado.

Usar com `systemCleaning.service` e `systemCleaning.timer` para automatizar.

## systemCleaning.service and systemCleaning.timer

Automatiza a execução de `systemCleaning` e executa-o uma vez por semana.
Devem ser colocados em `/etc/systemd/system/`

```shell
/usr/bin/autoSystemCleaning # deve ser alterado para o caminho do script autoSystemCleaning
```

Para ativar o temporizador:

```shell
systemctl daemon-reload
sudo systemctl enable --now systemCleaning.timer
sudo systemctl list-timers # opcional, apenas para verificar se o temporizador foi ativado
```

</details>

<details>
<summary>updateMirrorlist</summary>
<span id='updateMirrorlist'></span>

Automatiza a atualização de mirrorlists para que apenas o script seja executado em vez dos comandos individuais.

- Atualiza a mirrorlists de `Arch`;
- Atualiza a mirrorlists de `EndeavourOs`;
- Atualiza o sistema (`yay -Syyu`);

## autoUpdateMirrorlist

O mesmo que `updateMirrorlist`, mas com alterações que permitem a sua execução com um serviço `systemd` (removi prompts, atualização automática do sistema, já que isso poderia levar a problemas, e outros itens desnecessários).

Usar com `updateMirrorlist.service` e `updateMirrorlist.timer` para automatizar.

## updateMirrorlist.service and updateMirrorlist.timer

Automatiza a execução de `updateMirrorlist` e executa-o uma vez por mês.
Devem ser colocados em `/etc/systemd/system/`

```shell
/usr/bin/autoUpdateMirrorlist # deve ser alterado para o caminho do script autoUpdateMirrorlist
```

Para ativar o temporizador:

```shell
systemctl daemon-reload
sudo systemctl enable --now updateMirrorlist.timer
sudo systemctl list-timers # opcional, apenas para verificar se o temporizador foi ativado
```

</details>

<details>
<summary>vdirsyncer</summary>
<span id='vdirsyncer'></span>

Automatiza a sincronização do meu calendário google para o calendário CalDAV localmente hospedado a cada 15 minutos.
Devem ser colocados em `~/.config/systemd/user/`

Para ativar o temporizador:

```shell
systemctl --user daemon-reload
sudo systemctl --user enable --now updateMirrorlist.timer
sudo systemctl --user list-timers # opcional, apenas para verificar se o temporizador foi ativado
```

</details>

## Desenvolvido por

- [Leandro Pata](/pt/about/)
