/** @format */

const { Parser } = require("json2csv")

const convertJsonToCsv = (data) => {
	const json2csv = new Parser()
	const csv = json2csv.parse(data)
	return csv
}
module.exports = convertJsonToCsv
