import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import {
  EXTENSION_CHOICES,
  FILE_TYPE_CHOICES,
  MESSAGES,
  USER_INPUT_TYPES,
} from "./constants.js";

export const showWelcomeMessage = async () => {
  const welcomeMessage = chalkAnimation.pulse(MESSAGES.WELCOME);
  welcomeMessage.stop();
};

export const showEndingMessage = async () => {
  const endingMessage = chalkAnimation.pulse(MESSAGES.ENDING);
  endingMessage.stop();
};

export const getComponentName = async () => {
  const userInput = await inquirer.prompt({
    name: "name",
    type: USER_INPUT_TYPES.INPUT,
    default: () => "Component",
    message: MESSAGES.Component,
  });
  return userInput.name;
};

export const getExtension = async () => {
  const userInput = await inquirer.prompt({
    name: "extension",
    type: USER_INPUT_TYPES.LIST,
    choices: EXTENSION_CHOICES,
    message: MESSAGES.Extension,
  });

  return userInput.extension;
};

export const getOtherChoices = async () => {
  const userInput = await inquirer.prompt({
    name: "other",
    type: USER_INPUT_TYPES.CHECKBOX,
    message: MESSAGES.Other,
    choices: FILE_TYPE_CHOICES,
  });
  return userInput.other;
};
