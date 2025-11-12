---
title: Build from source
description: This guide will help you build the Eko browser extension.
---

If you
- encounter compatibility issues during installation;
- want to contribute to this project;
- think compiling projects is cool.

Then this document will teach you how to compile the Eko browser extension from source code. Don't worry, it's all very simple.

## Prerequisites

- You need to [install Git](https://git-scm.com/downloads), a distributed version control system, which we use to fetch and manage source code.
- You need to [install the Node.js environment](https://nodejs.org/en/download), because Eko and the Eko browser extension are written in JavaScript/TypeScript and need to be compiled in this environment.
- You also need to [install pnpm](https://pnpm.io/installation), an efficient package management tool, which we will use to install dependencies and compile code.

## Compiling the Eko Framework

1. Clone the code repository to your local machine: `git clone https://github.com/FellouAI/eko`.
2. Enter the `eko` directory: `cd eko`.
3. Switch to the branch you want, `git checkout main` for general users, and `git checkout develop` for developers.
4. Install dependencies using pnpm: `pnpm install`.
5. Link the `eko` dependency globally for reference later: `pnpm link -g`.
6. Compile the Eko framework: `pnpm run build`.

## Compiling the Eko Browser Extension

1. Clone the code repository to your local machine: `git clone https://github.com/FellouAI/eko-browser-extension-template`.
2. Enter the `eko-browser-extension-template` directory.
3. Switch to the branch you want.
4. Install dependencies using pnpm: `pnpm install`.
5. Link the `eko` dependency to the current directory: `pnpm link @eko-ai/eko -g`.
6. Compile the Eko browser extension: `pnpm run build`.
7. You can find the compiled output in the `dist` directory.