import { isCancel, cancel } from "@clack/prompts";

export async function ifCancel<T>(
  prompt: Promise<T>,
): Promise<Exclude<T, symbol>> {
  const result = await prompt;
  if (isCancel(result)) {
    cancel("Operation cancelled");
    process.exit(0);
  }
  return result as Exclude<T, symbol>;
}
