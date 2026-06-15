import chalk from "chalk";
import { type MultiSelectOptions } from "@clack/prompts";

export const availableAdditionalTools: MultiSelectOptions<string>["options"] = [
  {
    label: chalk.gray("eslint"),
    value: "eslint",
    hint: "recommended",
  },
  {
    label: chalk.gray("prettier"),
    value: "prettier",
    hint: "recommended",
  },
  {
    label: chalk.gray("cursor skills"),
    value: "cursor-skills",
    hint: "recommended for cursor",
  },
  {
    label: chalk.gray("cursor rules"),
    value: "cursor-rules",
    hint: "recommended for cursor",
  },
];
