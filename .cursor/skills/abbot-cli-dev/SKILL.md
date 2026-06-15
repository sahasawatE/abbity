---
name: abbot-cli-dev
description: Develop and extend the abbot-cli scaffolding tool, a commander + @clack/prompts CLI that initializes frontend projects. Use when adding commands, prompts, choices, or actions, or when editing files under src/ in the abbot-cli project.
disable-model-invocation: true
---

# abbot-cli Development

`abbot-cli` is a Node CLI that scaffolds frontend projects. It uses `commander` for command parsing and `@clack/prompts` for interactive prompts, styled with `chalk`. The project is ESM (`"type": "module"`) and uses **pnpm**.

## Architecture

The code is layered. Adding a user-facing option flows through these directories in order:

| Layer | Path | Responsibility |
|-------|------|----------------|
| Choices | `src/choices/` | Static option arrays for select/multiselect prompts |
| Prompts | `src/prompts/` | Wrap a single `@clack/prompts` call, return the answer |
| Actions | `src/actions/` | Orchestrate prompts in sequence, return a results object |
| Entry | `src/index.ts` | Register commands with `commander`, call the action |
| Helper | `src/helper/` | Shared utilities (e.g. `ifCancel`) |

Imports use the `@/` alias mapped to `src/`. At runtime (`pnpm start`) the alias is resolved by `scripts/alias-loader.mjs`; at build time `tsc-alias` rewrites it in `dist/`.

## Conventions

- **Always wrap prompts in `ifCancel(...)`** so cancellation exits cleanly. Every prompt function returns `ifCancel(<clack prompt>)`.
- **Style every message with `chalk`** — `chalk.gray(...)` for normal prompts, `chalk.yellowBright(...)` for emphasized input.
- **Choices use typed arrays**: `SelectOptions<string>["options"]` for `select`, `MultiSelectOptions<string>["options"]` for `multiselect`. Each option is `{ label: chalk.gray("..."), value: "...", hint?: "..." }`. Mark a default with `hint: "recommended"`.
- **Prompt functions are `async` and exported** from `src/prompts/init-prompt.ts`.
- **Actions await prompts top-to-bottom** and return a single object keyed by option name.

## Adding a new prompt option

1. Add the choice array to a file in `src/choices/` (skip if it's free text or a confirm).
2. Add an exported `async` prompt function in `src/prompts/init-prompt.ts` wrapping the clack call in `ifCancel(...)`.
3. Await it in the relevant action in `src/actions/` and add the value to the returned object.
4. If it's a new command, register it in `src/index.ts` with `.command()`, `.description()`, `.argument()`, and `.action()`.

## Example: select prompt

Choice (`src/choices/frameworks.ts`):

```typescript
import chalk from "chalk";
import { type SelectOptions } from "@clack/prompts";

export const availableFrameworks: SelectOptions<string>["options"] = [
  { label: chalk.gray("react"), value: "react", hint: "recommended" },
  { label: chalk.gray("vue"), value: "vue" },
];
```

Prompt (`src/prompts/init-prompt.ts`):

```typescript
export async function selectFramework() {
  return ifCancel(
    select({
      message: chalk.gray("Select a framework"),
      options: availableFrameworks,
    }),
  );
}
```

## Validating changes

After edits, run:

```bash
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint . (pnpm lint:fix to auto-fix)
```

To try the CLI manually (runs src/ directly, no build needed):

```bash
pnpm start new my-app
```

`pnpm build` (`tsc && tsc-alias`) emits the publishable CLI to `dist/`.
