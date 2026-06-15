import { exec } from "child_process";

export function runCommand(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
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

export function installDependencies(packageManager: string) {
  return runCommand(`${packageManager} install`);
}
