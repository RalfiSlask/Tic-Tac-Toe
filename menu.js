let x_mark = document.querySelector(".mark--x");
let o_mark = document.querySelector(".mark--o");
let wrappers = document.querySelectorAll(".wrapper");
let button_vscpu = document.querySelector(".button--vscpu");
let button_vsplayer = document.querySelector(".button--vsplayer");
localStorage.setItem("mark", "x");


const changingMark = () => {
    for(let i = 0; i < wrappers.length; i++) {
        wrappers[i].onclick = () => {
            wrappers.forEach(wrapper => {
                wrapper.classList.remove("active");
            })
            wrappers[i].classList.add("active");
            wrappers[i].classList.contains("wrapper--x") ? localStorage.setItem("mark", "x") : localStorage.setItem("mark", "o");
        } 
    }
}

changingMark();

let adress_cpu = "./gamevscpu.html";
let adress_player = "./gamevsplayer.html";

const startingNewGame = (opponent, adress) => {
    opponent.onclick = () => {
        location.assign(`${adress}`)
    }
}

startingNewGame(button_vscpu, adress_cpu);
startingNewGame(button_vsplayer, adress_player);

