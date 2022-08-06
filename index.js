#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

let componentName = "Component";

// sleep function
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

const showTitleText = async () => {
  const titleText = chalkAnimation.pulse("Generate a component");
  await sleep();
  titleText.stop();
};

await showTitleText();

const getComponentName = async () => {
  const userInput = await inquirer.prompt({
    name: "name",
    type: "input",
    default: () => "Component",
  });
  componentName = userInput.name;
};

await getComponentName();

console.log(componentName);
