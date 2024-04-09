#!/usr/bin/env node

import path from "path";
import sade from "sade";
import { spawn } from "child_process";
import { readFileSync, renameSync, existsSync } from "fs";

let pjson;
try {
  const pkgPath = new URL("./package.json", import.meta.url);
  const pkgData = readFileSync(pkgPath);
  pjson = JSON.parse(pkgData);
} catch (err) {
  console.error("Error reading package.json:", err);
}

const prog = sade("core");

prog.version(pjson.version);

prog
  .command("new <AppName>")
  .describe("Create a new Sveltekit app from a github repo.")
  .example("new <AppName>")
  .action((AppName, options, opts) => {
    console.log(`• Creating a new Sveltekit project named ${AppName}`);

    const createSvelteProcess = spawn(
      "git",
      ["clone", "https://github.com/solar-path/april.git", AppName],
      {
        stdio: "inherit", // this will show the live output of the command
        shell: true,
      }
    );

    createSvelteProcess
      .on("error", (error) => {
        console.error(`Error creating the project: ${error}`);
      })
      .on("exit", (code) => {
        code !== 0
          ? console.error(`The process exited with code ${code}`)
          : console.log(
              `Sveltekit project named ${AppName} created successfully!`
            );
      });
  });

prog
  .command("deploy <AppName>")
  .describe("install packages for <AppName>.")
  .example("core deploy <AppName>")
  .action((AppName, options, opts) => {
    console.log(`• Deploying dependencies for ${AppName} `);

    const currentDir = process.cwd(); // Get the current working directory

    // Change directory to the project folder
    process.chdir(path.join(currentDir, AppName));

    // Renaming .env.example to .env if .env doesn't exist in the project folder
    const envFilePath = path.join(currentDir, AppName, ".env");
    const envExamplePath = path.join(currentDir, AppName, ".env.example");

    if (!existsSync(envFilePath) && existsSync(envExamplePath)) {
      try {
        renameSync(envExamplePath, envFilePath);
        console.log("Renamed .env.example to .env successfully!");
      } catch (error) {
        console.error("Error renaming .env.example to .env:", error);
      }
    }

    // Install dependencies in the project folder
    const installDependenciesProcess = spawn("npm", ["install"], {
      stdio: "inherit", // this will show the live output of the command
      shell: true,
    });

    installDependenciesProcess
      .on("error", (error) => {
        console.error(`Error deploying the project dependencies: ${error}`);
      })
      .on("exit", (code) => {
        code !== 0
          ? console.error(`The process exited with code ${code}`)
          : console.log(`Dependencies are installed correctly!`);

        // Change back to the original directory after deployment
        process.chdir(currentDir);
      });
  });

prog.parse(process.argv);


prog
  .command("crud <destination> <ModuleName> <options>")
  .describe("build at path-to-folder CRUD module <ModuleName>.")
  .example("core crud <destination> <ModuleName> <options>")
  .action((destination, ModuleName, options, opts) => {
    console.log(`• Building CRUD module ${ModuleName} `);


  });

