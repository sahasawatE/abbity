import chalk from "chalk";

function runDevCommand(packageManager: string) {
  if (packageManager === "npm") {
    return "npm run dev";
  } else if (packageManager === "yarn") {
    return "yarn dev";
  } else if (packageManager === "pnpm") {
    return "pnpm dev";
  } else {
    return "bun dev";
  }
}

export function displayResult(packageManager: string, projectPath: string) {
  const result = chalk.white(
    `cd ${projectPath} \n${runDevCommand(packageManager)}`,
  );

  return result;
}
