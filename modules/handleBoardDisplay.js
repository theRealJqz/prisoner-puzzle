//handles box reveals and person animation
function addPersonAnimation(boxElem){
    const person = boxElem.querySelector(".person-container");
    person.classList.add("show");
}
function resetPersonAnimation(parentElem, num){
    parentElem.querySelector(".person-container").classList.remove("show");
    parentElem.querySelector(".torso").textContent = num;
}
export function displayPuzzle(num){
    const elem = document.querySelector(`.puzzle${num}`);
    elem.querySelector(".card").classList.add("show");
    addPersonAnimation(elem);
}
export function resetBoardDisplay(prisonerNum){//also draws prisoner number
    document.querySelectorAll(".puzzle").forEach(element => {
        resetPersonAnimation(element, prisonerNum);
        element.querySelector(".card").classList.remove("show");
    });
}