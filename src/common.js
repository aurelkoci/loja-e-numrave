let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const rezultatiIFundit = document.querySelector(".lastResult");
const meIMadhApoMeIVogel = document.querySelector(".lowOrHi");
const dorzoKerkesenELojtarit = document.querySelector("#submit");
const fushaEPlotesimitTeNumrit = document.querySelector(".guessField");
const listaELojrave = document.getElementById("listGame");
const reset = document.getElementById("reset");
const buttoniVazhdoNumriShumIMadh = document.getElementById(
  "buttoniVazhdoNumriShumIMadh"
);
const numerShumIMadh = document.getElementById("numerShumIMadh");

let numriIlevizjeveTeBera = 1;
let resetButton;
let numratQeJanVleresuar = [];
let lojraTeBera = 1;
