/** @format */

const Tesseract = require("tesseract.js")
const { boltInvoiceImg, formatOneImg } = require("./invoiceFunctions")

const convertImgToJson = (filePath, res) => {
	Tesseract.recognize(filePath, "eng", {
		logger: (m) => console.log(m),
	}).then(({ data: { text } }) => {
		const result = text.split("\n")

		if (text.includes("INV-")) {
			return res.send(formatOneImg(result))
		}
		if (text.includes("B o I t")) {
			return res.send(boltInvoiceImg(result))
		} else {
			return res.send("invalid invoice format")
		}
	})
}

module.exports = convertImgToJson
