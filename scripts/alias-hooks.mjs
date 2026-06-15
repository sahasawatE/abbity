import { pathToFileURL } from "node:url";
import path from "node:path";

const srcRoot = path.resolve(import.meta.dirname, "../src");

export async function resolve(specifier, context, next) {
  if (specifier.startsWith("@/") || specifier.startsWith("~/")) {
    let rel = specifier.slice(2);
    if (!path.extname(rel)) rel += ".ts";
    const target = pathToFileURL(path.join(srcRoot, rel)).href;
    return next(target, context);
  }
  return next(specifier, context);
}
