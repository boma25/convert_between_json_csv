/** @format */

const router = require("express").Router()
const convertJsonToCsv = require("./helpers/jsontocsv")
const multer = require("multer")
const convertCsvToJson = require("./helpers/csvtojson")

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

module.exports = router
