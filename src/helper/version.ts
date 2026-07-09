import { createRequire } from "node:module";
import chalk from "chalk";
import { box, note } from "@clack/prompts";
import semver from "semver";

const require = createRequire(import.meta.url);
const { version } = require("../../package.json") as { version: string };

export const LOCAL_VERSION = version;

/**
 * Returns true when `latest` is a strictly newer semver than `current`,
 * with full prerelease precedence (e.g. 1.0.0-beta.1 < 1.0.0).
 */
export const isNewerVersion = (latest: string, current: string): boolean => {
  const latestClean =
    semver.valid(latest) ??
    semver.coerce(latest, { includePrerelease: true })?.version;
  const currentClean =
    semver.valid(current) ??
    semver.coerce(current, { includePrerelease: true })?.version;

  if (!latestClean || !currentClean) return false;

  return semver.gt(latestClean, currentClean);
};

export const getLatestVersion = async (
  timeoutMs = 2000,
): Promise<string | null> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch("https://registry.npmjs.org/abbity/latest", {
      signal: controller.signal,
    });
    const data = (await response.json()) as { version: string };
    return data.version;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Quietly checks for a newer release and prints a notice only when one exists.
 * Failures (offline, timeout) are silent so startup is never blocked.
 */
export const notifyIfUpdateAvailable = async (): Promise<void> => {
  const latestVersion = await getLatestVersion();
  if (!latestVersion || !isNewerVersion(latestVersion, LOCAL_VERSION)) {
    return;
  }

  box(
    chalk.yellow(
      `A new version of abbity is available: ${chalk.bold(latestVersion)}`,
    ),
    "⚠️ Notice",
  );
  note(`npm -g update abbity`, chalk.cyanBright("For update command"));
};
