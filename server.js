/** @format */

const express = require("express")
const app = express()
const port = 5000
const routes = require("./routes")
const cors = require("cors")

app.listen(port, console.log(`server listening on port: ${port}`))
app.use(express.json())
app.use(
	cors({
		credentials: true,
		origin: "*",
	})
)
app.get("/", (req, res) => {
	res.send("welcome to my simple file converter api")
})

app.get("*", (req, res) => {
	res.redirect("http://localhost:5000")
})

app.use("/api", routes)
