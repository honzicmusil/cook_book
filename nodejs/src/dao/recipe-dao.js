const fs = require("fs");

const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(
	__dirname,
	"..",
	"storage",
	"recipes.json"
);

const DEFAULT_MATERIALS_STORAGE_PATH = path.join(
	__dirname,
	"..",
	"storage",
	"materials.json"
);

class RecipeDao {
	async getRecipeList(name, materials) {
		const recipes = await this._loadAllRecipes();

		let recipeList = [];
		for (let id in recipes) {
			if (
				(!name ||
					recipes[id].name.toLowerCase().includes(name.toLowerCase())) &&
				(!materials ||
					recipes[id].materials.filter((p) => materials.includes(p.material))
						.length > 0)
			) {
				recipeList.push(recipes[id]);
			}
		}
		return recipeList;
	}

	async getRecipe(id) {
		const recipes = await this._loadAllRecipes();
		if (recipes[id]) {
			return recipes[id];
		} else {
			throw this._createException(
				`Recipe with id '${id}' does not exist.`,
				"FAILED_TO_GET_RECIPE"
			);
		}
	}

	async addRecipe(recipe) {
		const recipes = await this._loadAllRecipes();
		const materials = await this._loadAllMaterials();

		if (this._isDuplicate(recipe, recipe.id)) {
			throw this._createException(
				`Recipe with id '${recipe.id}' already exists.`,
				"DUPLICATE_CODE"
			);
		}

		if (recipe.materials.find((p) => !materials[p.material])) {
			throw this._createException(
				`Cannot attach unknow material for recipe '${recipe.id}'`,
				"UNKNOWN_MATERIAL_FOR_RECIPE"
			);
		}

		recipes[recipe.id] = recipe;
		try {
			await wf(DEFAULT_STORAGE_PATH, JSON.stringify(recipes, null, 2));
			return recipe;
		} catch (error) {
			throw this._createException(
				`Failed to store recipe with id '${recipe.id}' to local storage.`,
				"FAILED_TO_STORE_RECIPE"
			);
		}
	}

	async updateRecipe(recipe) {
		const recipes = await this._loadAllRecipes();
		const materials = await this._loadAllMaterials();

		if (recipe.materials.find((p) => !materials[p.material])) {
			throw this._createException(
				`Cannot attach unknow material for recipe '${recipe.id}'`,
				"UNKNOWN_MATERIAL_FOR_RECIPE"
			);
		}

		if (recipes[recipe.id]) {
			recipes[recipe.id] = recipe;
			try {
				await wf(DEFAULT_STORAGE_PATH, JSON.stringify(recipes, null, 2));
				return recipe;
			} catch (error) {
				throw this._createException(
					`Failed to update recipe with id '${recipe.id}' in local storage.`,
					"FAILED_TO_UPDATE_MATERIAL"
				);
			}
		} else {
			throw this._createException(
				`Recipe with id '${recipe.id}' does not exist.`,
				"FAILED_TO_GET_RECIPE"
			);
		}
	}

	async deleteRecipe(id) {
		const recipes = await this._loadAllRecipes();
		if (!recipes[id]) {
			const e = new Error(
				`Failed to find recipe with id '${id}' in local storage.`
			);
			e.code = "RECIPE_NOT_FOUND";
			throw e;
		}
		delete recipes[id];
		try {
			await wf(DEFAULT_STORAGE_PATH, JSON.stringify(recipes, null, 2));
			return undefined;
		} catch (error) {
			throw this._createException(
				`Failed to delete recipe with id '${id}' in local storage.`,
				"FAILED_TO_DELETE_RECIPE"
			);
		}
	}

	async _loadAllRecipes() {
		let recipes;
		try {
			recipes = JSON.parse(await rf(DEFAULT_STORAGE_PATH));
		} catch (e) {
			if (e.code === "ENOENT") {
				console.info("No storage found, initializing new one...");
				recipes = {};
			} else {
				throw this._createException(
					"Unable to read from storage. Wrong data format. " +
						DEFAULT_STORAGE_PATH,
					"FAILED_TO_READ_STORAGE"
				);
			}
		}
		return recipes;
	}

	async _loadAllMaterials() {
		let materials;
		try {
			materials = JSON.parse(await rf(DEFAULT_MATERIALS_STORAGE_PATH));
		} catch (e) {
			if (e.code === "ENOENT") {
				console.info("No storage found, initializing new one...");
				materials = {};
			} else {
				throw new Error(
					"Unable to read from storage. Wrong data format. " +
						DEFAULT_STORAGE_PATH
				);
			}
		}
		return materials;
	}

	_isDuplicate(recipes, id) {
		return !!recipes[id];
	}

	_createException(message, code) {
		const e = new Error(message);
		e.code = code;
        console.log(e)
		return e;
	}
}

module.exports = RecipeDao;
