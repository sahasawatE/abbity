import chalk from "chalk";
import { select, text, multiselect } from "@clack/prompts";
import {
  availableFrameworks,
  availableMetaReactFrameworks,
  availableMetaVueFrameworks,
} from "@/choices/frameworks";
import { availableReactUIs, availableVueUIs } from "@/choices/UIs";
import { availableAdditionalTools } from "@/choices/additionalTools";
import { ifCancel } from "@/helper/cancel";
import { availablePackageManagers } from "@/choices/packages";

export async function inputProjectPath(projectName: string) {
  // Must be explicit relative notation: ".", "./", or "./some/path" (also allows "..", "../some/path")
  const relativePathPattern = /^\.\.?(\/[^\0]*)?$/;

  return ifCancel(
    text({
      message: chalk.yellowBright("Enter the path to the project"),
      initialValue: `./${projectName}`,
      validate: (value) => {
        const trimmed = value?.trim() ?? "";
        if (trimmed === "") {
          return "Path is required";
        }
        if (!relativePathPattern.test(trimmed)) {
          return `Path must start with ./ (e.g. ., ./, or ./${projectName})`;
        }
        return undefined;
      },
    }),
  );
}

export async function selectPackageManager() {
  return ifCancel(
    select({
      message: chalk.gray("Select a package manager"),
      options: availablePackageManagers,
    }),
  );
}

export async function selectFramework() {
  return ifCancel(
    select({
      message: chalk.gray("Select a framework"),
      options: availableFrameworks,
    }),
  );
}

export async function selectMetaFramework(framework: string | symbol) {
  if (framework === "react") {
    return ifCancel(
      select({
        message: chalk.gray("Select a react framework"),
        options: availableMetaReactFrameworks,
      }),
    );
  }
  return ifCancel(
    select({
      message: chalk.gray("Select a vue framework"),
      options: availableMetaVueFrameworks,
    }),
  );
}

export async function selectUI(framework: string | symbol) {
  if (framework === "react") {
    return ifCancel(
      select({
        message: chalk.gray("Select a react UI"),
        options: availableReactUIs,
      }),
    );
  }
  return ifCancel(
    select({
      message: chalk.gray("Select a vue UI"),
      options: availableVueUIs,
    }),
  );
}

export async function selectAdditionalTools() {
  return ifCancel(
    multiselect({
      message: chalk.gray("Select additional tools"),
      options: availableAdditionalTools,
      initialValues: ["eslint", "prettier"],
      required: false,
    }),
  );
}
