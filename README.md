# abbot-cli

A minimal, interactive Node.js CLI for scaffolding new frontend projects. Pick a framework, meta-framework, UI library, and tooling through a guided prompt flow, and `abbot-cli` clones the matching template and installs dependencies for you.

## Features

- Interactive prompts powered by [`@clack/prompts`](https://github.com/bombshell-dev/clack)
- Framework selection: **React** or **Vue**
- Meta-framework selection: **Next** / **Vite (React)** or **Nuxt** / **Vite (Vue)**
- UI library selection (e.g. Ant Design, Vuetify, or none)
- Optional additional tooling: ESLint, Prettier, Cursor skills, Cursor rules
- Custom import aliases
- Package manager of choice: **npm**, **yarn**, **pnpm**, or **bun**
- Optional automatic dependency installation
- Clear, colorized output with next-step guidance

## Requirements

- [Node.js](https://nodejs.org/) (with TypeScript-capable runtime support)
- [pnpm](https://pnpm.io/) `11.5.1` (the project's package manager)
- [git](https://git-scm.com/) (templates are cloned via `git clone`)

## Installation

```bash
pnpm install
```

## Usage

### Development (run directly from `src/`)

```bash
pnpm start init <project-name>
```

This runs the CLI without building, using the alias loader.

### Build & run

```bash
pnpm build
node dist/index.js init <project-name>
```

After building, the `abbot-cli` binary (defined in `package.json`) points to `dist/index.js`.

### Example

```bash
pnpm start init my-app
```

You'll be guided through prompts:

1. **Project path** — where to create the project (e.g. `./my-app`)
2. **Package manager** — npm / yarn / pnpm / bun
3. **Framework** — react / vue
4. **Meta-framework** — next / vite-react (React) or nuxt / vite-vue (Vue)
5. **Import aliases** — optional custom aliases (e.g. `@/~`)
6. **UI library** — depends on chosen framework
7. **Additional tools** — eslint, prettier, cursor skills, cursor rules
8. **Install dependencies** — confirm automatic install

Once complete, the selected template is cloned, dependencies are (optionally) installed, and next steps are printed:

```bash
cd <project-path>
<package-manager> dev
```

## Scripts

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `pnpm start`      | Run the CLI directly from `src/` (no build)      |
| `pnpm build`      | Compile TypeScript and resolve path aliases      |
| `pnpm typecheck`  | Type-check without emitting output               |
| `pnpm lint`       | Lint the project with ESLint                     |
| `pnpm lint:fix`   | Lint and auto-fix issues                         |

## Project structure

```
src/
├── index.ts            # CLI entry point, registers commands (commander)
├── actions/            # Orchestrate prompts in sequence, return a results object
│   └── init-action.ts
├── prompts/            # One function per @clack/prompts call
│   └── init-prompt.ts
├── choices/            # Typed static option arrays for prompts
│   ├── frameworks.ts
│   ├── UIs.ts
│   ├── packages.ts
│   └── additionalTools.ts
├── constants/          # Repo URLs and path helpers
│   ├── repo.ts
│   └── path.ts
└── helper/             # Shared utilities
    ├── command.ts      # Shell command wrappers (clone, install, mkdir)
    ├── cancel.ts       # ifCancel wrapper for clean prompt cancellation
    ├── displayResult.ts
    └── file.ts
```

Imports use the `@/` alias for `src/`.

## Tech stack

- [commander](https://github.com/tj/commander.js) — command parsing
- [@clack/prompts](https://github.com/bombshell-dev/clack) — interactive prompts
- [chalk](https://github.com/chalk/chalk) — terminal styling
- [pathe](https://github.com/unjs/pathe) — cross-platform path utilities
- [TypeScript](https://www.typescriptlang.org/) + [ESLint](https://eslint.org/)

## License

[MIT](./LICENSE)
