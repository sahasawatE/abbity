import {
  selectFramework,
  selectMetaFramework,
  selectUI,
  selectAdditionalTools,
  inputImportAliases,
  confirmInstallDependencies,
  inputProjectPath,
  selectPackageManager,
} from "@/prompts/init-prompt";

export async function initAction(projectName: string) {
  const projectPath = await inputProjectPath(projectName);
  const packageManager = await selectPackageManager();
  const framework = await selectFramework();
  const metaFramework = await selectMetaFramework(framework);
  const importAliases = await inputImportAliases();
  const ui = await selectUI(framework);
  const additionalTools = await selectAdditionalTools();
  const installDependencies = await confirmInstallDependencies();

  return {
    projectPath,
    packageManager,
    framework,
    metaFramework,
    importAliases,
    ui,
    additionalTools,
    installDependencies,
  };
}
