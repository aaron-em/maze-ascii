const process = require("process");

const mazeAscii = require("./index");

const height = process.stdout.rows || 22;
const width = process.stdout.columns || 20;

console.log(mazeAscii(Math.floor(width / 2 - 3), Math.floor(height / 2 - 1)));
