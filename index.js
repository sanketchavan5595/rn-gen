#!/usr/bin/env node
import { FileGenerator } from "./fileHandler.js";
import {
  getComponentName,
  getExtension,
  getOtherChoices,
} from "./userInputUtils.js";

const componentName = await getComponentName();
const extension = await getExtension();
const otherFileChoices = await getOtherChoices();

const filesGenerator = new FileGenerator(
  componentName,
  extension,
  otherFileChoices
);

try {
  filesGenerator.generateFiles();
} catch (error) {
  if (error.code === "EEXIST") {
    console.log("Component already exists");
  }
}
