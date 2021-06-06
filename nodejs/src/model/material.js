const { uuid } = require("uuidv4")

// Material model object
function Material(name, unit) {
	this.id = uuid()
	this.name = name
	this.unit = unit
	return this
}

exports.Material = Material
