import "./style.css";
let randomNumber = Math.floor(Math.random() * 100) + 1;

const rezultatet = document.querySelector("#rezultatet");
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
const levizjeTeMbetura = document.getElementById("levizjeTeMbetura");
const koha = document.getElementById("koha");
const numraMeTeMdhenjeP = document.getElementById("numraMeTeMdhenje");
const numraMeTeVegjelP = document.getElementById("numraMeTeVegjel");
const numerIperseritur = document.getElementById("numerIperseritur");
const buttoniVazhdoNumrIPerseritur = document.getElementById(
  "buttoniVazhdoNumrIPerseritur"
);
const resetParas = document.querySelectorAll(".resultParas p");

let numriIlevizjeveTeBera = 1;
let resetButton;
let numratQeJanVleresuar = [];
let lojraTeBera = 1;
var start = "";
var end = "";
var time = "";
let mbaroi = "";
var numraMeTeVegjel = [];
var numraMeTeMdhenje = [];
let newGame = "";
var totalSeconds = 0;
const rezultatetELojrave = [];
var timerVar;

function financial(x) {
  return Number.parseFloat(x).toFixed(0);
}
