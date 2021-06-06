const materialService = require("../service/material-abl")
const express = require("express")

const router = express.Router()

// route for material create
router.post("/create", async (req, res) => {
    await materialService.create(req, res)
})

// route to obtain material
router.get("/get", async (req, res) => {
    await materialService.get(req, res)
})

// route for material update
router.put("/update", async (req, res) => {
    await materialService.update(req, res)
})

// route to delete material
router.delete("/delete", async (req, res) => {
    await materialService.remove(req, res)
})

// route to get material list
router.get("/list", async (req, res) => {
    await materialService.list(req, res)
})

module.exports = router

