# README (WIP)

## Top level tech stack

- Vite
- Typescript
- React
- React Router
- Redux (toolkit)
- MaterialUI
- SCSS modules
- Vitest (inc. browser mode)
- Mock Service Worker
- Storybook
- Eslint
- i18next

## Set up musts:

[nvm](https://github.com/nvm-sh/nvm)  
Node Version Manager installs and switches uses  
On mac ensure **~/.zshrc** is correct as per NVM install instructions  
(~ = user root on mac, .zshrc is a hidden file)

[pnpm](https://pnpm.io)  
Performant npm, Install by `npm i -g pnpm`  
On mac ensure add the following to **~/.zshrc** so it has the correct pnpm path  
It also provides a command line shortcut: so can type `pn` instead of `pnpm`

```bash
export PNPM_HOME="~/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
alias pn=pnpm
```

[husky](https://typicode.github.io/husky/how-to.html#node-version-managers-and-guis)  
Git hook automations  
Because we use nvm you need let husky know where to find the node version  
On mac ensure **~/.config/husky/init.sh** with the following content

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

#### - Code Editors

[vscode](https://code.visualstudio.com/)  
Is provisioned with shared workspace settings and recommended extension, which should be installed.  
If you use other IDE it **must** have equivalent extension and pick up lint formatting configs (see .vscode folder)  
_The IDE should lint as you write and auto-fix on save_  
**Please avoid in browser editor (e.g github)**  
you are expected to install and work locally with this repo

---

## Quick Start

```bash
pnpm i          # Installs node_modules
pnpm dev        # Start localhost dev
pnpm dev-sb     # Start storybook dev
pnpm test       # Run all tests with coverage
pnpm test-fn    # Run all functional tests (add path or file name to run just one)
pnpm test-sb    # Run all storybook tests (add path or file name to run just one)
pnpm build      # Compile production build
pnpm start      # Start localhost for pre-built production build
pnpm lint       # lint everything (husky should lint just changed files on git commit)
```

See package.json scripts for more.

---

## About files

React component TSX files are about display markup and component composition.  
**Always look to relocate functional code to at least a component helper TS file.**  
If abstract and reusable consider if worth elevating further maybe hooks or utils?

**This is a very important separation of concern.**  
It helps make code easier to read, test, reuse, debug and maintain

#### - Styling

Current WIP is using SCSS modules, and SCSS itself only minimally, generally use CSS vars.

More detail TBC !  
Suffice to say there should no css **values** in TS/TSX, only **classes**

#### - Testing

- **.tsx** components have namesake **".stories.tsx"**
- **.ts** have namesake **".test.ts"**
- **Node (js/ts)** scripts have namesake **".spec.ts"**

More detail in testing section below.

#### - Naming

- PascalCase for **.tsx**
- camelCase for **.ts**

```
Comp.tsx
Comp.stories.tsx
comp.helper.ts
comp.helper.test.ts
comp.module.scss
```

Additionally its good practice to separate items such as **types** and **string constants** from TSX to own files,  
Particularly where they are exported for use elsewhere or when you have more than just a couple internals.

```
comp.const.ts
comp.type.ts
```

---

## Testing

#### Display components (Comp.stories.tsx)

These allow visual component development in isolation in storybook environment.  
These test also run on command line and in a **headless browser environment**.

#### Typescript functions (file.test.ts)

Here we are testing function logic, input, output,  
I.E. there should not be anything directly requiring display to be tested.  
This is Front-end code so test files run in a **JSDOM emulated browser environment**.  
This environment is significantly more effient than running in actual browser.

#### Node scripts (file.spec.ts)

These are used for node based scripts and are run in a **node environment**.  
Node scripts are either code for the build system itself or other that would run on the server
