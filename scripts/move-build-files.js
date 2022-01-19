#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

if (process.version.match(/v(\d+)\./)[1] < 12) {
  console.error("Node v12 or greater is required.");
} else {
  const [,, ...args] = process.argv;

  // run program
  main(args).catch((error) => {
    console.log(error);
    process.exit(1);
  });
}

// program
async function main(args) {
  const [moveDir] = args;

  if (!moveDir) throw new Error("no directory path provided");

  const cwd = process.cwd();
  const [pkgFileName, readmeFileName] = ["package.json", "README.md"];

  // Read files and make sure assets folder exist
  const [pkgRaw, readmeRaw, assets] = await Promise.all([
    fs.promises.readFile(path.resolve(cwd, pkgFileName), { encoding: "utf8" }),
    fs.promises.readFile(path.resolve(cwd, readmeFileName), { encoding: "utf8" }),
    fs.promises.readdir(path.resolve(cwd, "lib", "assets")),
    // make sure assets folder exit
    fs.promises.mkdir(path.resolve(cwd, "dist", "build", "assets"), { recursive: true }),
    // make sure scripts folder exit
    fs.promises.mkdir(path.resolve(cwd, "dist", "scripts"), { recursive: true }),
  ]);

  // remove devDependencies from package.json
  const pkg = JSON.parse(pkgRaw);
  delete pkg.devDependencies;

  // remove irrelevant lines for build readme
  let readmeFile = "";

  for (const line of readmeRaw.toString().split("\n")) {
    if (RegExp('<a name="release-irrelevant"></a>').test(line)) break;

    readmeFile += `${line}\n`;
  }

  const toMove = [
    fs.promises.writeFile(path.resolve(moveDir, pkgFileName), JSON.stringify(pkg, null, 2)),
    fs.promises.writeFile(path.resolve(moveDir, readmeFileName), readmeFile),
    fs.promises.copyFile(path.resolve(cwd, "scripts", "convert-translation.js"), path.resolve(cwd, moveDir, "scripts", "convert-translation.js")),
    fs.promises.copyFile(path.resolve(cwd, "LICENSE"), path.resolve(cwd, moveDir, "LICENSE")),
  ];

  // build asset copy promises
  for (const filename of assets) {
    toMove.push(
      fs.promises.copyFile(
        path.resolve(cwd, "lib", "assets", filename),
        path.resolve(cwd, moveDir, "build", "assets", filename),
      )
    );
  }

  // write files to moveDir
  await Promise.all(toMove);

  console.log("[move-build-files]: done");
}
