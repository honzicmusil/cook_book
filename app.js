"use strict";

const express = require("express");
const path = require('path');

// const bookRouter = require("./controller/book-controller");
// const authorRouter = require("./controller/author-controller");
// const bookImageRouter = require("./controller/book-image-controller");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/book/", bookRouter);
// app.use("/author/", authorRouter);
// app.use("/bookImage/", bookImageRouter);

app.use("/library-spa.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/library-spa.js'));
})
app.use("/book.js", function(req,res) {
    res.sendFile(path.join(__dirname+'/hi/book.js'));
})
// app.use("/author.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/author.js'));
// })
// app.use("/author-list.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/author-list.js'));
// })
// app.use("/author-update-form.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/author-update-form.js'));
// })
// app.use("/book-list.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/book-list.js'));
// })
// app.use("/book-update-form.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/book-update-form.js'));
// })
// app.use("/book-image-form.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/book-image-form.js'));
// })
// app.use("/calls.js", function(req,res) {
//     res.sendFile(path.join(__dirname+'/hi/calls.js'));
// })

app.get("/*", function(req,res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, () => {
    console.log("Express server listening on port 3000.")
});
