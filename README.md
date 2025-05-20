# SB Vitest

Configurable component based application aiming to support multiple industry domains.  
Objective to provide tailored UI based on industry characteristic need.

## Top level tech stack

- Typescript, Eslint,
- Vite, Vitest,
- Storybook, Mock Service Worker
- React, React Router, Redux (RTK),
- MaterialUI, Tailwind,
- i18next, axios

## Setting up:

[nvm](https://github.com/nvm-sh/nvm)  
Node Version Manager installs and switches node  
On mac ensure **~/.zshrc** is correct as per NVM install instructions  
(~ = user root on mac, .zshrc is a hidden file)

[pnpm](https://pnpm.io)  
Performant npm, Install by `npm i -g pnpm`  
On mac ensure add the following to **~/.zshrc** so it has the correct pnpm path  
It also provides a command line shortcut: so can type `pn` instead of `pnpm`  
_note. workspace relies on pnpm so do not try use npm or yarn_

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

#### Code Editors (IDE)

[vscode](https://code.visualstudio.com/)  
Is provisioned with shared workspace settings and recommended extension which should be installed.  
If you use other IDE it **must** have equivalent extension that pick up formatting configs (see .vscode folder)  
_The IDE should lint as you write and auto-fix on save_  
**Please avoid in browser editor (e.g github)**  
You are expected to install and work locally with this repo

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

#### - Styles

Styling is via Tailwind.
More details in styling section below

#### - Testing

- **.tsx** components have namesake **".stories.tsx"**
- **.ts** have namesake **".test.ts"**
- **Node (js/ts)** scripts have namesake **".spec.ts"**

More detail in testing section below.

#### - Naming

- PascalCase for **.tsx**
- camelCase for **.ts** and all others

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

## Styling

Styling is via Tailwind, which has been configured to use/follow MUI theme variables.

- It is expected we only ever need Tailwind utility classes.

- Do not use styled components or similar CSS-in-JS methodologies

- There should no style **values** in TS/TSX, only **classes**  
  Scripts should almost always only ever need switch classes

**The following style method are frowned on and will create ESlint errors!**

- Mui's **sx** prop
- The standard inline **style** prop

Tailwind class strings can famously get lengthy!  
There are 2 solutions to this:

- Highly modular/granular components keep the amount of markup per file small and targetted.
- Utility [clsx](https://github.com/lukeed/clsx) is included if you need more advance class injection  
  Simply clsx merges multiple strings into one,  
  meaning classes can be logically separated into easy read groups

#### Initial setup allows for SCSS modules!

**WARNING** avoid if possible, current plan is to remove if proven has little/no use.  
For now the setup is there as failover.  
If used the use of SCSS language features should be very minimal.  
I.E. there are a few global helpers, but generally there should be little need for additional complex SCSS functions and mixins  
_Remember theme var are available via css variables_

Use SCSS as:

```ts
import styles from "./comp.modules.scss";
<div className={styles.myClass} />
<div className={styles["my-class"]} />
```

---

## Testing

#### Display components (Comp.stories.tsx)

These allow visual component development in isolation in storybook environment.  
These test also run on command line in a **headless browser environment**.

#### Typescript functions (file.test.ts)

Here we are testing function logic, input, output,  
I.E. there should not be anything directly requiring display to be tested.  
This is Front-end code so test files run in a **JSDOM emulated browser environment**.  
This environment is significantly more effient for testing than running in actual browser.

#### Node scripts (file.spec.ts)

These are used for node based scripts and are run in a **node environment**.  
Node scripts are either code for the build system itself or other that would run on the server

#### Mock Service Worker (MSW)

Handlers are created to intercept actual API calls,  
This will then return mock data  
Additional scenarios can also be mocked, i.e. different data-sets, error states.
