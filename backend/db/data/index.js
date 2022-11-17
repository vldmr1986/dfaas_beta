// static data: countries, space names ...
const path = require('path');
const  { readFile } = require('fs/promises');


const getCountries = async () => {
    const spaceList = await readFile(path.join(__dirname, "country_codes.json"), "utf8");
    return JSON.parse(spaceList);
}

const getSpaceNames = async () => {
    const spaceList = await readFile(path.join(__dirname, "spaceNames.json"), "utf8");
    return JSON.parse(spaceList);
}

module.exports = Object.freeze({
    getCountries,
    getSpaceNames
});