# abbity

A minimal, interactive Node.js CLI for scaffolding new frontend projects. Pick a framework, meta-framework, UI library, and tooling through a guided prompt flow, and `abbity` clones the matching template and installs dependencies for you.

---

# For Users

This section is for anyone who wants to **use** `abbity` to bootstrap a new frontend project.

## What is abbity for?

`abbity` saves you from manually setting up a frontend project from scratch. Instead of cloning a starter, wiring up tooling, and configuring aliases by hand, you answer a few interactive prompts and `abbity` does the rest:

- Choose your **framework**: React or Vue
- Choose your **meta-framework**: Next / Vite (React) or Nuxt / Vite (Vue)
- Pick a **UI library** (e.g. Ant Design, Vuetify, or none)
- Add optional **tooling**: ESLint, Prettier, Cursor skills, Cursor rules (ESLint and Prettier are selected by default)
- Set custom **import aliases**
- Pick your **package manager**: npm, yarn, pnpm, or bun

It then clones the matching template, installs dependencies, and configures your selected tooling (e.g. ESLint config + dependencies, a `.prettierrc` file), then prints clear next steps.

## Requirements

- [Node.js](https://nodejs.org/) `>=24.0.0`
- [git](https://git-scm.com/) (templates are cloned via `git clone`)

## Installation

Install globally with your package manager of choice:

```bash
npm install -g abbity
# or
pnpm add -g abbity
# or
yarn global add abbity
# or
bun add -g abbity
```

You can also run it without installing using `npx`:

```bash
npx abbity init <project-name>
```

## Usage

Create a new project:

```bash
abbity init my-app
```

You'll be guided through prompts:

1. **Project path** — where to create the project (e.g. `./my-app`)
2. **Package manager** — npm / yarn / pnpm / bun
3. **Framework** — react / vue
4. **Meta-framework** — next / vite-react (React) or nuxt / vite-vue (Vue)
5. **Import aliases** — optional custom aliases (e.g. `@/~`)
6. **UI library** — depends on chosen framework
7. **Additional tools** — eslint, prettier, cursor skills, cursor rules (eslint and prettier selected by default)

Once complete, the selected template is cloned, dependencies are installed, the chosen tooling is configured, and next steps are printed:

```bash
cd <project-path>
<package-manager> dev
```

---

# For Developers

This section is for anyone who wants to **contribute to** or **maintain** `abbity`.

## Requirements

- [Node.js](https://nodejs.org/) `>=24.0.0` (with TypeScript-capable runtime support)
- [pnpm](https://pnpm.io/) `11.5.1` (the project's package manager)
- [git](https://git-scm.com/)

## Installation

Clone the repo and install dependencies:

```bash
git clone https://github.com/sahasawatE/abbity
cd abbity
pnpm install
```

## Running locally

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

After building, the `abbity` binary (defined in `package.json`) points to `dist/index.js`.

## Scripts

| Script           | Description                                 |
| ---------------- | ------------------------------------------- |
| `pnpm start`     | Run the CLI directly from `src/` (no build) |
| `pnpm build`     | Compile TypeScript and resolve path aliases |
| `pnpm typecheck` | Type-check without emitting output          |
| `pnpm lint`      | Lint the project with ESLint                |
| `pnpm lint:fix`  | Lint and auto-fix issues                    |

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

## Architecture & layers

The CLI is layered. Data flows in this order:

- **`src/choices/`** — typed static option arrays for prompts
- **`src/prompts/`** — one exported `async` function per `@clack/prompts` call
- **`src/actions/`** — orchestrate prompts in sequence, return one results object
- **`src/index.ts`** — register commands with `commander`
- **`src/helper/`** — shared utilities (e.g. `ifCancel`)

## Conventions & rules

- **Always** wrap every prompt in `ifCancel(...)` so cancellation exits cleanly.
- Style every message with `chalk`: `chalk.gray(...)` for normal text, `chalk.yellowBright(...)` for emphasized input.
- Type choice arrays as `SelectOptions<string>["options"]` or `MultiSelectOptions<string>["options"]`. Each option is `{ label: chalk.gray("..."), value: "...", hint?: "..." }`; mark defaults with `hint: "recommended"`.
- Imports use the `@/` alias for `src/`.
- After changes, validate with `pnpm typecheck` and `pnpm lint`. Test manually with `pnpm start init <name>` (runs `src/` directly, no build).

```typescript
// ✅ GOOD — prompt wrapped in ifCancel, styled message
export async function selectFramework() {
  return ifCancel(
    select({
      message: chalk.gray("Select a framework"),
      options: availableFrameworks,
    }),
  );
}

// ❌ BAD — raw prompt, no cancel handling, unstyled
export async function selectFramework() {
  return select({ message: "Select a framework", options: availableFrameworks });
}
```

## Tech stack

- [commander](https://github.com/tj/commander.js) — command parsing
- [@clack/prompts](https://github.com/bombshell-dev/clack) — interactive prompts
- [chalk](https://github.com/chalk/chalk) — terminal styling
- [pathe](https://github.com/unjs/pathe) — cross-platform path utilities
- [TypeScript](https://www.typescriptlang.org/) + [ESLint](https://eslint.org/)

## License

[MIT](./LICENSE)
