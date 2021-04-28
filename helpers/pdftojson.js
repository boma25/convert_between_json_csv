/** @format */

const pdf2table = require("pdf2table")
const fs = require("fs")
const { boltInvoice, formatOne } = require("./invoiceFunctions")

const convertPdfToJson = (filePath, res) => {
	fs.readFile(filePath, (err, buffer) => {
		if (err) return console.log(err)

		pdf2table.parse(buffer, (err, rows) => {
			if (err) return console.log(err)
			if (rows[0][0] === "Invoice") {
				return res.send(formatOne(rows))
			}
			if (rows[0][0].toLowerCase().includes("invoice no")) {
				return res.send(boltInvoice(rows))
			} else {
				return res.send("invalid invoice format")
			}
		})
	})
}

module.exports = convertPdfToJson
