/** @format */

const csvtojson = require("csvtojson")

const convertCsvToJson = (filePath) => {
	return csvtojson()
		.fromFile(filePath)
		.then((json) => json)
		.catch((err) => err)
}

module.exports = convertCsvToJson
