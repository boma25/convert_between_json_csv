/** @format */

const router = require("express").Router()
const convertJsonToCsv = require("./helpers/jsontocsv")
const multer = require("multer")
const convertCsvToJson = require("./helpers/csvtojson")
const pdf2table = require("pdf2table")
const fs = require("fs")
const Tesseract = require("tesseract.js")

let upload = multer({ dest: "uploads/" })

router.route("/convert_json_to_csv").post((req, res) => {
	res.header("Content-Type", "text/csv")
	res.attachment("data.csv")
	if (req.body === "undefined") {
		return res.send("invalid data type")
	}
	return res.send(convertJsonToCsv(req.body))
})

router
	.route("/convert_csv_to_json")
	.post(upload.single("csvFile"), async (req, res) => {
		filePath = req.file.path

		return res.send(await convertCsvToJson(filePath))
	})

router
	.route("/convert_pdf_to_json")
	.post(upload.single("pdfFile"), (req, res) => {
		filePath = req.file.path
		fs.readFile(filePath, (err, buffer) => {
			if (err) return console.log(err)

			pdf2table.parse(buffer, (err, rows) => {
				if (err) return console.log(err)

				return res.send(rows)
			})
		})
	})

router
	.route("/convert_img_to_json")
	.post(upload.single("imgFile"), (req, res) => {
		filePath = req.file.path
		Tesseract.recognize(filePath, "eng", {
			logger: (m) => console.log(m),
		}).then(({ data: { text } }) => {
			res.send(JSON.stringify(text.split("\n")))
		})
	})

module.exports = router
