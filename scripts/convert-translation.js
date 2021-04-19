#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

if (process.version.match(/v(\d+)\./)[1] < 12) {
  console.error("Node v12 or greater is required.");
} else {
  const [,, ...args] = process.argv;

  program(args).catch((error) => {
    console.log(error);
    process.exit(1);
  });
}

function toCsv(key, value) {
  const dept = key.split(".").length;
  const maxDepth = 10;

  // just in case of insane nested levels in translation files
  if (dept > maxDepth) {
    throw new Error(`max dept reached! You have more than ${maxDepth} nested levels in your file.`);
  }

  if (isObject(value)) {
    return Object.keys(value).reduce((acc, next) => {
      const nextKey = key.length > 0 ? `${key}.${next}` : next;
      const result = acc + toCsv(nextKey, value[next]);

      return result;
    }, "");
  }

  return `${key},${JSON.stringify(value)}\r\n`;
}

function isObject(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false;
}

function toJson(str) {
  const result = {};

  const lines = str.split("\n");

  function updateObj(obj, keys, value) {
    if (keys.length < 1) return;

    if (keys.length === 1) {
      // we need this to give support to new lines and scapes in strings
      obj[keys[0]] = typeof value === "string" ? encodeURIComponent(value) : value;
      return;
    }

    if (!obj.hasOwnProperty(keys[0])) {
      obj[keys[0]] = {};
    }

    const keysCopy = keys.slice(1);

    updateObj(obj[keys[0]], keysCopy, value);
  }

  for (const line of lines) {
    // we only care about the first two columns
    const [keys, value] = line.split(/,(.+)/);
    const splitKeys = keys.split(".");

    if (!value) continue;

    let val = value;

    if (val.startsWith('"')) {
      val = val.slice(1);
    }

    if (val.endsWith('"')) {
      val = val.slice(0, -1);
    }

    updateObj(result, splitKeys, val);
  }

  return result;
}

async function program(args) {
  const sourcePath = args[0];

  if (!sourcePath) {
    throw new Error("missing valid JSON file source path");
  }

  const [dest, ext] = sourcePath.slice(sourcePath.lastIndexOf("/") + 1).split(".");
  const translationFile = await fs.promises.readFile(path.join(process.cwd(), sourcePath), { encoding: "utf8" });

  switch (ext) {
    case "json": {
      const json = JSON.parse(translationFile);
      const CSV = toCsv("", json);
      return fs.promises.writeFile(path.join(process.cwd(), `${dest}.csv`), CSV, "utf8");
    }

    case "csv": {
      const json = toJson(translationFile);
      return fs.promises.writeFile(
        path.join(process.cwd(), `${dest}.json`),
        // we need to decode the result because how we handle strings in toJson method
        decodeURIComponent(JSON.stringify(json, null, 2)),
        "utf8"
      );
    }

    default: {
      throw new Error("file extension not supported");
    }
  }
}
