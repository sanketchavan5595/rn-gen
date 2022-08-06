import fs from "node:fs";
import { FILE_TYPES } from "./constants.js";

export class FileGenerator {
  constructor(
    componentName = DEFAULTS.ComponentName,
    extension = DEFAULTS.Extension,
    otherFileChoices = []
  ) {
    this.componentName = componentName;
    this.extension = extension;
    this.otherFileChoices = otherFileChoices;
  }

  generateFiles() {
    const allFiles = this.getAllFiles();
    fs.mkdirSync(`${this.componentName}`);
    allFiles.forEach((item) => {
      const path = `${this.componentName}/${item}`;
      fs.writeFileSync(path, "");
    });
  }

  getAllFiles() {
    return [
      this.getComponentFileName(),
      ...this.otherFileChoices.map((item) => this.getOtherFilesNames(item)),
      `index.${this.getOtherFileExtensions()}`,
    ];
  }

  getComponentFileName() {
    return `${this.componentName}.${this.extension}`;
  }

  getOtherFilesNames(fileType) {
    const ext = this.getOtherFileExtensions();
    let fileName = "";
    switch (fileType) {
      case FILE_TYPES.Utility:
        fileName = `${this.componentName}Utils.${ext}`;
        break;

      case FILE_TYPES.CSS:
        fileName = `${this.componentName}.css`;
        break;

      case FILE_TYPES.Constant:
        fileName = `${this.componentName}Consts.${ext}`;
        break;

      case FILE_TYPES.Interface:
        fileName = `interface.ts`;
        break;

      case FILE_TYPES.Storybook:
        fileName = `${this.componentName}.stories.${ext}`;
        break;
    }
    return fileName;
  }

  getOtherFileExtensions() {
    if (this.extension === "tsx") {
      return "ts";
    }
    return "js";
  }
}
