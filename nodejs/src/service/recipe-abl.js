const MaterialDao = require("../dao/material-dao");
const RecipeDao = require("../dao/recipe-dao");
const { Recipe } = require("../model/recipe");

// DAO layer init
let recipeDao = new RecipeDao();
let materialDao = new MaterialDao();

// abl function gets requested list of recipes
const list = async (req, res) => {
	// we parse parameters from the request
	let { name, materials } = req.query;
	// transform request
	if (materials && !Array.isArray(materials)) materials = [materials];
	if (name === "") name = undefined;

	// we validate input parameters
	if ((!name || isNameValid(name))
		&& (!materials || isMaterialValid(materials))) {
		try {
			// we get requested recipes and set success response
			let recipeList = await recipeDao.getRecipeList(name, materials);
			res.status(200).json({ itemList: recipeList, total: recipeList.length });
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			res.status(500).json(createErrorPayload(e));
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

// abl function gets requested recipe
const get = async (req, res) => {
	// we parse parameters from the request
	let { id } = req.query;
	// we validate input parameters
	if (isIdValid(id)) {
		try {
			// we get requested recipe and set success response
			let result = await recipeDao.getRecipe(id);
			res.status(200).json(result);
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			if (e.code === "FAILED_TO_GET_RECIPE") {
				res.status(400).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

// abl function creates a new recipe
const create = async (req, res) => {
	// we parse parameters from the request
	let { name, description, preparationLength, materials, defaultPortions } =
		req.body;
	console.log(req.body);

	// we validate input parameters
	if (isNameValid(name)
		&& isDescriptionValid(description)
		&& isPreparationLengthValid(preparationLength)
		&& isDefaultPortionValid(defaultPortions)
		&& isMaterialValid(materials)) {
		// we create a new recipe
		const recipe = new Recipe(
			name,
			description,
			preparationLength,
			materials,
			defaultPortions
		);

		try {
			// we load all materials
			const allMaterial = await materialDao.getMaterialList()

			// we check if all materials exist in the storage
			if (recipe.materials.find((p) => !allMaterial.some(material => material.id === p.material))) {
				res.status(400).json({
					error: { code: "UNKNOWN_MATERIAL_FOR_RECIPE", message: `Cannot attach unknown material for recipe '${recipe.id}'` },
				});
			} else {
				// we create a new recipe and set success response
				let result = await recipeDao.addRecipe(recipe);
				res.status(200).json(result);
			}
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			if (e.code === "DUPLICATE_CODE") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_STORE_RECIPE") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

// abl function updates requested recipe
const update = async (req, res) => {
	// we parse parameters from the request
	let { id, name, description, preparationLength, materials, defaultPortions } =
		req.body;

	// we validate input parameters
	if (isIdValid(id)
		&& isNameValid(name)
		&& isDescriptionValid(description)
		&& isPreparationLengthValid(preparationLength)
		&& isDefaultPortionValid(defaultPortions)
		&& isMaterialValid(materials)) {

		// we create an object for an update
		const recipe = {
			id,
			name,
			description,
			preparationLength,
			materials,
			defaultPortions,
		};

		try {
			// we load all the materials
			const allMaterial = await materialDao.getMaterialList()
			// we check if all materials exist in the storage
			if (recipe.materials.find((p) => !allMaterial.some(material => material.id === p.material))) {
				res.status(400).json({
					error: { code: "UNKNOWN_MATERIAL_FOR_RECIPE", message: `Cannot attach unknown material for recipe '${recipe.id}'` },
				});
			} else {
				// we update recipe and set success response
				let result = await recipeDao.updateRecipe(recipe);
				res.status(200).json(result);
			}
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
            console.log(e)
			if (e.code === "FAILED_TO_GET_RECIPE") {
				res.status(400).json(createErrorPayload(e));
			} else if (e.code === "FAILED_TO_UPDATE_RECIPE") {
				res.status(500).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

// abl function deletes requested recipe
const remove = async (req, res) => {
	// we parse id from the request
	let { id } = req.query;

	// id validation check
	if (isIdValid(id)) {
		try {
			// we delete recipe and set success response
			await recipeDao.deleteRecipe(id);
			res.status(200).json({});
		} catch (e) {
			// in case of any exception we log it, map it to code and create error payload
			console.log(e)
			if (e.code === "FAILED_TO_DELETE_RECIPE") {
				res.status(500).json(createErrorPayload(e));
			} else if (e.code === "RECIPE_NOT_FOUND") {
				res.status(404).json(createErrorPayload(e));
			} else {
				res.status(500).json(createErrorPayload(e));
			}
		}
	} else {
		// if validation fails. we return 400 response
		res.status(400).json({
			error: { code: "INVALID_DTO_IN", message: "Invalid input object." },
		});
	}
};

// function validates id parameter
function isIdValid(id) {
	return id && typeof id === "string" && id.length <= 36;
}

// function validates name parameter
function isNameValid(name) {
	return name && typeof name === "string" && name.length <= 30;
}

// function validates description parameter
function isDescriptionValid(description) {
	return description && typeof description === "string" && description.length <= 256;
}

// function validates preparationLength parameter
function isPreparationLengthValid(preparationLength) {
	return preparationLength && typeof preparationLength === "number" && preparationLength > 0;
}

// function validates defaultPortions parameter
function isDefaultPortionValid(defaultPortions) {
	return defaultPortions && typeof defaultPortions === "number" && defaultPortions > 0;
}

// function validates materials parameter
function isMaterialValid(materials) {
	return materials && Array.isArray(materials) && materials.length > 0;
}

// exports functions from the module
exports.list = list;
exports.get = get;
exports.create = create;
exports.update = update;
exports.remove = remove;
