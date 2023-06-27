export function handleConsole(message, end){
    const console = document.querySelector("#console-output ul");
    const messageELem = document.createElement("li");
    messageELem.textContent = `${message}`;
    const lineBreak = document.createElement("hr")
    console.append(messageELem);
    if(end){
        console.append(lineBreak);
    }
    console.scrollTop = console.scrollHeight;
}