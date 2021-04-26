/** @format */

const pdf2table = require("pdf2table")
const fs = require("fs")

let invoice_data = {
	invoiceNo: "",
	items: [
		{
			name: "",
			description: "",
			price: "",
		},
	],
	total: "",
}
const convertPdfToJson = (filePath, res) => {
	fs.readFile(filePath, (err, buffer) => {
		if (err) return console.log(err)

		pdf2table.parse(buffer, (err, rows) => {
			if (err) return console.log(err)
			return res.send(invoice_data)
		})
	})
}

module.exports = convertPdfToJson
