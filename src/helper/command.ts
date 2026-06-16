import { exec } from "child_process";
import { info } from "@/helper/packageManager";

export function runCommand(command: string, cwd?: string) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(`Execute Error: ${error.message}`);
      }
      resolve(stdout || stderr);
    });
  });
}

export function createFolder(folderName: string) {
  return runCommand(`mkdir -p ${folderName}`);
}

export function cloneTemplate(repoUrl: string, folderName: string) {
  return runCommand(`git clone ${repoUrl} ${folderName}`);
}

export function installDependencies(packageManager: string, cwd?: string) {
  return runCommand(`${packageManager} install`, cwd);
}

export function installEslintDependencies(
  packageManager: string,
  cwd?: string,
) {
  const packageNames = [
    "eslint",
    "@eslint/js",
    "globals",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-refresh",
    "typescript-eslint",
  ];

  const installCommand = info[packageManager as keyof typeof info].install;

  return runCommand(
    `${packageManager} ${installCommand} ${packageNames.join(" ")}`,
    cwd,
  );
}
