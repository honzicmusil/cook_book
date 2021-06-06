const recipeService = require("../service/recipe-abl")
const express = require("express")

const router = express.Router()

// route for recipe create
router.post("/create", async (req, res) => {
    await recipeService.create(req, res)
})

// route to obtain recipe
router.get("/get", async (req, res) => {
    await recipeService.get(req, res)
})

// route for recipe update
router.put("/update", async (req, res) => {
    await recipeService.update(req, res)
})

// route to delete recipe
router.delete("/delete", async (req, res) => {
    await recipeService.remove(req, res)
})

// route to get recipe list
router.get("/list", async (req, res) => {
    await recipeService.list(req, res)
})

module.exports = router

