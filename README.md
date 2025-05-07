# README (WIP)

## Set up musts:

[nvm](https://github.com/nvm-sh/nvm)  
Manages node version installs and switch uses  
On mac ensure **~/.zshrc** is correct as per NVM install instructions  
(~ = user root on mac, .zshrc is a hidden file)

[pnpm](https://pnpm.io)  
Install by `npm i -g pnpm`  
On mac ensure add the following to **~/.zshrc** so it has the correct pnpm path  
It also provides a command line shortcut: so can type **'pn'** instead of 'pnpm'

```bash
export PNPM_HOME="~/Library/pnpm"
export PATH="$PNPM_HOME:$PATH"
alias pn=pnpm
```

[husky](https://typicode.github.io/husky/how-to.html#node-version-managers-and-guis)  
Because we use nvm you need let husky know where to find the node version  
On mac ensure **~/.config/husky/init.sh** with the following content

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

---

## Quick Start

```bash
pn i          # Installs node_modules
pn dev        # Start localhost dev
pn dev-sb     # Start storybook dev
pn test       # Run all tests with coverage
pn test-fn    # Run all functional tests (add path or file name to run just one)
pn test-sb    # Run all storybook tests (add path or file name to run just one)
pn build      # Compile production build
pn start      # Start localhost for pre-built production build
```

See package.json scripts for more.

---

## About files

React component TSX files are primarily for display.  
Always remove functional code to at least a component helper TS file.  
If abstract and reusable consider if worth elevating further maybe hooks or utils?

This is a very important separation of concern,  
and helps make code easier to read, test, debug and maintain

TSX have **".stories.tsx"** storybook test that run in a headless browser environment.  
TS have **".test.ts"** files that in a JSDOM emulated browser environment.

There is a 3rd test file type **".spec.ts"**  
These are used for node based scripts and are run in a node environment.  
They are either code for the build system itself or other that would run on the server

PascalCase for TSX  
camelCase for TS

```
Comp.tsx
Comp.stories.tsx
comp.helper.ts
comp.helper.test.ts
```

Additionally its good practice to separate **types** and **string constants** from TSX to own files,  
Particularly where they are exported for external use or when you have more than just a couple internals.

```
comp.const.ts
comp.type.ts
```
