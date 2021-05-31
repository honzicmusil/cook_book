"use strict"
import * as recipeController from "../cook_book/src/controller/recipe-controller"
import * as materialController from "../cook_book/src/controller/material-controller"
import express from "express"
import path from "path"


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/recipe/", recipeController)
app.use("/material/", materialController)

app.use("/library-spa.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/library-spa.js'))
})
// app.use("/book.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/book.js'))recipe
// })

app.get("/*", function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.listen(3000, () => {
    console.log("Express server listening on port 3000.")
})
