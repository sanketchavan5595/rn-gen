#!/usr/bin/env node
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import fs from "node:fs";
import {
  DEFAULTS,
  EXTENSION_CHOICES,
  FILE_TYPE_CHOICES,
  MESSAGES,
  USER_INPUT_TYPES,
} from "./constants.js";
import {
  getComponentFileName,
  getOtherFileExtensions,
  getOtherFilesNames,
  sleep,
} from "./utils.js";

let componentName = DEFAULTS.ComponentName;
let extension = DEFAULTS.Extension;
let otherFileNames = [];

const showWelcomeMessage = async () => {
  const titleText = chalkAnimation.pulse(MESSAGES.WELCOME);
  await sleep();
  titleText.stop();
};

const getComponentName = async () => {
  const userInput = await inquirer.prompt({
    name: "name",
    type: USER_INPUT_TYPES.INPUT,
    default: () => "Component",
    message: MESSAGES.Component,
  });
  componentName = userInput.name;
};

const getExtension = async () => {
  const userInput = await inquirer.prompt({
    name: "extension",
    type: USER_INPUT_TYPES.LIST,
    choices: EXTENSION_CHOICES,
    message: MESSAGES.Extension,
  });

  extension = userInput.extension;
};

const getOtherChoices = async () => {
  const userInput = await inquirer.prompt({
    name: "other",
    type: USER_INPUT_TYPES.CHECKBOX,
    message: MESSAGES.Other,
    choices: FILE_TYPE_CHOICES,
  });
  otherFileNames = userInput.other.map((item) =>
    getOtherFilesNames(item, extension, componentName)
  );
};

await showWelcomeMessage();
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
