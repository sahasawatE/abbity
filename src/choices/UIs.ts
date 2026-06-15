import chalk from "chalk";
import { type SelectOptions } from "@clack/prompts";
import { REPO_URL } from "@/constants/repo";

export const availableReactUIs: SelectOptions<string>["options"] = [
  // {
  //   label: chalk.gray("shadcn/ui"),
  //   value: "shadcn/ui",
  // },
  // {
  //   label: chalk.gray("material-ui"),
  //   value: "material-ui",
  // },
  // {
  //   label: chalk.gray("headlessui"),
  //   value: "headlessui",
  // },
  {
    label: chalk.gray("ant-design"),
    value: REPO_URL.react.vite.antd,
    hint: "recommended",
  },
  {
    label: chalk.gray("none"),
    value: REPO_URL.react.vite.none,
  },
];

export const availableVueUIs: SelectOptions<string>["options"] = [
  {
    label: chalk.gray("vuetify"),
    value: "vuetify",
    hint: "recommended",
  },
  {
    label: chalk.gray("ant-design"),
    value: "ant-design",
  },
  {
    label: chalk.gray("none"),
    value: "none",
  },
];
