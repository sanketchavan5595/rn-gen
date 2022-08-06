import { FILE_TYPES } from "./constants.js";

export const getComponentFileName = (componentName, extension) => {
  return `${componentName}.${extension}`;
};

export const getOtherFileExtensions = (extension) => {
  if (extension === "tsx") {
    return "ts";
  }
  return "js";
};

export const getOtherFilesNames = (fileType, extension, componentName) => {
  const ext = getOtherFileExtensions(extension);
  let fileName = "";
  switch (fileType) {
    case FILE_TYPES.Utility:
      fileName = `${componentName}Utils.${ext}`;
      break;

    case FILE_TYPES.CSS:
      fileName = `${componentName}.css`;
      break;

    case FILE_TYPES.Constant:
      fileName = `${componentName}Consts.${ext}`;
      break;

    case FILE_TYPES.Interface:
      fileName = `interface.ts`;
      break;

    case FILE_TYPES.Storybook:
      fileName = `${componentName}.stories.${ext}`;
      break;
  }
  return fileName;
};

export const sleep = (ms = 500) => new Promise((r) => setTimeout(r, ms));
