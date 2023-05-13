import { updateScores, checkingWhichPlayerHasWhichMark,  
         openingModal, closingModal, clickingOnQuit, winningArray} from "./shared.js";

let button_restart = document.querySelector(".wrapper--restart");
let mark_x = document.querySelector(".mark--x");
let mark_o = document.querySelector(".mark--o");
let modal = document.querySelector(".modal");
let lightbox = document.querySelector(".lightbox");
let boxes = document.querySelectorAll(".box");
let x_player = document.querySelector(".x-player");
let o_player = document.querySelector(".o-player");
let score_x = document.querySelector(".score--x");
let score_ties = document.querySelector(".score--ties");
let score_o = document.querySelector(".score--o");
let player1 = localStorage.getItem("mark");
let button_cancel;
let button_yes_restart;
let button_quit;
let button_nextround;
let randomNumber;
let maxLength; 
let hoverClass;
let playerText;
let x_score = 0;
let o_score = 0;
let ties_score = 0;
let count = 0;
let playerTurn = "x";
let startRound = "x";
let opponent_text = "(CPU)";
let player = "(YOU)";
let takenIndexesArray  = [];
let isThereAWinner = false;
let isTheTurnCPU = false;

setInterval(() => {updateScores(score_x, x_score, score_o, o_score, score_ties, ties_score)}, 0);
checkingWhichPlayerHasWhichMark(player1, x_player, player, o_player, opponent_text);

let randomFirstPlace = Math.floor(Math.random() * 8)

const cpuPlaceFirstPiece = () => {
    if(startRound === "x" && player1 === "o")  {
        boxes.forEach((box, index) => {
            boxes[randomFirstPlace].classList.add("active-x");
            boxes[randomFirstPlace].classList.add("taken");
            boxes[randomFirstPlace].classList.add("cpu");
        })
        count = 1;
        playerTurn = "o";
        takenIndexesArray.push(randomFirstPlace);
    } else if(startRound === "o" && player1 === "x") {
        boxes.forEach((box, index) => {
            boxes[randomFirstPlace].classList.add("active-o");
            boxes[randomFirstPlace].classList.add("taken");
            boxes[randomFirstPlace].classList.add("cpu");
        })
        count = 1;
        playerTurn = "x";
        takenIndexesArray.push(randomFirstPlace);
    }
    isTheTurnCPU = false;
}

cpuPlaceFirstPiece();

const changingTurnMark = () => {
    if(playerTurn === "x") {
        mark_x.classList.remove("nodisplay");
        mark_o.classList.add("nodisplay");
    } else {
        mark_o.classList.remove("nodisplay");
        mark_x.classList.add("nodisplay");
    }
}

setInterval(changingTurnMark, 0);

// Hover effects on the squares

const updateHoverClass = () => {
    if(playerTurn === "x") {
        hoverClass = "hover-x";
    } else if(playerTurn === "o") {
        hoverClass = "hover-o";
    }
}

setInterval(updateHoverClass, 0);

const hoverEffectOnBoxes = () => {
    boxes.forEach(box => {
        if(!box.classList.contains("active-x") || !box.classList.contains("active-o")) {
            box.addEventListener("mouseenter", () => {
                box.classList.add(`${hoverClass}`);
            })
            box.addEventListener("mouseover", () => {
                box.classList.add(`${hoverClass}`);
            })
            box.addEventListener("mouseleave", () => {
                box.classList.remove(`${hoverClass}`);
            })
            box.addEventListener("click", () => {
                box.classList.remove(`${hoverClass}`);
            })
        }
    
    })
}

setInterval(hoverEffectOnBoxes, 0);

// Modal //

const clickingOnCancel = (cancel) => {
    cancel.onclick = () => {
        closingModal(modal, lightbox);
    }
}

