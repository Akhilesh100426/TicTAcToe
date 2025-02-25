const boxes = document.querySelectorAll(".box");
const rst = document.querySelector("#reset");
const newgamebtn = document.querySelector("#new-btn");
const msgcontainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turn0 = true; // true: X's turn, false: O's turn
let count = 0;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Add click listeners to boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(box, index));
});

const handleBoxClick = (box) => {
    if (turn0) {
        box.innerText = "X";
    } else {
        box.innerText = "O";
    }
    box.disabled = true;
    turn0 = !turn0; // Toggle turn
    count++;

    const winner = checkWinner();
    if (winner) {
        showWinner(winner);
        return;
    }

    if (count === 9) {
        gameDraw();
    }
};

const checkWinner = () => {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (
            boxes[a].innerText &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            return boxes[a].innerText; // Return "X" or "O" as the winner
        }
    }
    return null; // No winner yet
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, the winner is ${winner}!`;
    msgcontainer.classList.remove("hide");    
    disableBoxes();
};

const gameDraw = () => {
    msg.innerText = "It's a draw!";
    msgcontainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const resetBoard = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turn0 = true;
    count = 0;
    msgcontainer.classList.add("hide");
    document.body.classList.remove("blur");
};

rst.addEventListener("click", resetBoard);
newgamebtn.addEventListener("click", resetBoard);
