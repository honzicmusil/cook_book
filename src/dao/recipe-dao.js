const fs = require("fs")
const path = require("path")

const rf = fs.promises.readFile
const wf = fs.promises.writeFile

const DEFAULT_STORAGE_PATH = path.join(__dirname, "storage", "recipes.json")

class RecipeDao {

    async getRecipeList(name) {
        const recipes = await this._loadAllRecipes()
        let recipeList = []
        for (let id in recipes) {
            if (!name || recipes[id].name.toLowerCase().includes(name.toLowerCase())) {
                recipeList.push(recipes[id])
            }
        }
        return recipeList
    }

    async getRecipe(id) {
        const recipes = await this._loadAllRecipes()
        if (recipes[id]) {
            return recipes[id]
        } else {
            const e = new Error(`Recipe with id '${id}' does not exist.`)
            e.code = "FAILED_TO_GET_RECIPE"
            throw e
        }
    }
    
    async addRecipe(recipe) {
        const recipes = await this._loadAllRecipes()
        if (this._isDuplicate(recipe, recipe.id)) {
            const e = new Error(`Recipe with id '${recipe.id}' already exists.`)
            e.code = "DUPLICATE_CODE"
            throw e
        }

        recipes[recipe.id] = recipe
        try {
            await wf(DEFAULT_STORAGE_PATH, JSON.stringify(recipes, null, 2))
            return recipe
        } catch (error) {
            const e = new Error(`Failed to store recipe with id '${recipe.id}' to local storage.`)
            e.code = "FAILED_TO_STORE_RECIPE"
            throw e
        }
        
    }

    async updateRecipe(recipe) {
        const recipes = await this._loadAllRecipes()
        if (recipes[recipe.id]) {
            recipes[recipe.id] = recipe
            try {
                await wf(DEFAULT_STORAGE_PATH, JSON.stringify(recipes, null, 2))
                return recipe
            } catch (error) {
                const e = new Error(`Failed to update recipe with id '${recipe.id}' in local storage.`)
                e.code = "FAILED_TO_UPDATE_MATERIAL"
                throw e
            }
        } else {
            const e = new Error(`Recipe with id '${recipe.id}' does not exist.`)
            e.code = "FAILED_TO_GET_RECIPE"
            throw e
        }
    }

    async deleteRecipe(id) {
        const recipes = await this._loadAllRecipes()
        delete recipes[id]
        try {
            await wf(DEFAULT_STORAGE_PATH, JSON.stringify(recipes, null, 2))
            return undefined
        } catch (error) {
            const e = new Error(`Failed to delete recipe with id '${id}' in local storage.`)
            e.code = "FAILED_TO_DELETE_RECIPE"
            throw e
        }
    }

    async _loadAllRecipes() {
        let recipes
        try {
            recipes = JSON.parse(await rf(DEFAULT_STORAGE_PATH))
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...")
                recipes = {}
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " + DEFAULT_STORAGE_PATH)
            }
        }
        return recipes
    }


    _isDuplicate(recipes, id) {
        return !!recipes[id]
    }
}

module.exports = RecipeDao