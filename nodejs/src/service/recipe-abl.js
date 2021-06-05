const MaterialDao = require("../dao/material-dao");
const RecipeDao = require("../dao/recipe-dao");
const { Recipe } = require("../model/recipe");

let recipeDao = new RecipeDao();
let materialDao = new MaterialDao();

const list = async (req, res) => {
	let { name, materials } = req.query;
	// transform request
	if (materials && !Array.isArray(materials)) materials = [materials];
	if (name === "") name = undefined;

	if ((!name || isNameValid(name))
		&& (!materials || isMaterialValid(materials))) {
		try {
			let recipeList = await recipeDao.getRecipeList(name, materials);

			res.status(200).json({ itemList: recipeList, total: recipeList.length });
		} catch (e) {
			res.status(500).json(createErrorPayload(e));
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

const get = async (req, res) => {
	let { id } = req.query;

	if (isIdValid(id)) {
		try {
			let result = await recipeDao.getRecipe(id);
			res.status(200).json(result);
		} catch (e) {
			if (e.code === "FAILED_TO_GET_RECIPE") {
				res.status(400).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

const create = async (req, res) => {
	let { name, description, preparationLength, materials, defaultPortions } =
		req.body;
	console.log(req.body);

	if (isNameValid(name)
		&& isDescriptionValid(description)
		&& isPreparationLengthValid(preparationLength)
		&& isDefaultPortionValid(defaultPortions)
		&& isMaterialValid(materials)) {
		const recipe = new Recipe(
			name,
			description,
			preparationLength,
			materials,
			defaultPortions
		);

		try {
			const allMaterial = await materialDao.getMaterialList()
			if (recipe.materials.find((p) => !allMaterial[p.material])) {
				res.status(400).json({
					error: { code: "UNKNOWN_MATERIAL_FOR_RECIPE", message: `Cannot attach unknown material for recipe '${recipe.id}'` },
				});
			} else {
				let result = await recipeDao.addRecipe(recipe);
				res.status(200).json(result);
			}
		} catch (e) {
			if (e.code === "DUPLICATE_CODE") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_STORE_RECIPE") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

const update = async (req, res) => {
	let { id, name, description, preparationLength, materials, defaultPortions } =
		req.body;

	if (isIdValid(id)
		&& isNameValid(name)
		&& isDescriptionValid(description)
		&& isPreparationLengthValid(preparationLength)
		&& isDefaultPortionValid(defaultPortions)
		&& isMaterialValid(materials)) {
		const recipe = {
			id,
			name,
			description,
			preparationLength,
			materials,
			defaultPortions,
		};

		try {
			const allMaterial = materialDao.getMaterialList()
			if (recipe.materials.find((p) => !allMaterial[p.material])) {
				res.status(400).json({
					error: { code: "UNKNOWN_MATERIAL_FOR_RECIPE", message: `Cannot attach unknown material for recipe '${recipe.id}'` },
				});
			} else {
				let result = await recipeDao.updateRecipe(recipe);
				res.status(200).json(result);
			}
		} catch (e) {
			if (e.code === "FAILED_TO_GET_RECIPE") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_UPDATE_RECIPE") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

const remove = async (req, res) => {
	let { id } = req.query;

	if (isIdValid(id)) {
		try {
			await recipeDao.deleteRecipe(id);
			res.status(200).json({});
		} catch (e) {
			if (e.code === "FAILED_TO_DELETE_RECIPE") {
				res.status(500).json(createErrorPayload(e));
			} else if (e.code === "RECIPE_NOT_FOUND") {
				res.status(404).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};


function isIdValid(id) {
	return id && typeof id === "string" && id.length <= 36;
}

function isNameValid(name) {
	return name && typeof name === "string" && name.length < 30;
}

function isDescriptionValid(description) {
	return description && typeof description === "string" && description.length < 256;
}

function isPreparationLengthValid(preparationLength) {
	return preparationLength && typeof preparationLength === "number" && preparationLength > 0;
}

function isDefaultPortionValid(defaultPortions) {
	return defaultPortions && typeof defaultPortions === "number" && defaultPortions > 0;
}

function isMaterialValid(materials) {
	return materials && Array.isArray(materials) && materials.length > 0;
}

exports.list = list;
exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;
