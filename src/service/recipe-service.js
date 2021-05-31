import RecipeDao from "../dao/recipe-dao"
import Recipe from "../model/recipe"

let recipeDao = new RecipeDao()

const list = async (req, res) => {
    let {name} = req.body
    if (!name || (name && typeof name === "string" && name.length < 30)) {
        try {
            let recipeList = await recipeDao.getRecipeList(name)
            res.status(200).json({itemList: recipeList, total: recipeList.length})
        } catch (e) {
            res.status(500).json({error: e})
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

const get = async (req, res) => {
    let {id} = req.body
    if (id && typeof id === "string" && id.length < 25) {
        try {
            let result = await recipeDao.getRecipe(id)
            res.status(200).json(result)
        } catch (e) {
            if (e.code === "FAILED_TO_GET_RECIPE") {
                res.status(400).json({error: e})
            } else {
                res.status(500).json({error: e})
            }
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

const create = async (req, res) => {
    let {name, description, preparationLength, materials} = req.body

    if (name && typeof name === "string" && name.length < 30 &&
        description && typeof description === "string" && description.length < 256 &&
        preparationLength && typeof preparationLength === "number" && preparationLength > 0 &&
        materials && Array.isArray(materials) && materials.length > 0) {

        const recipe = new Recipe(name, description, preparationLength, materials)
        try {
            let result = await recipeDao.addRecipe(recipe)
            res.status(200).json(result)
        } catch (e) {
            if (e.code === "DUPLICATE_CODE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_STORE_RECIPE") {
                res.status(500).json({error: e})
            } else {
                res.status(500).json({error: e})
            }
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

const update = async (req, res) => {
    let {id, name, description, preparationLength, materials} = req.body
    if (id && typeof id === "string" && id.length < 25 &&
        name && typeof name === "string" && name.length < 30 &&
        description && typeof description === "string" && description.length < 256 &&
        preparationLength && typeof preparationLength === "number" && preparationLength > 0 &&
        materials && Array.isArray(materials) && materials.length > 0) {

        const recipe = {id, name, description, preparationLength, materials}
        try {
            let result = await recipeDao.updateRecipe(recipe)
            res.status(200).json(result)
        } catch (e) {
            if (e.code === "FAILED_TO_GET_RECIPE") {
                res.status(400).json({error: e})
            } else if (e.code === "FAILED_TO_UPDATE_RECIPE") {
                res.status(500).json({error: e})
            } else {
                res.status(500).json({error: e})
            }
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

const remove = async (req, res) => {
    let {id} = req.body
    if (id && typeof id === "string" && id.length < 25) {
        try {
            await recipeDao.deleteRecipe(id)
            res.status(200).json({})
        } catch (e) {
            if (e.code === "FAILED_TO_DELETE_RECIPE") {
                res.status(500).json({error: e})
            } else {
                res.status(500).json({error: e})
            }
        }
    } else {
        res.status(400).json({
            "error": "Invalid dtoIn"
        })
    }
}

exports.list = list
exports.get = get
exports.create = create
exports.update = update
exports.remove = remove