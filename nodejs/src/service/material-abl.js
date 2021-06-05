const MaterialDao = require("../dao/material-dao");
const RecipeDao = require("../dao/recipe-dao");
const { Material } = require("../model/material");

let recipeDao = new RecipeDao();
let materialDao = new MaterialDao();

const list = async (req, res) => {
	let { name } = req.body;
	if (!name || isNameValid(name)) {
		try {
			let materialList = await materialDao.getMaterialList(name);
			res
				.status(200)
				.json({ itemList: materialList, total: materialList.length });
		} catch (e) {
			res.status(500).json(createErrorPayload(e));
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

const get = async (req, res) => {
	let { id } = req.query;
	if (isIdValid(id)) {
		try {
			let result = await materialDao.getMaterial(id);
			res.status(200).json(result);
		} catch (e) {
			if (e.code === "FAILED_TO_GET_MATERIAL") {
				res.status(400).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

const create = async (req, res) => {
	let { name, unit } = req.body;
	if (isNameValid(name)
		&& isUnitValid(unit)) {
		const material = new Material(name, unit);

		try {
			let result = await materialDao.addMaterial(material);
			res.status(200).json(result);
		} catch (e) {
			if (e.code === "DUPLICATE_CODE") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_STORE_MATERIAL") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

const update = async (req, res) => {
	let { id, name, unit } = req.body;
	if (isIdValid(id) && isNameValid(name) && isUnitValid(unit)) {

		const material = { id, name, unit };

		try {
			let result = await materialDao.updateMaterial(material);
			res.status(200).json(result);
		} catch (e) {
			if (e.code === "FAILED_TO_GET_MATERIAL") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_UPDATE_MATERIAL") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

const remove = async (req, res) => {
	let { id } = req.query;

	if (isIdValid(id)) {
		try {
			const recipes = await recipeDao._loadAllRecipes()

			let isMaterialUsed = false;

			for (let recipe in recipes) {
				console.log(recipes[recipe]);
				if (recipes[recipe].materials.filter((p) => p.material === id).length > 0) {
					res.status(400).json({
						error: { code: "IN_USE_CANNOT_BE_DELETED", message: `Failed to delete material with id '${id}' because material is in used.` }
					});
					isMaterialUsed = true;
				}
			}

			if (!isMaterialUsed) {
				await materialDao.deleteMaterial(id);
				res.status(200).json({});
			}

		} catch (e) {
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
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." }
		});
	}
};

function isIdValid(id) {
	return id && typeof id === "string" && id.length === 36;
}

function isNameValid(name) {
	return name &&
		typeof name === "string" &&
		name.length < 30;
}

function isUnitValid(unit) {
	return unit && typeof unit === "string" && unit.length < 10;
}

exports.list = list;
exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;