const clickingOnArrow = () => {
    button_restart.onclick = () => {
        modal.innerHTML = `  
        <h2>RESTART GAME?</h2>
        <div class="container">
            <div class="button button--cancel">NO, CANCEL</div>
            <div class="button button--yes">YES, RESTART</div>
        </div>
        `
        button_cancel = document.querySelector(".button--cancel");
        button_yes_restart = document.querySelector(".button--yes");
        clickingOnCancel(button_cancel);
        clickingOnRestart(button_yes_restart);
        openingModal(modal, lightbox);
    }
}

clickingOnArrow();

const clickingOnRestart = (restart) => {
    restart.onclick = () => {
        resetMarkers();
        closingModal(modal, lightbox);
        cpuPlaceFirstPiece();
        count = 0;
        takenIndexesArray = [];
    }
}

// Winning Modal //

const updatingWinningModalText = (player) => {
    if(player1 === "x" && player === "active-x") {
        playerText = "YOU WON!";
    } else if(player1 === "x" && player === "active-o") {
        playerText = "OH NO, YOU LOST...";
    } else if(player1 === "o" && player === "active-o") {
        playerText = "YOU WON!";
    } else if(player1 === "o" && player === "active-x") {
        playerText = "OH NO, YOU LOST...";
    } 
}

const updatingWinningModalStyle = (player, mark, winner) => {
    if(player === "active-o") {
        o_score++;
        mark.style.backgroundImage = "url(./assets/icon-o.svg)";
        winner.style.color = "#F2B137";
    } else if(player === "active-x") {
        x_score++;
        mark.style.backgroundImage = "url(./assets/icon-x.svg)";
        winner.style.color = "#31C3BD";
    }
}

const creatingWinningModal = (player) => {
    updatingWinningModalText(player);
    modal.innerHTML = `
    <div class="winning-player">${playerText}</div>
    <div class="panel-winning">
        <div class="winning-mark"></div>
        <h2>TAKES THE ROUND</h2>
    </div>
    <div class="container-winning">
        <div class="button button--quit">QUIT</div>
        <div class="button button--next">NEXT ROUND</div>
    </div>
    `
    button_quit = document.querySelector(".button--quit");
    button_nextround = document.querySelector(".button--next");
    let winning_mark = document.querySelector(".winning-mark");
    let winner = document.querySelector(".panel-winning h2");
    clickingOnQuit(button_quit, location);
    clickingOnNextRound(button_nextround);
    updatingWinningModalStyle(player, winning_mark, winner);
}

const clickingOnNextRound = (nextround) => {
    nextround.onclick = () => {
        resetMarkers();
        closingModal(modal, lightbox);
        cpuPlaceFirstPiece();
        takenIndexesArray = [];
        maxLength = 0;
        count = 0;
    }
}

const dynamicallyCreatingWinningMarkers = (box, player) => {
    let iconsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    let iconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    iconsvg.setAttribute("fill", "#1A2A33");
    iconsvg.setAttribute("width", "64px");
    iconsvg.setAttribute("height", "64px");
    iconsvg.setAttribute("stroke", "currentcolor");
    if(player === "active-x") {
        iconPath.setAttribute(
            "d", 
            "M51.12 1.269c.511 0 1.023.195 1.414.586l9.611 9.611c.391.391.586.903.586 1.415s-.195 1.023-.586 1.414L44.441 32l17.704 17.705c.391.39.586.902.586 1.414 0 .512-.195 1.024-.586 1.415l-9.611 9.611c-.391.391-.903.586-1.415.586a1.994 1.994 0 0 1-1.414-.586L32 44.441 14.295 62.145c-.39.391-.902.586-1.414.586a1.994 1.994 0 0 1-1.415-.586l-9.611-9.611a1.994 1.994 0 0 1-.586-1.415c0-.512.195-1.023.586-1.414L19.559 32 1.855 14.295a1.994 1.994 0 0 1-.586-1.414c0-.512.195-1.024.586-1.415l9.611-9.611c.391-.391.903-.586 1.415-.586s1.023.195 1.414.586L32 19.559 49.705 1.855c.39-.391.902-.586 1.414-.586Z"
        );
    } else if(player === "active-o") {
        iconPath.setAttribute(
            "d", 
            "M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
        );
    }
    iconPath.setAttribute("stroke-width", "2");
    iconsvg.appendChild(iconPath);
    box.append(iconsvg);
}

