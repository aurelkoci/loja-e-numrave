import "./style.css";
let randomNumber = Math.floor(Math.random() * 100) + 1;

const modal = document.getElementById("modal");
const madolTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalButton = document.getElementById("modal-button");

const rezultatet = document.querySelector("#rezultatet");
const rezultatiIFundit = document.querySelector(".lastResult");
const meIMadhApoMeIVogel = document.querySelector(".lowOrHi");
const dorzoKerkesenELojtarit = document.querySelector("#submit");
const fushaEPlotesimitTeNumrit = document.querySelector(
  "#fushaEPlotesimitTeNumrit"
);
const listaELojrave = document.getElementById("listGame");
const reset = document.getElementById("reset");
const levizjeTeMbetura = document.getElementById("levizjeTeMbetura");
const koha = document.getElementById("koha");

const resetParas = document.querySelectorAll(".resultParas p");
const fshiHistorin = document.getElementById("fshiHistorin");

let numriIlevizjeveTeBera = 1;
let resetButton;
let numratQeJanVleresuar = [];
var lojraTeBera = 1;
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

if (JSON.parse(localStorage.getItem("rezultati"))) {
  lojraTeBera = 1;
  JSON.parse(localStorage.getItem("rezultati")).forEach((element) => {
    listaELojrave.insertAdjacentHTML("beforeend", element);
    ++lojraTeBera;
  });
}
fshiHistorin.addEventListener("click", fshiHistorinFunksion);
function fshiHistorinFunksion() {
  localStorage.removeItem("rezultati");
  lojraTeBera = 1;
  listaELojrave.innerHTML = "";
}

function countTimer() {
  ++totalSeconds;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  if (hour < 10) hour = "0" + hour;
  if (minute < 10) minute = "0" + minute;
  if (seconds < 10) seconds = "0" + seconds;
  koha.innerHTML = hour + ":" + minute + ":" + seconds;
  mbaroi = hour + ":" + minute + ":" + seconds;
}

