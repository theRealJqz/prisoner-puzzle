const board = document.querySelector("#puzzle-board");
function drawPerson(elem){
    const personContainer = document.createElement("div");
    personContainer.classList.add("person-container");
    personContainer.innerHTML = `<div class="head"></div> <div class="torso"></div>`;
    elem.appendChild(personContainer);
}

export function drawPuzzle(){
    for(let i=1; i<101; i++){
        const puzzlePiece = document.createElement("div");
        puzzlePiece.classList = `puzzle puzzle${i}`;
        puzzlePiece.innerHTML = `<div class="card">
        <div class="cardFront">${i}</div><div class="cardBack"></div>
        </div>`
        drawPerson(puzzlePiece, i);
        board.appendChild(puzzlePiece);
    }
}

export function newPuzzleState(){
    let puzzleArr = Array.from(Array(100), (x, i)=> i+1);
    for (let i = puzzleArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [puzzleArr[i], puzzleArr[j]] = [puzzleArr[j], puzzleArr[i]];
      }
    puzzleArr.forEach((i, index)=>{
        document.querySelector(`.puzzle${index+1} .cardBack`).textContent = i;
    })
    return puzzleArr;
}