import { ROOT } from "@/constants/path";
import { renameSync, rmSync, writeFileSync } from "fs";
import { join } from "pathe";
import { cancel } from "@clack/prompts";

export function renameTemplate(originName: string, projectName: string) {
  try {
    renameSync(join(ROOT, originName), join(ROOT, projectName));
  } catch (error) {
    if (error) {
      cancel(`rename Error: ${error}`);
      process.exit(1);
    }
  }
}

export function replaceEslintConfig(projectPath: string) {
  try {
    const eslintDir = join(projectPath, "eslint");
    renameSync(
      join(eslintDir, "eslint.config.js"),
      join(projectPath, "eslint.config.js"),
    );
    rmSync(eslintDir, { recursive: true, force: true });
  } catch (error) {
    cancel(`replace eslint config Error: ${error}`);
    process.exit(1);
  }
}

export function createPrettierConfig(projectPath: string) {
  try {
    const content = {
      singleQuote: false,
      printWidth: 120,
      trailingComma: "all",
    };
    writeFileSync(
      join(projectPath, ".prettierrc"),
      JSON.stringify(content, null, 2),
    );
  } catch (error) {
    cancel(`create prettier config Error: ${error}`);
    process.exit(1);
  }
}
