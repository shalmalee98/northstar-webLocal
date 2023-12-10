const Filter = require('bad-words');
export const wordFilter = new Filter();
const words = require("./words.json");
wordFilter.addWords(...words);