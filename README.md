![Maintained][maintained-badge] [![Make a pull request][prs-badge]][prs]
[![License][license-badge]](LICENSE.md)

[![Linux Build][linux-build-badge]][linux-build]
[![MacOS Build][macos-build-badge]][macos-build]
[![Windows Build][windows-build-badge]][windows-build]

<br />

<p align="center">
  <img src="https://www.vectorlogo.zone/logos/angular/angular-icon.svg" alt="Logo" width="80" height="80">
  <img src="https://www.vectorlogo.zone/logos/electronjs/electronjs-icon.svg" alt="Logo" width="80" height="80">
</p>

<h2 align="center">Yahoo Finance Desktop Client</h3>

<div align="center">
  <p>A desktop client to query stock data from Yahoo Finance.</p>
  <p><em>Bootstrapped and packaged with Angular 11 and Electron 12.</em></p>
  <br />
  <a href="https://github.com/nishant/stock-desktop/labels/bug">Report Bug</a>
  ·
  <a href="https://github.com/nishant/stock-desktop/issues">Request Feature</a>
</div>

<br>
<br>
<br>

<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#building-for-development">Building for Development</a></li>
    <li><a href="#running-in-browser-mode">Running in Browser Mode</a></li>
    <li><a href="#using-electron--nodejs-libraries">Using Electron / NodeJS Libraries</a></li>
    <li><a href="#using-third-party-libraries-material-bootstrap-etc">Using Third Party Libraries</a></li>
    <li><a href="#using-specific-libraries-in-electron-main-thread-rxjs-ngrx-etc">Using Specific Libraries in Electron Main Thread</a></li>
    <li><a href="#included-commands">Included Commands</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ul>
</details>

<br>

## Introduction

A desktop client to query stock data from Yahoo Finance, bootstrapped and
packaged with Angular 11 and Electron 12.

Currently runs with:

- Angular v11
- Electron v12
- Electron Builder v22

This application can be:

- Run in a local development environment with Electron & Hot reload
  - _Hot reload only pertains to the renderer process. The main electron process
    is not able to be hot reloaded, only restarted._
- Run in a production environment
- Packaged into an executable for Linux, Windows & Mac

Note: _Angular 11.x CLI needs Node 10.13 or later to work correctly._

<br>

## Getting Started

Clone this repository locally:

```bash
git clone https://github.com/nishant/stock-desktop.git
```

Install dependencies with npm:

```bash
npm install
```

There is an issue with `yarn` and `node_modules` when the application is built
by the packager. Use `npm` as dependencies manager.

If you want to generate Angular components with Angular CLI , you **MUST**
install `@angular/cli` in npm global context. Follow Angular's
[documentation](https://github.com/angular/angular-cli) if you had installed a
previous version of `angular-cli`.

```bash
npm install -g @angular/cli
```

<br>

## Building for Development

Run the start script to use the application local development environment with
hot reload.

```bash
npm start
```

The application code is managed by `main.ts`. The app runs with a simple Angular
App (http://localhost:4200) and an Electron window.

You can disable "Developer Tools" by setting the boolean flag `openDevTools` to
`false` in `main.ts`.

<br>

## Running in Browser Mode

To execute the application in the browser with hot reload, run
`npm run ng:serve:web`.

Alternatively, the application can still run in-browser at
https://localhost:4200 even when `npm start` is used.

<br>

## Using Electron / NodeJS Libraries

This project runs in both web and desktop mode. To make this work, **you have to
import your dependencies the right way**.

Check `providers/electron.service.ts` to see how to conditionally import
libraries when using electron / NodeJS / 3rd party libraries in renderer context
(i.e. Angular).

<br>

## Using Third Party Libraries (Material, Bootstrap, etc)

3rd party libraries used in electron's renderer process (like angular material)
have to be added in `devDependencies` of `package.json`.

They are already added in the final package during webpack's compilation phase.
Otherwise, it will significantly increase the size of your final package.

<br>

## Using Specific Libraries in Electron Main Thread (rxjs, ngrx, etc)

Import your library in npm dependencies section (**not** devDependencies) with
`npm install --save`.

It will be loaded by electron during the build phase and added to your final
package.

Use your library by importing it in `main.ts`.

<br>

## Included Commands

| Command                  | Description                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `npm run start`          | Execute the app in the desktop and browser                                                                 |
| `npm run ng:serve`       | Execute the app in the browser                                                                             |
| `npm run build`          | Build the app. Built files are located in the /dist folder                                                 |
| `npm run build:dev`      | Build the app for the development environment. Built files are located in the /dist folder                 |
| `npm run build:prod`     | Build the app for the production environment with Angular AOT. Built files are located in the /dist folder |
| `npm run electron:local` | Builds your application and start electron                                                                 |
| `npm run electron:build` | Builds your application and creates an app consumable based on your operating system                       |
| `npm run test`           | Execute the unit tests                                                                                     |
| `npm run e2e`            | Execute the end-to-end tests                                                                               |
| `npm run lint`           | Run the linter                                                                                             |

The application is optimized. Only the /dist folder and node dependencies are
included in the executable.

<br>

## Roadmap

See the [open issues](https://github.com/nishant/stock-desktop/issues) for a
list of proposed features and known issues.

<br>

## Contributing

If you have any feature ideas, feel free to contribute by following these steps.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/MyAwesomeFeature`)
3. Commit your Changes (`git commit -m 'Added MyAwesomeFeature'`)
4. Push to the Branch (`git push origin feature/MyAwesomeFeature`)
5. Open a Pull Request

<br>
<br>
<br>

[maintained-badge]:
  https://img.shields.io/badge/maintained-yes-brightgreen?style=for-the-badge
[license-badge]:
  https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge
[license]: https://github.com/nishant/stock-desktop/blob/master/LICENSE.md
[prs-badge]:
  https://img.shields.io/badge/PRs-welcome-red.svg?style=for-the-badge
[prs]: https://github.com/nishant/stock-desktop/pulls
[linux-build-badge]:
  https://img.shields.io/badge/Linux%20Build-Pass-brightgreen?style=for-the-badge
[linux-build]:
  https://github.com/nishant/stock-desktop/actions?query=workflow%3A%22Linux+Build%22
[macos-build-badge]:
  https://img.shields.io/badge/MacOS%20Build-Pass-brightgreen?style=for-the-badge
[macos-build]:
  https://github.com/nishant/stock-desktop/actions?query=workflow%3A%22MacOS+Build%22
[windows-build-badge]:
  https://img.shields.io/badge/Windows%20Build-Pass-brightgreen?style=for-the-badge
[windows-build]:
  https://github.com/nishant/stock-desktop/actions?query=workflow%3A%22Windows+Build%22
