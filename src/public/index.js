import "./style/styles.css";

// import DOMInterface from "../modules/DOMInterface";
import { gameLogic } from "../modules/gameLogic";
// import gameboard from "../modules/gameboard";
// import ship from "../modules/ship";

// document.addEventListener("DOMContentLoaded", DOMInterface);
document.addEventListener("DOMContentLoaded", gameLogic);
// document.addEventListener('DOMContentLoaded', gameboard);
// document.addEventListener('DOMContentLoaded', ship);

gameLogic.gameStart();
