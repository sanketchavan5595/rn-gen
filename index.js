#!/usr/bin/env node
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import fs from "node:fs";
import {
  DEFAULT_COMPONENT_NAME,
  DEFAULT_EXTENSION,
  EXTENSION_CHOICES,
  FILE_TYPE_CHOICES,
  USER_INPUT_TYPES,
} from "./constants.js";
import {
  getComponentFileName,
  getOtherFileExtensions,
  getOtherFilesNames,
  sleep,
} from "./utils.js";

let componentName = DEFAULT_COMPONENT_NAME;
let extension = DEFAULT_EXTENSION;
let otherFileNames = [];

const showTitleText = async () => {
  const titleText = chalkAnimation.pulse("Generate a component");
  await sleep();
  titleText.stop();
};

const getComponentName = async () => {
  const userInput = await inquirer.prompt({
    name: "name",
    type: USER_INPUT_TYPES.INPUT,
    default: () => "Component",
    message: "Enter component name",
  });
  componentName = userInput.name;
};

const getExtension = async () => {
  const userInput = await inquirer.prompt({
    name: "extension",
    type: USER_INPUT_TYPES.LIST,
    choices: EXTENSION_CHOICES,
    message: "Select an extension (default: jsx)",
  });

  extension = userInput.extension;
};

const getOtherChoices = async () => {
  const userInput = await inquirer.prompt({
    name: "other",
    type: USER_INPUT_TYPES.CHECKBOX,
    message: "Other files: ",
    choices: FILE_TYPE_CHOICES,
  });
  otherFileNames = userInput.other.map((item) =>
    getOtherFilesNames(item, extension, componentName)
  );
};

await showTitleText();
await getComponentName();
await getExtension();
await getOtherChoices();

const allFiles = [
  getComponentFileName(componentName, extension),
  ...otherFileNames,
  `index.${getOtherFileExtensions(extension)}`,
];

fs.mkdirSync(`${componentName}`);

allFiles.forEach((item) => {
  const path = `${componentName}/${item}`;
  fs.writeFileSync(path, "");
});