// winning Conditions

const checkTies = () => {
    if(isThereAWinner === false && count === 9) {
        ties_score++;
        openingModal(modal, lightbox);
        modal.innerHTML = `
            <h2>ROUND TIED</h2>
        <div class="container-winning">
            <div class="button button--quit">QUIT</div>
            <div class="button button--next">NEXT ROUND</div>
        </div>
        `
        button_quit = document.querySelector(".button--quit");
        button_nextround = document.querySelector(".button--next");
        clickingOnQuit(button_quit, location);
        clickingOnNextRound(button_nextround);
        count = 0;
        startRound = (startRound === "x") ? "o" : "x";
    }
}

const checkWinner = (player, win) => {
    for(let i = 0; i < winningArray.length; i++) {
        const [a, b, c] = winningArray[i];
        const allBoxesContainPlayer = [a, b, c].every(index => boxes[index].classList.contains(`${player}`));
        if(allBoxesContainPlayer) {
            [a, b, c].forEach(index => {
                boxes[index].classList.add(`${win}`);
                dynamicallyCreatingWinningMarkers(boxes[index], player);
            }) 
            count = 0;
            isThereAWinner = true;
            startRound = (startRound === "x") ? "o" : "x";
            openingModal(modal, lightbox); 
            creatingWinningModal(player);
        }
    }
}

setInterval(() => {console.log("player1:", player1)}, 3000)
setInterval(() => {console.log("playertext:", playerText)}, 3000)
setInterval(() => {console.log("startRound:", startRound)}, 3000)

const generateRandomNumbers = () => {
    randomNumber = Math.floor(Math.random() * 9);
    if(maxLength >= 8) {
        return;
    } else if (!takenIndexesArray.includes(randomNumber)) {
        takenIndexesArray.push(randomNumber);
        maxLength = takenIndexesArray.length;
    } else {
        generateRandomNumbers();
    }
}

const cpuPlacingPieces = () => {
    if(isTheTurnCPU) {
        if(count < 9) {
            count++;
        } else {
            return;
        }
        generateRandomNumbers();
        for(let i = 0; i < boxes.length; i++) {
            if(player1 === "x" && !boxes[i].classList.contains("taken")) {
                boxes[randomNumber].classList.add("active-o");
                boxes[randomNumber].classList.add("taken");
                isTheTurnCPU = false;
            } else if(player1 === "o" && !boxes[i].classList.contains("taken")) {
                boxes[randomNumber].classList.add("active-x");
                boxes[randomNumber].classList.add("taken");
                isTheTurnCPU = false;
            }
        }  
    } 
    if(isThereAWinner === false) {
        checkWinner(`active-x`, `win-x`);
        checkWinner(`active-o`, `win-o`);
    }
}



const clickingOnBoxes = () => {
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            if(!box.classList.contains("taken") && count < 9) {
                count++;
            }
            if(!isTheTurnCPU && player1 === "x" && !box.classList.contains("taken")) {
                box.classList.add("active-x");
                box.classList.add("taken");
                takenIndexesArray.push(index);
                isTheTurnCPU = true;
                checkWinner(`active-x`, `win-x`);
                cpuPlacingPieces();
                checkTies();
            } else if(!isTheTurnCPU && player1 === "o" && !box.classList.contains("taken")) {
                box.classList.add("active-o");
                box.classList.add("taken");
                takenIndexesArray.push(index);
                isTheTurnCPU = true;
                checkWinner(`active-o`, `win-o`);
                cpuPlacingPieces();
                checkTies();
            } 
        })
    })
}

clickingOnBoxes();

const resetMarkers = () => {
    boxes.forEach(box => {
        box.className = "box";
        // removes the appended svg markers
        box.innerHTML = "";
    })
    isThereAWinner = false;
}


