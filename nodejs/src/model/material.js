const { uuid } = require("uuidv4")

function Material(name, code) {
	this.id = uuid()
	this.name = name
	this.code = code
	return this
}

exports.Material = Material
