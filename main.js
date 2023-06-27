import {drawPuzzle, newPuzzleState} from "./modules/generateBoard.js"
import {displayPuzzle, resetBoardDisplay} from "./modules/handleBoardDisplay.js"
import { handleConsole } from "./modules/handleConsoleTexts.js";
drawPuzzle();
let runInterval = null;
function stopIteration(){
    clearInterval(runInterval);
    runInterval = null;
    console.log("stopping")
}
let globalState = {
    puzzleState: [],
    setNum: 1, //person number
    nextNum: null,
    currentNum: null,
    interval: 1,
    attemptNum: 0,
    wins: 0,
    loses: 0,
    resolveCase: null,
    totalIterations: 0,
    handleInterval: function(value){
        this.interval = value;
    },
    newPerson: function() {
        this.setNum++;
        this.attemptNum = 0;
        this.currentNum = this.setNum;
        resetBoardDisplay(this.setNum);
    },
    newSet: function() {
        handleConsole("resetting board");
        this.puzzleState = newPuzzleState();
        this.setNum = 1;
        this.currentNum = 1;
        this.attemptNum = 0;
        resetBoardDisplay(this.setNum);
    },
    findNextNum: function(){
        return this.puzzleState[this.currentNum - 1];
    },

    intervalHandler: function(){
        if(runInterval === null){
            this.totalIterations++;
            runInterval = setInterval(() => {
                if(this.totalIterations > 200){//stops interval when it runs too long
                    this.totalIterations = 0;
                    handleConsole("running too long... stopping.", true);
                    document.querySelector("button").textContent = "start";
                    return stopIteration();
                }
                for(let i = 0; i< this.interval; i++){//person searches i times per interval.
                    if(this.resolveCase !== null){
                        this.resolveCase();
                        this.resolveCase = null
                        break;
                    }
                    this.attemptNum++;
                    displayPuzzle(this.currentNum);//animate openning box...
                    this.nextNum = this.findNextNum(); //opens box...
                    
                    //three options... run out of turns... find card(sub option => everyone find cards)... doesn't find card...
                    if(this.attemptNum > 49){
                        handleConsole(`Prisoner ${this.setNum} failed after ${this.attemptNum} attempts`, true);
                        this.resolveCase = this.newSet;
                        break;
                    }
                    if(this.setNum === this.nextNum){
                        if(this.setNum > 100){
                            handleConsole(`All prisoners have successfully found their number!`, true);
                            this.resolveCase = this.newSet;
                            break;
                        }
                        else {
                            handleConsole(`Prisoner ${this.setNum} opened box ${this.currentNum} and found ${this.nextNum} after ${this.attemptNum} attempts`);
                            this.resolveCase = this.newPerson;
                            break;
                        }
                    }
                    if(this.interval === 1){
                        handleConsole(`Prisoner ${this.setNum} opened box ${this.currentNum} and found ${this.nextNum}`);
                    }
                    this.currentNum = this.nextNum;
                }
            }, 1300);
        }
        else stopIteration();
    }
}
const slider = document.querySelector("#intervalController");
slider.addEventListener("input", ()=>{
    const value = slider.value;
    globalState.handleInterval(value);
    document.querySelector("#sliderValue").textContent = value;
})
document.querySelector("#console-tab").addEventListener("click", ()=>{
    document.querySelector("#console-output").classList.toggle("show");
})
const startBttn = document.querySelector("#start-pause");
startBttn.addEventListener("click", ()=> {
    if(runInterval === null){
        startBttn.textContent = "pause";
    }
    else startBttn.textContent = "start"
    globalState.intervalHandler();
});
document.querySelector("#reset-puzzle").addEventListener("click", ()=>{
    stopIteration();
    startBttn.textContent = "start"
    globalState.newSet();
})
globalState.newSet();
resetBoardDisplay(1)