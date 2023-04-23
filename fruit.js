const spinBtn = document.getElementById("start");
const balanceDisplay = document.getElementById("balanceDisplay");
const userMsg = document.getElementById("user-message");
const reels = [document.getElementById("slot-reel1"), document.getElementById("slot-reel2"), document.getElementById("slot-reel3")];
const winLoseStatus = document.getElementById("win-lose-status");
const betBalance = document.getElementById("bet-amount");
const increaseBetBtn = document.getElementById("increase");
const decreaseBetBtn = document.getElementById("decrease");

//Set default balance to 500
let balance = 500;
let bet = 1;

// Increase bet by one token
const increaseBet = () => {
    if(bet < 100){
        bet += 1;
        betBalance.textContent = bet;
    } else {
        displayMessage("You may not bet any more tokens!");
    }
};

// Decrease bet by 1 token - if bet = 1, then we cannot decrement any lower. Otherwise, it is ok.
const decreaseBet = () => {
    if(bet === 1){
        displayMessage("You may not decrease your bet any further!");
    } else {
        bet -= 1;
        betBalance.textContent = bet;
    }
}; 

function handleLose() {
    winLoseStatus.style.display = "flex";
    winLoseStatus.src = "images/Fail.png";
    hideWinLoseStatus();
}

const payoutMultipliers = {
    "Cherry": 2,
    "Grapes": 2,
    "Lemon": 3,
    "Orange": 6,
    "Strawberry": 5,
    "Watermelon": 4
};

function handleWin() {
    const payoutAmount = payoutMultipliers[reels[0].getAttribute("src").replace("images/", "").replace(".png", "")] * bet;
    balance += payoutAmount;

    winLoseStatus.style.display = "flex";
    winLoseStatus.src = "images/BigWin.png";

    hideWinLoseStatus();
}

const hideWinLoseStatus = () => setTimeout( () => winLoseStatus.style.display = "none", 3000);

function spin() {
    if((balance - bet) < 0) {
        displayMessage("You do not have a sufficient balance to place this bet!");
        return
    }

    balance -= bet;
    const spunReels = [spinReel(reels[0]), spinReel(reels[1]), spinReel(reels[2])];
    const winning = spunReels[0] == spunReels[1] && spunReels[0] == spunReels[2];

    if(winning){
        handleWin();
    } else {
        handleLose();
    }
    updateBalance();
}    

function spinReel(reel) {
    const symbols = ["Cherry", "Grapes", "Lemon", "Orange", "Strawberry", "Watermelon"];
    const i = Math.floor(Math.random() * symbols.length);

    reel.src = "images/" + symbols[i] + ".png";
    return symbols[i];
}

function updateBalance() {
    balanceDisplay.innerHTML = balance;
}

function displayMessage(msg) {
    userMsg.textContent = msg;
    userMsg.style.display = "inline-block";

    setTimeout(() => userMsg.style.display = "none", 3000);
}

decreaseBetBtn.addEventListener("click", decreaseBet);
increaseBetBtn.addEventListener("click", increaseBet);
spinBtn.addEventListener("click", spin);