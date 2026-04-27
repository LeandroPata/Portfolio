---
title: Linux Tools | Leandro Pata
slug: linuxTools
locale: en
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

## System Information

These tools were created to help improve my own personal `Linux` experience, so they might not work for others, especially with vastly different distros (such as `Debian` based distros due to it using a different package manager, for example). I have also added prompts where possible in case only some tasks of a script are useful (such as the unnecessary update of `EndeavourOs` `mirrorlists` in an `Arch` system, for example).

My system runs `Arch` based `EndeavourOs`, with a `KDE Plasma 6` desktop environment, along with a `systemd-boot` bootloader.

I expect most of these tools should work at least for those running an `Arch` based `Linux` system just fine, but no testing other than on my own system was made. Also not sure how they'll behave on systems with multiple users. Use them at your own risk.

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

Backs up the specified configs (or other files) into the a designated folder.

- `CONFIG` variable designates the desired configs (or other files to backup);
- `DEST_FOLDER` parameter designates the desired folder to backup the configs to;

Example execution:

```shell
./backupConfigs
```

### autoBackupConfigs

Same as `backupConfigs`, but with changes to permit execution by a `systemd` service (removed prompts and unnecessary stuff).

Use with `backup-configs.service` and `backup-configs.timer` to automate.

### backup-configs.service and backup-configs.timer

Automates `backupConfigs` execution and executes the script once a month.
Should be placed in `/etc/systemd/system/`

```shell
/usr/bin/autoBackupConfigs # should be changed to whatever is your autoBackupConfigs script path
```

To activate the timer:

```shell
systemctl daemon-reload
sudo systemctl enable --now backup-configs.timer
sudo systemctl list-timers # optional, just to check if the timer has been activated
```

### updateConfigs

Checks if the configs contained in the directory provided are in the list and prompts the user if they should be updated.

- The configs system path have to be included in the `CONFIGS` variable. Any configs not included in `CONFIGS` will be ignored;
- `CUR_DIR` parameter designates the provided folder with the configs (otherwise it will be set as the current folder);

Example execution:

```shell
./updateConfigs
```

Or

```shell
./updateConfigs path/to/folder
```

</details>

<details>
<summary>bootOptimizations</summary>
<span id='bootOptimizations'></span>

Boot optimizations I have personally done to my machine to improve boot times.

It's not intended to be executed as is, and, while it can be, it's not recommended to do so unless you understand the commands executed, as they could be harmful to do so.

An explanation of any commands contained is provided as a comment in the script.

</details>

<details>
<summary>getInstalledPackages</summary>
<span id='getInstalledPackages'></span>

Outputs a text file containing all currently installed packages, both through `pacman` and the `AUR`.

Careful when using it to reinstall packages, as it also includes distro specific packages that may not be necessary when changing distro.

