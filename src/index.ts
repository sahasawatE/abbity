#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { intro, outro, note } from "@clack/prompts";
import {
  askingQuestionsInit,
  initializingAction,
  type InitResults,
} from "@/actions/init-action";
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

abbot.parse();