const filloIntervalin = () => {
  timerVar = setInterval(countTimer, 1000);
};
function hiqModal() {
  modal.style.display = "none";

  setTimeout(() => {
    fushaEPlotesimitTeNumrit.focus();
  }, 200);
}
function kontrolloPergjigjen() {
  if (start == "") {
    filloIntervalin();
    if (!timerVar) {
      timerVar = setInterval(countTimer, 1000);
    }
    start = new Date().getTime();
  }
  if (fushaEPlotesimitTeNumrit.value == 0) {
    fushaEPlotesimitTeNumrit.value = "";
    return;
  }
  if (fushaEPlotesimitTeNumrit.value > 100) {
    modal.style.display = "block";
    madolTitle.innerHTML = `Gabim numri që futët është shume i madh`;
    modalText.innerHTML = `Numri duhet të jetë midis 1 dhe 100.`;
    modalButton.focus();
    modalButton.addEventListener("click", hiqModal);
    return;
  }
  if (fushaEPlotesimitTeNumrit.value < 1) {
    modal.style.display = "block";
    madolTitle.innerHTML = `Gabim numri që futët është shume i vogël`;
    modalText.innerHTML = `Numri duhet të jetë midis 1 dhe 100.`;
    modalButton.focus();
    modalButton.addEventListener("click", hiqModal);
    return;
  }
  if (!Number.isInteger(parseFloat(fushaEPlotesimitTeNumrit.value))) {
    console.log(fushaEPlotesimitTeNumrit.value);
    modal.style.display = "block";
    madolTitle.innerHTML = `Gabim numri që futët nuk është i plotë`;
    modalText.innerHTML = `Numri duhet i plot dhe midis 1 dhe 100.`;
    modalButton.focus();
    modalButton.addEventListener("click", hiqModal);
    return;
  }
  if (numratQeJanVleresuar.includes(fushaEPlotesimitTeNumrit.value)) {
    modal.style.display = "block";
    madolTitle.innerHTML = `Gabim numri është provuar
    njëherë`;
    modalText.innerHTML = `Ju lutem provoni numra që nuk i keni provuar më parë.`;
    modalButton.focus();
    fushaEPlotesimitTeNumrit.value = "";
    modalButton.addEventListener("click", hiqModal);
    return;
  } else {
    numratQeJanVleresuar.push(fushaEPlotesimitTeNumrit.value);
  }
  let levizjePerTeMbaruarLojen = 10 - numratQeJanVleresuar.length;
  if (levizjePerTeMbaruarLojen > 4) {
    levizjeTeMbetura.innerHTML = `<p>Ju keni <span class="text-green-500">${levizjePerTeMbaruarLojen}</span>  lëvizje</p>`;
  } else if (levizjePerTeMbaruarLojen <= 4 && levizjePerTeMbaruarLojen > 2) {
    levizjeTeMbetura.innerHTML = `<p>Ju keni <span class="text-red-500">${levizjePerTeMbaruarLojen}</span>  lëvizje</p>`;
  } else {
    levizjeTeMbetura.innerHTML = `<p class="text-2xl font-bold text-red-700 overflow-hidden">Kujdes ke ${levizjePerTeMbaruarLojen} lëvizje</p>`;
  }

  const userGuess = Number(fushaEPlotesimitTeNumrit.value);
  if (fushaEPlotesimitTeNumrit.value > randomNumber) {
    numraMeTeMdhenje.push(userGuess);
    numraMeTeMdhenje.sort(function (a, b) {
      return a - b;
    });
  } else if (fushaEPlotesimitTeNumrit.value < randomNumber) {
    numraMeTeVegjel.push(userGuess);
    numraMeTeVegjel.sort(function (a, b) {
      return a - b;
    });
  }
  rezultatet.innerHTML = `Numrat e qe keni provuar: ${numraMeTeVegjel} ... ${numraMeTeMdhenje}`;
  if (userGuess === randomNumber) {
    rezultatiIFundit.textContent = "Urime! Ju e gjetët numrin!";
    rezultatiIFundit.className = "text-3xl font-bold text-green-500";
    meIMadhApoMeIVogel.textContent = "";
    lojaMbaroi();
  } else if (numriIlevizjeveTeBera === 10) {
    rezultatiIFundit.textContent = "!!!Ju nuk fituat. Provoje përsëri!!!";
    rezultatiIFundit.className = "text-3xl font-bold text-red-500";
    meIMadhApoMeIVogel.textContent = "";

    lojaMbaroi();
  } else {
    rezultatiIFundit.textContent = "Gabim!";
    rezultatiIFundit.className = "font-bold text-red-500";
    if (userGuess < randomNumber) {
      meIMadhApoMeIVogel.textContent =
        "Numri që keni zgjedhur është më i vogël!";
    } else if (userGuess > randomNumber) {
      meIMadhApoMeIVogel.textContent =
        "Numri që keni zgjedhur është më i madh!";
    }
  }
  numriIlevizjeveTeBera++;
  fushaEPlotesimitTeNumrit.value = "";
  fushaEPlotesimitTeNumrit.focus();
}
dorzoKerkesenELojtarit.addEventListener("click", kontrolloPergjigjen);
fushaEPlotesimitTeNumrit.addEventListener("keyup", (event) => {
  if (event.keyCode === 32 || event.keyCode === 13) {
    kontrolloPergjigjen();
  }
});
function lojaMbaroi() {
  rezultatet.innerHTML = "";
  numraMeTeMdhenje = [];
  numraMeTeVegjel = [];
  levizjeTeMbetura.innerHTML = "";
  koha.innerHTML = "00:00:00";
  end = new Date().getTime();
  clearInterval(timerVar);
  timerVar = null;
  totalSeconds = 0;
  time = (end - start) / 1000;
  start = "";
  fushaEPlotesimitTeNumrit.disabled = true;
  dorzoKerkesenELojtarit.disabled = true;
  dorzoKerkesenELojtarit.className =
    "disabled:opacity-75 flex w-full  md:w-64 mt-4 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600";
  resetButton = document.createElement("button");
  resetButton.className =
    "reset flex w-full md:w-64 mt-4 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
  resetButton.textContent = "Fillo një lojë të rre";
  reset.append(resetButton);
  resetButton.focus();
  resetButton.addEventListener("click", rifilloLojen);

  if (
    numriIlevizjeveTeBera == 10 &&
    randomNumber !== Number(fushaEPlotesimitTeNumrit.value)
  ) {
    newGame = `<li class="text-sm"><span class="text-red-500">•</span> Loja ${lojraTeBera++} numri ishte ${randomNumber} nuk u fitua koha ${financial(
      time
    )} s</li>`;
  } else {
    newGame = `<li class="text-sm"><span class="text-green-500">•</span> Loja ${lojraTeBera++} u fitua me ${numriIlevizjeveTeBera} lëvizje numri ishte ${randomNumber} për ${financial(
      time
    )} s</li>`;
  }
  const value = JSON.parse(localStorage.getItem("rezultati")) ?? "";
  if (!value) {
    listaELojrave.innerHTML = "";
    rezultatetELojrave.push(newGame);
    localStorage.setItem("rezultati", JSON.stringify(rezultatetELojrave));

    listaELojrave.insertAdjacentHTML("beforeend", newGame);
  } else {
    if (value) {
      value.push(newGame);
      localStorage.setItem("rezultati", JSON.stringify(value));
      listaELojrave.innerHTML = "";
      value.forEach((element) => {
        listaELojrave.insertAdjacentHTML("beforeend", element);
      });
    } else {
      value.push(newGame);
      localStorage.setItem("rezultati", JSON.stringify(value));
      listaELojrave.innerHTML = "";
      value.forEach((element) => {
        listaELojrave.insertAdjacentHTML("beforeend", element);
      });
    }
  }
}

function rifilloLojen() {
  numratQeJanVleresuar = [];
  numriIlevizjeveTeBera = 1;
  dorzoKerkesenELojtarit.className =
    "guessSubmit flex w-full  md:w-64 mt-4 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }
  resetButton.parentNode.removeChild(resetButton);
  fushaEPlotesimitTeNumrit.disabled = false;
  dorzoKerkesenELojtarit.disabled = false;
  fushaEPlotesimitTeNumrit.value = "";
  fushaEPlotesimitTeNumrit.focus();
  rezultatiIFundit.style.backgroundColor = "white";
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

for (const resetPara of resetParas) {
  resetPara.textContent = "";
}

fushaEPlotesimitTeNumrit.focus();
function financial(x) {
  return Number.parseFloat(x).toFixed(0);
}
