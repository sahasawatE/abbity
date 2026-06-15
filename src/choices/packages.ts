import chalk from "chalk";
import { type SelectOptions } from "@clack/prompts";

export const availablePackageManagers: SelectOptions<string>["options"] = [
  {
    label: chalk.gray("npm"),
    value: "npm",
  },
  {
    label: chalk.gray("yarn"),
    value: "yarn",
  },
  {
    label: chalk.gray("pnpm"),
    value: "pnpm",
    hint: "recommended",
  },
  {
    label: chalk.gray("bun"),
    value: "bun",
  },
];
