const { uuid } = require("uuidv4");

function Recipe(name,  description, preparationLength, materials, defaultPortions) {
	this.id = uuid();
	this.name = name;
	this.description = description;
	this.preparationLength = preparationLength;
	this.materials = materials;
	this.defaultPortions = defaultPortions;
	return this
}

exports.Recipe = Recipe;
