/** @format */

const csvtojson = require("csvtojson")

const convertCsvToJson = (filePath) => {
	return csvtojson()
		.fromFile(filePath)
		.then((json) => json)
		.catch((err) => console.log(err))
}

module.exports = convertCsvToJson
