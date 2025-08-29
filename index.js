//I did steal all of my jokes from an API
const express = require('express');
const app = express();
const port = 2000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());


app.get('/favicon.ico', (req, res) => {
  res.sendFile(__dirname + '/public//homePage/logo.png');
});


app.get("/", (req, res) => {
    res.render("index")
});

app.get("/connectFour", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("connectFour");

});

app.get("/sudoku", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("sudoku");

});

app.get("/tic-tac-toe", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("tictactoe");

});

app.get("/minesweeper", (req, res) => {
    // let model = {
    //     similarGames: ["tic-tac-toe", "memory", "connectFour"]
    // };
    res.render("minesweeper");

});

app.get("/memory", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("memory");

});

app.get("/twentyOne", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("21");

});

app.get("/checkers", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("checkers");

});

app.get("/sorry", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("sorry");

});

app.get("/clue", (req, res) => {
    // let model = {
    //     similarGames: similarGames
    // };
    res.render("clue");

});

app.listen(port, () => {
    console.log("express listening at: http://localhost:" + port);
});
