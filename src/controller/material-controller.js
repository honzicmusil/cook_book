import * as materialService from "../service/material-service"
import express from "express"

const router = express.Router()

router.post("/create", async (req, res) => {
    await materialService.create(req, res)
})

router.get("/get", async (req, res) => {
    await materialService.get(req, res)
})

router.put("/update", async (req, res) => {
    await materialService.update(req, res)
})

router.delete("/delete", async (req, res) => {
    await materialService.remove(req, res)
})

router.get("/list", async (req, res) => {
    await materialService.list(req, res)
})

module.exports = router

