import * as recipeService from "../service/recipe-service"
import express from "express"

const router = express.Router()

router.post("/create", async (req, res) => {
    await recipeService.create(req, res)
})

router.get("/get", async (req, res) => {
    await recipeService.get(req, res)
})

router.put("/update", async (req, res) => {
    await recipeService.update(req, res)
})

router.delete("/delete", async (req, res) => {
    await recipeService.remove(req, res)
})

router.get("/list", async (req, res) => {
    await recipeService.list(req, res)
})

module.exports = router

