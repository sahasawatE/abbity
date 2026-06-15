import { ROOT } from "@/constants/path";
import { renameSync } from "fs";
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
