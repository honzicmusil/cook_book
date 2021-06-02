const { uuid } = require("uuidv4");

// class Recipe {
//     constructor(name, code, description, preparationLength, materials) {
//         this.id = uuid()
//         this.name = name
//         this.description = description
//         this.preparationLength = preparationLength
//         this.materials = materials
//     }
// }

function Recipe(name, code, description, preparationLength, materials,defaultPortions) {
	this.id = uuid();
	this.name = name;
	this.description = description;
	this.preparationLength = preparationLength;
	this.materials = materials;
	this.defaultPortions = defaultPortions;
}

exports.Recipe = Recipe;
