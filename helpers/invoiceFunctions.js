/** @format */

let invoice_data = {
	invoiceNo: "",
	items: [],
	total: "",
}

let bolt_invoice_data = {
	invoiceNo: "",
	title: "Trip Fee",
	total: "",
}

//functions for pdf serializing
const formatOne = (rows) => {
	rows.forEach((item) => {
		item.forEach((value, index) => {
			if (value.toLowerCase().includes("invoice number")) {
				invoice_data.invoiceNo = item[item.length - 1]
			}
			if (value.toLowerCase().includes("%")) {
				if (index > 3) {
					const items = {
						quantity: item[0],
						description: item[1],
						total: item[item.length - 1],
					}
					invoice_data.items = invoice_data.items.concat(items)
				}
			}
			if (value.includes("Total")) {
				invoice_data.total = item[item.length - 1]
			}
		})
	})
	return invoice_data
}

const boltInvoice = (rows) => {
	bolt_invoice_data.invoiceNo = rows[0][0].split(" ")[2]
	rows.forEach((item) => {
		if (item[0].toLowerCase().includes("vat")) {
			bolt_invoice_data.total = item[item.length - 1]
		}
	})
	return bolt_invoice_data
}

//functions for image serializing
const boltInvoiceImg = (rows) => {
	bolt_invoice_data.invoiceNo = rows[0].split(" ")[
		rows[0].split(" ").length - 1
	]
	rows.forEach((item) => {
		if (item.toLowerCase().includes("vat")) {
			bolt_invoice_data.total = item.split(" ")[item.split(" ").length - 1]
		}
	})
	return bolt_invoice_data
}

const formatOneImg = (rows) => {
	invoice_data.invoiceNo = rows[1]
	rows.forEach((item, index) => {
		if (item.toLowerCase().includes("sub total")) {
			const items = {
				Title: rows[index - 1],
				price: item.split(" ")[item.split(" ").length - 1],
			}
			invoice_data.items = invoice_data.items.concat(items)
		}
		if (item.toLowerCase().includes("to:")) {
			invoice_data.total = rows[index - 2].split(" ")[
				rows[index - 2].split(" ").length - 1
			]
		}
	})
	return invoice_data
}

module.exports = { boltInvoice, formatOne, boltInvoiceImg, formatOneImg }
