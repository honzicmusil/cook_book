const fs = require("fs");
const path = require("path");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

// creating path to file storage
const RECIPE_STORAGE_PATH = path.join(
	__dirname,
	"..",
	"storage",
	"recipes.json"
);

// Data access object class for recipes
class RecipeDao {

	// function returns recipe based on the given id
	async getRecipe(id) {
		// we load all the recipes from the file
		const recipes = await this._loadAllRecipes();
		// we check if recipe is present
		if (recipes[id]) {
			// if yes, we return it
			return recipes[id];
		} else {
			// if not, we log it and throw exception
			throw await createException(
				`Recipe with id '${id}' does not exist.`,
				"FAILED_TO_GET_RECIPE"
			);
		}
	}

	// function which returns all recipes or filtered ones based on the name parameter or containing materials
	async getRecipeList(nameFilter, materials) {
		// we load all the recipes from the file
		const recipes = await this._loadAllRecipes();

		// init of the empty return array
		let recipeList = [];
		for (let id in recipes) {
			// we filter records based of the given string against name parameter and containing materials
			if ((!nameFilter ||	recipes[id].name.toLowerCase().includes(nameFilter.toLowerCase()))
				&& (!materials || recipes[id].materials.filter((p) => materials.includes(p.material)).length > 0)) {

				// if the filter is empty or it matches the filters we put record into return array
				recipeList.push(recipes[id]);
			}
		}
		return recipeList;
	}

	// function adds recipe to the storage file
	async addRecipe(recipe) {
		// we load all materials from the file
		const recipes = await this._loadAllRecipes();
		// we check if the recipe is already present in the file
		if (this._isDuplicate(recipe, recipe.id)) {
			// if there is a such record, we log it and throw exception
			throw await createException(
				`Recipe with id '${recipe.id}' already exists.`,
				"DUPLICATE_CODE"
			);
		}

		// material is added to the structure
		recipes[recipe.id] = recipe;

		try {
			// we write it back to the storage file
			await wf(RECIPE_STORAGE_PATH, JSON.stringify(recipes, null, 2));
			return recipe;
		} catch (error) {
			// In case of error we log the error and throw the exception
			throw await createException(
				`Failed to store recipe with id '${recipe.id}' to local storage.`,
				"FAILED_TO_STORE_RECIPE"
			);
		}
	}

	// function updates recipe
	async updateRecipe(recipe) {
		const recipes = await this._loadAllRecipes();

		// if recipe is present in the file we assign a new object to its id
		if (recipes[recipe.id]) {
			recipes[recipe.id] = recipe;
			try {
				// we write it back to the storage file
				await wf(RECIPE_STORAGE_PATH, JSON.stringify(recipes, null, 2));
				return recipe;
			} catch (error) {
				// In case of error we log the error and throw the exception
				throw await createException(
					`Failed to update recipe with id '${recipe.id}' in local storage.`,
					"FAILED_TO_UPDATE_MATERIAL"
				);
			}
		} else {
			// if there is no such record we log it and throw the exception
			throw await createException(
				`Recipe with id '${recipe.id}' does not exist.`,
				"FAILED_TO_GET_RECIPE"
			);
		}
	}

	// function deletes recipes based on given id
	async deleteRecipe(id) {
		// we load all recipes
		const recipes = await this._loadAllRecipes();

		// check if recipe exists, if not, we log an error and throw exception
		if (!recipes[id]) {
			throw await createException(
				`Failed to find recipe with id '${id}' in local storage.`,
				"RECIPE_NOT_FOUND"
			);
		}
		// deleting recipe from the structure
		delete recipes[id];
		try {
			// writing whole structure without deleted record to the storage file
			await wf(RECIPE_STORAGE_PATH, JSON.stringify(recipes, null, 2));
			return undefined;
		} catch (error) {
			// In case of error we log the error and throw the exception
			throw await createException(
				`Failed to delete recipe with id '${id}' in local storage.`,
				"FAILED_TO_DELETE_RECIPE"
			);
		}
	}

	// function loads all recipes from the storage file
	async _loadAllRecipes() {
		let recipes;
		try {
			// loading all recipes based on the given file storage path
			recipes = JSON.parse(await rf(RECIPE_STORAGE_PATH));
		} catch (e) {
			// in case there is no file yet, we create a new recipe structure
			if (e.code === "ENOENT") {
				console.info("No storage found, initializing new one...");
				recipes = {};
			} else {
				// In case of any other error we log the error and throw the exception
				throw await createException(
					"Unable to read from storage. Wrong data format. " + RECIPE_STORAGE_PATH,
					"FAILED_TO_READ_STORAGE"
				);
			}
		}
		return recipes;
	}

	// function check if the if the storage file contains duplication
	_isDuplicate(recipes, id) {
		return !!recipes[id];
	}
}

// whole class is exported from the module
module.exports = RecipeDao;
