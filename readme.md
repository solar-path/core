# install cli

> > > sudo npm i -g
> > > chmod +x cli.js

# use

core -h

# functions

1. create a new Sveltekit project and install dependencies

# git

echo "# core" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/solar-path/core.git
git push -u origin main

# draft code

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
.command("new <name>")
.describe("Create a new Sveltekit app from a github repo.")
.example("new myapp")
.action((name, options, opts) => {
console.log(`• Creating a new Sveltekit project named ${name}`);

    const createSvelteProcess = spawn(
      "git",
      ["clone", "https://github.com/solar-path/april.git", name],
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
              `Sveltekit project named ${name} created successfully!`
            );
      });

});

prog
.command("deploy")
.describe("install packages.")
.example("core deploy")
.action((options, opts) => {
console.log(`• Deploying dependencies `);

    // Renaming .env.example to .env if .env doesn't exist
    const envFilePath = new URL(".env", import.meta.url).pathname;
    const envExamplePath = new URL(".env.example", import.meta.url).pathname;

    if (!existsSync(envFilePath) && existsSync(envExamplePath)) {
      try {
        renameSync(envExamplePath, envFilePath);
        console.log("Renamed .env.example to .env successfully!");
      } catch (error) {
        console.error("Error renaming .env.example to .env:", error);
      }
    }

    // Install dependencies
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
      });

});

prog.parse(process.argv);
