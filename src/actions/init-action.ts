import chalk from "chalk";
import { cancel, tasks } from "@clack/prompts";
import { join } from "pathe";
import {
  selectFramework,
  selectMetaFramework,
  selectUI,
  selectAdditionalTools,
  inputImportAliases,
  inputProjectPath,
  selectPackageManager,
} from "@/prompts/init-prompt";
import {
  cloneTemplate,
  createFolder,
  installDependencies,
  installEslintDependencies,
} from "@/helper/command";
import { createPrettierConfig, replaceEslintConfig } from "@/helper/file";

export type InitResults = Awaited<ReturnType<typeof askingQuestionsInit>>;

export async function askingQuestionsInit(projectName: string) {
  const projectPath = await inputProjectPath(projectName);
  const packageManager = await selectPackageManager();
  const framework = await selectFramework();
  const metaFramework = await selectMetaFramework(framework);
  const importAliases = await inputImportAliases();
  const ui = await selectUI(framework);
  const additionalTools = await selectAdditionalTools();

  return {
    projectPath,
    packageManager,
    framework,
    metaFramework,
    importAliases,
    ui,
    additionalTools,
  };
}

export async function initializingAction(results: InitResults): Promise<void> {
  await tasks([
    {
      title: "Initializing project",
      task: async () => {
        try {
          await createFolder(results.projectPath);
          await cloneTemplate(results.ui, results.projectPath);
          return chalk.cyan("✅ Cloned template successfully");
        } catch (error) {
          cancel(`${error}`);
          process.exit(1);
        }
      },
    },
  ]);

  await tasks([
    {
      title: "Installing dependencies",
      task: async () => {
        try {
          await installDependencies(
            results.packageManager,
            results.projectPath,
          );
          return chalk.cyan("✅ Installed dependencies successfully");
        } catch (error) {
          cancel(`${error}`);
          process.exit(1);
        }
      },
    },
  ]);

  if (results.additionalTools.includes("eslint")) {
    const eslintTemplate = "https://gitlabsvr.abbot.tech/module/eslint.git";

    await tasks([
      {
        title: "Installing ESLint dependencies and configuring",
        task: async () => {
          try {
            await installEslintDependencies(
              results.packageManager,
              results.projectPath,
            );
            await cloneTemplate(
              eslintTemplate,
              join(results.projectPath, "eslint"),
            );
            replaceEslintConfig(results.projectPath);
            return chalk.cyan(
              "✅ ESLint dependencies and configured successfully",
            );
          } catch (error) {
            cancel(`${error}`);
            process.exit(1);
          }
        },
      },
    ]);
  }

  if (results.additionalTools.includes("prettier")) {
    await tasks([
      {
        title: "Configuring Prettier",
        task: async () => {
          try {
            createPrettierConfig(results.projectPath);
            return chalk.cyan("✅ Prettier configured successfully");
          } catch (error) {
            cancel(`${error}`);
            process.exit(1);
          }
        },
      },
    ]);
  }
}
