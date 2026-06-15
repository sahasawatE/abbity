#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { intro, outro, tasks, note, cancel } from "@clack/prompts";
import { initAction } from "@/actions/init-action";
import {
  cloneTemplate,
  createFolder,
  installDependencies,
} from "@/helper/command";
import { displayResult } from "@/helper/displayResult";

const abbot = new Command();

abbot
  .name("abbot-cli")
  .description("CLI to initialize a new frontend project")
  .version("0.0.1");

abbot
  .command("init")
  .description("Initialize a new Abbot project")
  .argument("<name>", "Name of the project to initialize")
  .action(async (name) => {
    intro(
      chalk.blueBright(
        `🚀 Creating a new Abbot project called ${chalk.bold(name)}`,
      ),
    );

    // action
    const results = await initAction(name);

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

    if (results.installDependencies) {
      await tasks([
        {
          title: "Installing dependencies",
          task: async () => {
            try {
              await installDependencies(results.packageManager);
              return chalk.cyan("✅ Installed dependencies successfully");
            } catch (error) {
              cancel(`${error}`);
              process.exit(1);
            }
          },
        },
      ]);
    }

    note(
      displayResult(results.packageManager, results.projectPath),
      chalk.cyanBright("Next steps"),
      {
        format: (line) => `→ ${line}`,
      },
    );

    outro(
      chalk.green(
        `🎉 Project created successfully with ${chalk.bold(results.packageManager)}`,
      ),
    );
  });

abbot.parse();
