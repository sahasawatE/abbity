#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { intro, outro, note, box, spinner } from "@clack/prompts";
import {
  askingQuestionsInit,
  initializingAction,
  type InitResults,
} from "@/actions/init-action";
import { displayResult } from "@/helper/displayResult";
import {
  LOCAL_VERSION,
  getLatestVersion,
  isNewerVersion,
} from "@/helper/version";

const abbity = new Command();

abbity
  .name("abbity")
  .description("CLI to initialize a new frontend project")
  .version(LOCAL_VERSION);

abbity
  .command("init")
  .description("Initialize a new Abbot project")
  .argument("<name>", "Name of the project to initialize")
  .action(async (name) => {
    intro(
      chalk.blueBright(
        `🚀 Creating a new Abbot project called ${chalk.bold(name)}`,
      ),
    );

    // asking questions
    const results: InitResults = await askingQuestionsInit(name);
    // initializing project
    await initializingAction(results);

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

abbity
  .command("check-update")
  .description("Check for abbity updates")
  .action(async () => {
    const spin = spinner();
    intro(
      chalk.blueBright(`🚀 Checking for updates of ${chalk.bold("abbity")}`),
    );

    spin.start("Checking for updates...");
    const latestVersion = await getLatestVersion();
    spin.stop("Checked for updates");

    if (!latestVersion) {
      box(
        chalk.red(`Unable to check for updates. Please try again later.`),
        "❌ Notice",
      );
      outro(chalk.green(`🎉 Updated checked !`));
      return;
    }

    if (isNewerVersion(latestVersion, LOCAL_VERSION)) {
      box(
        chalk.yellow(
          `A new version of abbity is available: ${chalk.bold(latestVersion)}`,
        ),
        "⚠️ Notice",
      );
      note(`npm -g update abbity`, chalk.cyanBright("For update command"));
    } else {
      box(
        chalk.gray(
          `You are using the latest version of ${chalk.bold("abbity")} (${LOCAL_VERSION})`,
        ),
        "🌈 Notice",
      );
    }

    outro(chalk.green(`🎉 Updated checked !`));
  });

abbity.parse();
