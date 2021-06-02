const { uuid } = require("uuidv4");

// class Material {
//     constructor(name, code) {
//         this.id = uuid()
//         this.name = name
//         this.code = code
//     }
// }

function Material(name, code) {
	this.id = uuid();
	this.name = name;
	this.code = code;
}

exports.Material = Material;
