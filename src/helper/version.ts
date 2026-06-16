import { createRequire } from "node:module";
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
    semver.valid(latest) ?? semver.coerce(latest, { includePrerelease: true })?.version;
  const currentClean =
    semver.valid(current) ?? semver.coerce(current, { includePrerelease: true })?.version;

  if (!latestClean || !currentClean) return false;

  return semver.gt(latestClean, currentClean);
};

export const getLatestVersion = async () => {
  try {
    const response = await fetch("https://registry.npmjs.org/abbity/latest");
    const data = await response.json();
    return data.version;
  } catch (error) {
    console.error("Error checking for updates:", error);
    return null;
  }
};
