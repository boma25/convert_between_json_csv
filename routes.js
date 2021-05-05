/** @format */

const router = require("express").Router()
const convertJsonToCsv = require("./helpers/jsontocsv")
const multer = require("multer")
const convertCsvToJson = require("./helpers/csvtojson")
const convertPdfToJson = require("./helpers/pdftojson")
const convertImgToJson = require("./helpers/imgtojson")

let upload = multer({ dest: "uploads/" })
//route to convert json to csv
router.route("/convert_json_to_csv").post((req, res) => {
	res.header("Content-Type", "text/csv")
	res.attachment("data.csv")
	if (req.body === "undefined") {
		return res.send("invalid data type")
	}
	return res.send(convertJsonToCsv(req.body))
})

//route to convert csv to json
router
	.route("/convert_csv_to_json")
	.post(upload.single("csvFile"), async (req, res) => {
		if (req.file.originalname.includes(".csv")) {
			return res.send(await convertCsvToJson(req.file.path))
		}
		return res.send("invalid file format")
	})

//route to convert pdf to json
router
	.route("/convert_pdf_to_json")
	.post(upload.single("pdfFile"), (req, res) => {
		if (req.file.originalname.includes(".pdf")) {
			return convertPdfToJson(req.file.path, res)
		}
		return res.send("invalid file format")
	})

//route to convert img to json

const ext = /.jpg|.svg|.png/
router
	.route("/convert_img_to_json")
	.post(upload.single("imgFile"), (req, res) => {
		if (ext.test(req.file.originalname)) {
			return convertImgToJson(req.file.path, res)
		}
		return res.send("invalid file format")
	})

module.exports = router
