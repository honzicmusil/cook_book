const MaterialDao = require("../dao/material-dao");
const RecipeDao = require("../dao/recipe-dao");
const { Material } = require("../model/material");

// DAO layer init
let recipeDao = new RecipeDao();
let materialDao = new MaterialDao();

// abl function gets requested list of material
const list = async (req, res) => {
	// we parse parameters from the request
	let { name } = req.body;
	// we validate input parameters
	if (!name || isNameValid(name)) {
		try {
			// we get requested materials and set success response
			let materialList = await materialDao.getMaterialList(name);
			res.status(200).json({ itemList: materialList, total: materialList.length });
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			res.status(500).json(createErrorPayload(e));
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

// abl function gets requested material
const get = async (req, res) => {
	// we parse parameters from the request
	let { id } = req.query;
	// we validate input parameters
	if (isIdValid(id)) {
		try {
			// we get requested material and set success response
			let result = await materialDao.getMaterial(id);
			res.status(200).json(result);
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			if (e.code === "FAILED_TO_GET_MATERIAL") {
				res.status(400).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

// abl function creates a new material
const create = async (req, res) => {
	// we parse parameters from the request
	let { name, unit } = req.body;

	// we validate input parameters
	if (isNameValid(name) && isUnitValid(unit)) {
		// we create a new material
		const material = new Material(name, unit);

		try {
			// we create a new material and set success response
			let result = await materialDao.addMaterial(material);
			res.status(200).json(result);
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			if (e.code === "DUPLICATE_CODE") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_STORE_MATERIAL") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

// abl function updates requested material
const update = async (req, res) => {
	// we parse parameters from the request
	let { id, name, unit } = req.body;

	// we validate input parameters
	if (isIdValid(id) && isNameValid(name) && isUnitValid(unit)) {

		// we create an object for an update
		const material = { id, name, unit };

		try {
			// we update material and set success response
			let result = await materialDao.updateMaterial(material);
			res.status(200).json(result);
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			if (e.code === "FAILED_TO_GET_MATERIAL") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_UPDATE_MATERIAL") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

// abl function deletes requested material
const remove = async (req, res) => {
	// we parse id from the request
	let { id } = req.query;

	// id validation check
	if (isIdValid(id)) {
		try {
			// we load all the recipes
			const recipes = await recipeDao._loadAllRecipes()

			for (let recipe in recipes) {
				// we check if material is present in any recipe, if yes validation failed and error response is returned
				if (recipes[recipe].materials.filter((p) => p.material === id).length > 0) {
					res.status(400).json({
						error: { code: "IN_USE_CANNOT_BE_DELETED", message: `Failed to delete material with id '${id}' because material is in used.` }
					});
					return;
				}
			}

			// we delete material and set success response
			await materialDao.deleteMaterial(id);
			res.status(200).json({});


		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
            console.log(e)
			if (e.code === "FAILED_TO_DELETE_MATERIAL") {
				res.status(500).json(createErrorPayload(e));
			} else if (e.code === "MATERIAL_NOT_FOUND") {
				res.status(404).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

// function validates id parameter
function isIdValid(id) {
	return id && typeof id === "string" && id.length === 36;
}

// function validates name parameter
function isNameValid(name) {
	return name &&
		typeof name === "string" &&
		name.length < 30;
}

// function validates unit parameter
function isUnitValid(unit) {
	return unit && typeof unit === "string" && unit.length < 10;
}

// exports functions from the module
exports.list = list;
exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;
