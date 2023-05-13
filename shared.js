export const updateScores = (x_text, x, o_text, o, ties_text, ties) => {
    x_text.textContent = x;
    o_text.textContent = o;
    ties_text.textContent = ties;
}

export const checkingWhichPlayerHasWhichMark = (playerOne, x_player, player, o_player, opponent) => {
    if(playerOne === "x") {
        x_player.textContent = ` ${player}`;
        o_player.textContent = ` ${opponent}`;
    } else {
        x_player.textContent = ` ${opponent}`;
        o_player.textContent = ` ${player}`;
    }
}

export const updateHoverClass = (playerOne, hover) => {
    if(playerOne === "x") {
        hover = "hover-x";
    } else if(playerOne === "o") {
        hover = "hover-o";
    }
}

export const openingModal = (menu, lightbox) => {
    menu.classList.remove("nodisplay");
    lightbox.classList.remove("nodisplay");
}

export const closingModal = (menu, lightbox) => {
    menu.classList.add("nodisplay");
    lightbox.classList.add("nodisplay"); 
}

export const clickingOnQuit = (quit_button, location) => {
    quit_button.onclick = () => {
        location.assign("./index.html");
    }
}

export const winningArray = 
[
    // Horizontal
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    // Vertical
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    // Diagonal
    [0, 4, 8], 
    [2, 4, 6]
]