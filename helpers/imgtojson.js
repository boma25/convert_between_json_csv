/** @format */

const Tesseract = require("tesseract.js")

let invoice_data = {
	invoiceNo: "",
	items: [],
	total: "",
}
const convertImgToJson = (filePath, res) => {
	Tesseract.recognize(filePath, "eng", {
		logger: (m) => console.log(m),
	}).then(({ data: { text } }) => {
		const result = text.split("\n")
		result.forEach((item) => {
			if (item.toLowerCase().includes("number")) {
				invoice_data.invoiceNo = item
			}
			if (item.toLowerCase().includes("your item")) {
				invoice_data.items = invoice_data.items.concat(item)
			}
			if (item.includes("Total")) {
				invoice_data.total = item
			}
		})
		res.send(invoice_data)
	})
}

module.exports = convertImgToJson
