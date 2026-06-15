import chalk from "chalk";
import { type SelectOptions } from "@clack/prompts";

export const availableFrameworks: SelectOptions<string>["options"] = [
  {
    label: chalk.gray("react"),
    value: "react",
    hint: "recommended",
  },
  {
    label: chalk.gray("vue"),
    value: "vue",
  },
];

export const availableMetaReactFrameworks: SelectOptions<string>["options"] = [
  {
    label: chalk.gray("next"),
    value: "next",
  },
  {
    label: chalk.gray("vite-react"),
    value: "vite-react",
    hint: "recommended",
  },
];

export const availableMetaVueFrameworks: SelectOptions<string>["options"] = [
  {
    label: chalk.gray("nuxt"),
    value: "nuxt",
  },
  {
    label: chalk.gray("vite-vue"),
    value: "vite-vue",
  },
];