- `DEST_FOLDER` parameter designates the desired folder to output the file to (otherwise it will be set as the current folder);
- `DEST_FILE` variable designated the desired text file name (and possibly extension, though that wasn't tested);

### autoGetInstalledPackages

Same as `getInstalledPackages`, but with changes to permit execution by a `systemd` service (removed prompts and unnecessary stuff).

Use with `getInstalledPackages.service` and `getInstalledPackages.timer` to automate.

### getInstalledPackages.service and getInstalledPackages.timer

Automates `getInstalledPackages` execution and executes the script once a week.
Should be placed in `/etc/systemd/system/`

```shell
/usr/bin/autoGetInstalledPackages # should be changed to whatever is your autoGetInstalledPackages script path
```

To activate the timer:

```shell
systemctl daemon-reload
sudo systemctl enable --now getInstalledPackages.timer
sudo systemctl list-timers # optional, just to check if the timer has been activated
```

</details>

<details>
<summary>globalizeScripts</summary>
<span id='globalizeScripts'></span>

Makes the selected scripts from the current directory global (copies them into `/usr/bin`), to make them executable anywhere in the system instead of only on the folder they're in.

### updateGlobalScripts

Checks if the scripts contained in the directory provided are global (exist in `/usr/bin`) and prompts the user if they should be updated.

- `CUR_DIR` parameter designates the provided folder with the scripts (otherwise it will be set as the current folder);

Example execution:

```shell
./updateGlobalScripts
```

Or

```shell
./updateGlobalScripts path/to/folder
```

</details>

<details>
<summary>open-wofi</summary>
<span id='open-wofi'></span>

Simple script to only open `wofi` if it isn't currently already open.

Intended to be used when assigned to a keybind.

</details>

<details>
<summary>prepareSystemD</summary>
<span id='prepareSystemD'></span>

Script to reinstall kernels, copied from [this tutorial when switching to systemd-boot](https://forum.endeavouros.com/t/tutorial-convert-to-systemd-boot/13290)

</details>

<details>
<summary>sortAudio</summary>
<span id='sortAudio'></span>

Sorts audio files in a folder (recursively, includes files within subfolders) into album folders and (optionally) artist folders and/or discs folders.

- The intended folder can be defined by a parameter (otherwise it's the current folder);
- The provided path can be for a directory or a file;
- Accepts only audio files (checked by MIME type);
- Additionally the files need to be properly tagged with at least the `Album` tag (and the `AlbumArtist`, `TotalDiscs` and `Discs` tags to optionally sort into artist and discs folders, respectively);
- The sorted folders can be either all moved to the root folder (the provided path) or the sorted folders can be created in the audio file's current location;

Example execution:

```shell
./sortAudio
```

Or

```shell
./sortAudio path/to/folder
```

Or

```shell
./sortAudio path/to/audio
```

</details>

<details>
<summary>sortImages</summary>
<span id='sortImages'></span>

Sorts images in a folder (recursively, includes images within subfolders) by pixel amount and exports the sorted list to text file in the current folder.

- List includes the image path, the image resolution, the image format and the pixel amount;
- The intended folder can be defined by a parameter (otherwise it's the current folder);
- If instead of a folder, a file's path is inserted, only that image's information is exported to the text file;

Example execution:

```shell
./sortImages
```

Or

```shell
./sortImages path/to/folder
```

Or

```shell
./sortImages path/to/image
```

</details>

<details>
<summary>systemCleaning</summary>
<span id='systemCleaning'></span>

Automates some of the maintenance that should be done to keep the machine 'healthy', so that only the script needs to be executed instead of the individual commands.

- Cleans the journal entries older than 4 weeks;
- Cleans pacman and yay cache and removes ALL uninstalled packages;
- Prompts the user if removing orphan packages is desired and outputs a text file with all the orphan packages found;

- `DEST_FOLDER` parameter designates the desired folder to output the file to (otherwise it will be set as the current folder);
- `DEST_FILE` variable designated the desired text file name (and possibly extension, though that wasn't tested);

### autoSystemCleaning

Same as `systemCleaning`, but with changes to permit execution by a `systemd` service (removed prompts and unnecessary stuff). Also removed orphan packages removal, as their removal could possibly be problematic and should be done carefully.

Use with `systemCleaning.service` and `systemCleaning.timer` to automate.

### systemCleaning.service and systemCleaning.timer

Automates `systemCleaning` execution and executes the script once a week.
Should be placed in `/etc/systemd/system/`

```shell
/usr/bin/autoSystemCleaning # should be changed to whatever is your autoSystemCleaning script path
```

To activate the timer:

```shell
systemctl daemon-reload
sudo systemctl enable --now systemCleaning.timer
sudo systemctl list-timers # optional, just to check if the timer has been activated
```

</details>

<details>
<summary>updateMirrorlist</summary>
<span id='updateMirrorlist'></span>

Automates updating the mirrorlists, so that only the script needs to be executed instead of the individual commands.

- Updates `Arch` mirrorlist;
- Updates `EndeavourOs` mirrorlist;
- Updates system (`yay -Syyu`);

### autoUpdateMirrorlist

Same as `updateMirrorlist`, but with changes to permit execution by a `systemd` service (removed prompts, automatically updating the system, as it could lead to problems, and other unnecessary stuff).

Use with `updateMirrorlist.service` and `updateMirrorlist.timer` to automate.

### updateMirrorlist.service and updateMirrorlist.timer

Automates `updateMirrorlist` execution and executes the script once a month.
Should be placed in `/etc/systemd/system/`

```shell
/usr/bin/autoUpdateMirrorlist # should be changed to whatever is your autoUpdateMirrorlist script path
```

To activate the timer:

```shell
systemctl daemon-reload
sudo systemctl enable --now updateMirrorlist.timer
sudo systemctl list-timers # optional, just to check if the timer has been activated
```

</details>

<details>
<summary>vdirsyncer</summary>
<span id='vdirsyncer'></span>

Automates syncing my google calendar to my locally hosted CalDAV calendar every 15 minutes.
Should be placed in `~/.config/systemd/user/`

To activate the timer:

```shell
systemctl --user daemon-reload
sudo systemctl --user enable --now updateMirrorlist.timer
sudo systemctl --user list-timers # optional, just to check if the timer has been activated
```

</details>

## Developed by

- [Leandro Pata](/en/about/)
